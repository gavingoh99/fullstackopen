const jwt = require('jsonwebtoken');
const {
  UserInputError,
  AuthenticationError,
} = require('apollo-server-express');
const { PubSub } = require('graphql-subscriptions');
const Author = require('./models/Author');
const Book = require('./models/Book');
const User = require('./models/User');
const config = require('./utils/config');

const pubsub = new PubSub();

const resolvers = {
  Query: {
    bookCount: async () => Book.countDocuments({}),
    authorCount: async () => Author.countDocuments({}),
    allBooks: async (root, args) => {
      if (args.author) {
        try {
          const author = await Author.findOne({ name: args.author });
          if (!args.genre) {
            return await Book.find({
              author: author._id,
            }).populate('author');
          }
          return await Book.find({
            genres: args.genre,
            author: author._id,
          }).populate('author');
        } catch (exception) {
          console.error(exception);
        }
      }
      if (args.genre) {
        try {
          return await Book.find({ genres: args.genre }).populate('author');
        } catch (exception) {
          console.error(exception);
        }
      }
      try {
        return await Book.find({}).populate('author');
      } catch (exception) {
        console.error(exception);
      }
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.user;
    },
  },
  // Author: {
  //   bookCount: async (root) => {
  //     const author = await Author.findOne({ name: root.name });
  //     if (!author) {
  //       throw new UserInputError(exception.message, { invalidArgs: args });
  //     }
  //     try {
  //       return await Book.countDocuments({ author: author._id });
  //     } catch (exception) {
  //       throw new UserInputError(exception.message, { invalidArgs: args });
  //     }
  //   },
  // },
  Mutation: {
    addBook: async (root, args, { user }) => {
      if (!user) {
        throw new AuthenticationError('not authenticated');
      }
      let authorOfBook = await Author.findOne({ name: args.author });
      if (authorOfBook) {
        authorOfBook.bookCount += 1;
        await authorOfBook.save();
      }
      if (!authorOfBook) {
        const newAuthor = new Author({
          name: args.author,
          bookCount: 1,
        });
        try {
          authorOfBook = await newAuthor.save();
        } catch (exception) {
          throw new UserInputError(exception.message, { invalidArgs: args });
        }
      }
      let newBook = new Book({
        ...args,
        author: authorOfBook._id,
      });
      try {
        newBook = await newBook.save();
        const bookWithAuthor = await Book.findById(newBook._id).populate(
          'author'
        );
        pubsub.publish('BOOK_ADDED', { bookAdded: bookWithAuthor });
      } catch (exception) {
        throw new UserInputError(exception.message, { invalidArgs: args });
      }
    },
    editAuthor: async (root, args, { user }) => {
      if (!user) {
        throw new AuthenticationError('not authenticated');
      }
      const author = await Author.findOne({ name: args.name });
      if (!author) return null;
      const updatedAuthor = new Author({
        name: author.name,
        born: args.setBornTo,
        _id: author._id,
      });
      try {
        return await Author.findByIdAndUpdate(author._id, updatedAuthor, {
          new: true,
        });
      } catch (exception) {
        throw new UserInputError(exception.message, { invalidArgs: args });
      }
    },
    createUser: async (root, args) => {
      const user = new User({ ...args });
      try {
        return await user.save();
      } catch (exception) {
        throw new UserInputError(exception.message, { invalidArgs: args });
      }
    },
    login: async (root, args) => {
      const existingUser = await User.findOne({ username: args.username });
      if (!existingUser || args.password !== 'secret') {
        throw new UserInputError('wrong credentials');
      }
      const payload = {
        id: existingUser._id,
        username: existingUser.username,
      };
      return { value: jwt.sign(payload, config.JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
};
module.exports = resolvers;
