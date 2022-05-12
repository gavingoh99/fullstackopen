const blogRouter = require('express').Router();
const middleware = require('../utils/middleware');
const Blog = require('../models/Blog');

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  res.status(200).json(blogs);
});

blogRouter.post(
  '/',
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (req, res) => {
    const { user } = req;
    const blog = new Blog({
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      likes: req.body.likes === undefined ? 0 : req.body.likes,
      user: user._id,
    });
    const newBlog = await blog.save();
    user.blogs = user.blogs.concat(newBlog._id);
    await user.save();
    res.status(201).json(newBlog);
  },
);

blogRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('user', {
    username: 1,
    name: 1,
  });
  if (blog === null) return res.status(404).json({ message: 'No blog found' });
  res.status(200).json(blog);
});

blogRouter.delete(
  '/:id',
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (req, res) => {
    const { user } = req;
    const blog = await Blog.findById(req.params.id);
    if (blog.user.toString() === user._id.toString()) {
      await blog.remove();
      return res.status(204).end();
    }
    return res.status(401).end();
  },
);

blogRouter.put('/:id', async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (updatedBlog === null) return res.status(404).json({ message: 'No blog found' });
  res.status(200).json(updatedBlog);
});

module.exports = blogRouter;
