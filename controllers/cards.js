const readFile = require('../utils/read-file');
const path = require('path');
const jsonDataPath = path.join(__dirname, '..', 'data', 'cards.json');

const getCards = (req, res) => {
  readFile(jsonDataPath)
    .then(data => res.send(data))
    .catch(err => res.send(err))
}

module.exports = {
  getCards
}