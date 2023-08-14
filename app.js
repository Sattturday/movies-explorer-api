require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');
const handleErrors = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./utils/limiter');

const { PORT, DATABASE_URL } = process.env;

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'https://moviesteka.nomoreparties.co'],
  credentials: true,
  maxAge: 30,
}));

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
