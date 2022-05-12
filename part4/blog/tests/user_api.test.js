const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const User = require('../models/User');
const Blog = require('../models/Blog');

const api = supertest(app);

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

describe('test GET route to /api/users', () => {
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
  test('all users are returned', async () => {
    const response = await api.get('/api/users');
    expect(response.body).toHaveLength(helper.initialUsers.length);
  });
  test('first user has username hellas', async () => {
    const response = await api.get('/api/users');
    expect(response.body[0].username).toBe(helper.initialUsers[0].username);
  });
  test('users have an id property', async () => {
    const response = await api.get('/api/users');
    expect(response.body[0].id).toBeDefined();
  });
  test('users have a blogs property', async () => {
    const response = await api.get('/api/users');
    expect(response.body[0].blogs).toBeDefined();
  });
});
describe('test POST route to /api/users', () => {
  test('valid user can be added', async () => {
    const newUser = {
      username: 'testUsername',
      name: 'testName',
      password: 'testPassword',
    };
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAfterPost = await helper.usersInDB();

    expect(usersAfterPost).toHaveLength(helper.initialUsers.length + 1);

    const userUsernames = usersAfterPost.map((user) => user.username);

    expect(userUsernames).toContain(newUser.username);
  });
  test('user with invalid username (less than 3 characters) is not added and fails with status code 400', async () => {
    const newUser = {
      username: 'ab',
      name: 'testName',
      password: 'testPassword',
    };
    await api.post('/api/users').send(newUser).expect(400);

    const usersAfterPost = await helper.usersInDB();

    expect(usersAfterPost).toHaveLength(helper.initialUsers.length);
  });
  test('user with duplicate username is not added and fails with status code 400', async () => {
    const users = await helper.usersInDB();
    const newUser = {
      username: users[0].username,
      name: 'testName',
      password: 'testPassword',
    };
    await api.post('/api/users').send(newUser).expect(400);

    const usersAfterPost = await helper.usersInDB();

    expect(usersAfterPost).toHaveLength(helper.initialUsers.length);
  });
  test('user with invalid password (less than 3 characters) is not added and fails with status code 400', async () => {
    const newUser = {
      username: 'testUsername',
      name: 'testName',
      password: 'ab',
    };
    await api.post('/api/users').send(newUser).expect(400);

    const usersAfterPost = await helper.usersInDB();

    expect(usersAfterPost).toHaveLength(helper.initialUsers.length);
  });
});
