const Blog = require('../models/Blog');
const User = require('../models/User');

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    user: '5a422bc61b54a676234d17fd',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    user: '5a422bc61b54a676234d17fd',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    user: '5a422bc61b54a676234d17fd',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    user: '5a422b3a1b54a676234d18f9',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    user: '5a422b3a1b54a676234d18f9',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    user: '5a422b3a1b54a676234d18f9',
    likes: 2,
    __v: 0,
  },
];

const nonExistingId = async () => {
  const newBlog = new Blog({
    title: 'title',
    author: 'author',
    url: 'url',
  });
  await newBlog.save();
  await newBlog.remove();
  return newBlog._id.toString();
};

const blogsInDB = async () => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  return blogs.map((blog) => blog.toJSON());
};

const initialUsers = [
  {
    username: 'hellas',
    name: 'Arto Hellas',
    password: '$2a$10$TljQ843R2GpJhoNSwPh7b.oh4.gfEs4nF.sCjAIC8acCeXdZNhnNS',
    blogs: [
      '5a422a851b54a676234d17f7',
      '5a422aa71b54a676234d17f8',
      '5a422b3a1b54a676234d17f9',
    ],
    _id: '5a422bc61b54a676234d17fd',
  },
  {
    username: 'mluukkai',
    name: 'Matti Luukkainen',
    password: 'd412dc61b54b678434d18fc',
    blogs: [
      '5a422b891b54a676234d17fa',
      '5a422ba71b54a676234d17fb',
      '5a422bc61b54a676234d17fc',
    ],
    _id: '5a422b3a1b54a676234d18f9',
  },
];

const usersInDB = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDB,
  nonExistingId,
  initialUsers,
  usersInDB,
};
