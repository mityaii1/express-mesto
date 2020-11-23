/* eslint-disable no-unused-vars */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// app.use((req, res, next) => {
//   req.user = {
//     _id: '5f9530782e406d85dc000a1e',
//   };

//   next();
// });

app.use(bodyParser.json());
app.use(requestLogger);
app.use('/', router);
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
// res.status(err.status || 500).send({ message: err.message || 'На сервере произошла ошибка' });
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
});

app.listen(PORT, () => { });
