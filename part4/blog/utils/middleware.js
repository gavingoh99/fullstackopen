const jwt = require('jsonwebtoken');
const logger = require('./logger');
const config = require('./config');
const User = require('../models/User');

const requestLogger = (req, res, next) => {
  logger.info('Method: ', req.method);
  logger.info('Path: ', req.path);
  logger.info('Body: ', req.body);
  logger.info('---');
  next();
};
const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.split(' ')[1];
  }
  next();
};
const userExtractor = async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, config.SECRET);
  if (!decodedToken.id) return res.status(401).json({ message: 'token missing or invalid' });
  req.user = await User.findById(decodedToken.id);

  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: 'unknown endpoint' });
};

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  }
  if (err.name === 'ValidationError') {
    return res.status(400).send({ error: err.message });
  }
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).send({ error: 'invalid or missing token' });
  }
  if (err.name === 'TokenExpiredError') {
    return res.status(401).send({ error: 'token expired' });
  }
  next(err);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
