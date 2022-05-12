const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const Blog = require('../models/Blog');
const User = require('../models/User');

const api = supertest(app);

const getJWT = async () => {
  const response = await api
    .post('/api/login')
    .send({ username: 'hellas', password: 'test' })
    .expect(200);
  return response.body.token;
};

beforeEach(async () => {
  await User.deleteMany({});
  for (const user of helper.initialUsers) {
    const userObject = new User(user);
    await userObject.save();
  }
  await Blog.deleteMany({});
  for (const blog of helper.initialBlogs) {
    const blogObject = new Blog(blog);
    await blogObject.save();
  }
});
describe('test GET route to /api/blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });
  test('first blog has title React patterns', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].title).toBe(helper.initialBlogs[0].title);
  });
  test('blogs have an id property', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
  });
});
describe('test POST route to /api/blogs', () => {
  let token;
  beforeEach(async () => {
    token = await getJWT();
  });
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'testTitle',
      author: 'testAuthor',
      url: 'testUrl',
      likes: 10,
    };
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAfterPost = await helper.blogsInDB();

    expect(blogsAfterPost).toHaveLength(helper.initialBlogs.length + 1);

    const blogTitles = blogsAfterPost.map((blog) => blog.title);

    expect(blogTitles).toContain(newBlog.title);
  });
  test('a blog with no likes property is saved with a likes property of 0', async () => {
    const newBlog = {
      title: 'testTitle',
      author: 'testAuthor',
      url: 'testUrl',
    };
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(response.body.likes).toBe(0);
  });
  test('a blog with invalid fields is not added and fails with status code 400', async () => {
    const newBlog = {
      author: 'testAuthor',
      likes: 1,
    };
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400);

    const blogsAfterPost = await helper.blogsInDB();

    expect(blogsAfterPost).toHaveLength(helper.initialBlogs.length);
  });
  test('fails with status code 401 if token is not provided', async () => {
    const newBlog = {
      title: 'testTitle',
      author: 'testAuthor',
      url: 'testUrl',
      likes: 10,
    };
    await api.post('/api/blogs').send(newBlog).expect(401);
  });
});
describe('test GET route to /api/blogs/:id', () => {
  test('succeeds with a valid id', async () => {
    const blogs = await helper.blogsInDB();
    const blogToView = blogs[0];
    const result = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(result.body).toEqual(blogToView);
  });
  test('fails with status code 404 if blog does not exist', async () => {
    const nonExistingId = await helper.nonExistingId();
    await api.get(`/api/blogs/${nonExistingId}`).expect(404);
  });
  test('fails with status code 400 if id is invalid', async () => {
    const invalidId = '5a422bc61b54a676234d17f';
    await api.get(`/api/blogs/${invalidId}`).expect(400);
  });
});
describe('test DELETE route to /api/blogs/:id', () => {
  test('succeeds with status code 204 if id is valid and valid token is provided', async () => {
    const token = await getJWT();
    const blogs = await helper.blogsInDB();
    const blogToDelete = blogs[0];
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

    const blogsAfterDelete = await helper.blogsInDB();
    expect(blogsAfterDelete).toHaveLength(helper.initialBlogs.length - 1);

    const blogTitles = blogsAfterDelete.map((blog) => blog.title);
    expect(blogTitles).not.toContain(blogToDelete.title);
  });
  test('fails with status code 401 if token is not provided', async () => {
    const blogs = await helper.blogsInDB();
    const blogToDelete = blogs[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(401);
  });
});
describe('test PUT route to /api/blogs/:id', () => {
  test('succeeds with a valid id', async () => {
    const blogs = await helper.blogsInDB();
    await api
      .put(`/api/blogs/${blogs[0].id}`)
      .send({ likes: 5 })
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogsAfterPut = await helper.blogsInDB();
    const blogLikes = blogsAfterPut.map((blog) => blog.likes);
    expect(blogLikes[0]).toBe(5);
  });
  test('fails with status code 404 if blog does not exist', async () => {
    const nonExistingId = await helper.nonExistingId();
    await api.put(`/api/blogs/${nonExistingId}`).send({ likes: 2 }).expect(404);
  });
  test('fails with status code 400 if id is invalid', async () => {
    const invalidId = '5a422bc61b54a676234d17f';
    await api.put(`/api/blogs/${invalidId}`).send({ likes: 3 }).expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
