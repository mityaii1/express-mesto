const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((data) => res.status(200).send(data))
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
};

const getUser = (req, res) => {
  User.findOne({ _id: req.params.userId })
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
};
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
