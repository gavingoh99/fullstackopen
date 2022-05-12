const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const loginRouter = require('express').Router();
const config = require('../utils/config');
const User = require('../models/User');

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const correctPassword = user === null ? false : await bcrypt.compare(password, user.password);
  if (!(user && correctPassword)) return res.status(401).json({ message: 'invalid username or password' });
  const userPayload = {
    username: user.username,
    id: user._id,
  };
  const token = jwt.sign(userPayload, config.SECRET);
  res.status(200).json({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
