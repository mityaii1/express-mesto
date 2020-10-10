const readFile = require('../utils/read-file');
const path = require('path');
const jsonDataPath = path.join(__dirname, '..', 'data', 'users.json');

const getUsers = (req, res) => {
  readFile(jsonDataPath)
    .then(data => res.send(data))
    .catch(err => res.send(err))
}

const getUser = (req, res) => {
  const { id } = req.params
  readFile(jsonDataPath)
    .then(data => {
      const userToFind = data.find(user => user._id === id)
      return userToFind
    })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: 'Нет пользователя с таким id' })
      }
      res.send(user)
    })
    .catch(err => res.send(err))
}

module.exports = {
  getUsers,
  getUser
}