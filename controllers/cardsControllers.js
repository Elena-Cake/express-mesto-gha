const cards = require('../models/card')
const Card = require('../models/card')

const getCards = (req, res) => {
  return Card.find({})
    .then(cards => res.status(200).send(cards))
}

const createCard = (req, res) => {
  const { name, link, owner } = req.body
  Card.create({ name, link, owner })
    .then(card => res.status(200).send({ name: card.name, link: card.link, owner: card.owner }))
}

const deleteCard = (req, res) => {
  const { cardId } = req.params
  Card.findByIdAndRemove(cardId)
    .then(card => res.status(200).send(card))
}

module.exports = { getCards, createCard, deleteCard }