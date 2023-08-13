/* eslint-disable no-console */
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const routes = require('./routes');
const handleErrors = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, DATABASE_URL } = process.env;

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'https://sattturday.nomoredomains.sbs'],
  credentials: true,
  maxAge: 30,
}));

const limiter = rateLimit(
  {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  },
);

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log(`База данных подключена ${DATABASE_URL}`);
  })
  .catch((err) => {
    console.log(`Ошибка подключения к базе данных: ${err}`);
  });

app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(limiter);
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
