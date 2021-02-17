const router = require('express').Router();
const path = require('path');
const getDataFromFile = require('../helpers/getFromFile');
const { get } = require('./users');
const dataPath = path.join(__dirname, '..', 'data', 'cards.json');

const getCards = (req, res) => {
  return getDataFromFile(dataPath)
    .then(cards => res.status(200).send(cards))
    .catch(err => res.status(400).send(err));
}

router.get('/cards', getCards);

module.exports = router;