const userRouter = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

userRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', { user: 0, likes: 0 });
  res.status(200).json(users);
});

userRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body;
  if (password.length < 3) {
    res
      .status(400)
      .json({ message: 'Password must be at least 3 characters long' });
  }
  const existingUser = await User.find({ username });
  if (existingUser.length !== 0) {
    return res
      .status(400)
      .json({ message: `User with username ${username} already exists` });
  }
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const user = new User({
    username,
    name,
    password: hashedPassword,
  });
  const newUser = await user.save();
  res.status(201).json(newUser);
});

module.exports = userRouter;
