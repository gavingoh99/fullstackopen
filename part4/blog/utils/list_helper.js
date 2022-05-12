const dummy = (blogs) => 1;

const totalLikes = (blogs) => (blogs.length === 0
  ? 0
  : blogs.reduce((prevValue, currValue) => prevValue + currValue.likes, 0));

const favoriteBlog = (blogs) => (blogs.length === 0
  ? {}
  : blogs.reduce(
    (prevFavorite, currBlog) => (prevFavorite.likes > currBlog.likes ? prevFavorite : currBlog),
    { likes: -1 },
  ));

const mostBlogs = (blogs) => {
  if (!blogs.length) return {};
  const authors = {};
  blogs.forEach((blog) => {
    authors[blog.author] = typeof authors[blog.author] === 'undefined'
      ? 1
      : authors[blog.author] + 1;
  });
  const authorWithMostBlogs = Object.keys(authors).reduce(
    (prevMost, currAuthor) => (authors[prevMost] > authors[currAuthor] ? prevMost : currAuthor),
  );
  return { author: authorWithMostBlogs, blogs: authors[authorWithMostBlogs] };
};

const mostLikes = (blogs) => {
  if (!blogs.length) return {};
  const authors = {};
  blogs.forEach((blog) => {
    authors[blog.author] = typeof authors[blog.author] === 'undefined'
      ? blog.likes
      : authors[blog.author] + blog.likes;
  });
  const authorWithMostLikes = Object.keys(authors).reduce(
    (prevMost, currAuthor) => (authors[prevMost] > authors[currAuthor] ? prevMost : currAuthor),
  );
  return { author: authorWithMostLikes, likes: authors[authorWithMostLikes] };
};
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
