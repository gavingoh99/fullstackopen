const express = require('express');
const cors = require('cors');
require('express-async-errors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const blogRouter = require('./controllers/Blog');
const userRouter = require('./controllers/User');
const loginRouter = require('./controllers/Login');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');

const app = express();

logger.info(`Connecting to ${config.MONGODB_URI}`);

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => logger.info('connected to MongoDB'))
  .catch((err) => logger.error(`error connecting to MongoDB: ${err}`));

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/Test');
  app.use('/api/testing', testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
