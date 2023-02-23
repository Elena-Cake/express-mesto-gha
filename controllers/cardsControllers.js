
const Card = require('../models/card')

const ERROR_CODE_VALIDATE = 400;
const ERROR_MESSAGE_VALIDATE_OBJECT = { "message": "Переданы некорректные данные" }

const ERROR_CODE_UNDERFIND = 404;
const ERROR_MESSAGE_UNDERFIND_OBJECT = { "message": "Карточка не найдена" }

const ERROR_CODE_INTERNAL = 500;
const ERROR_MESSAGE_INTERNAL_OBJECT = { "message": "Что-то не так..." }

const sendInternalError = (res) => {
  res.status(ERROR_CODE_INTERNAL).send(ERROR_MESSAGE_INTERNAL_OBJECT)
}

const createCardStructure = (card) => {
  return {
    createdAt: card.createdAt,
    likes: card.likes,
    link: card.link,
    name: card.name,
    owner: card.owner,
    _id: card._id
  }
}


const getCards = (req, res) => {
  return Card.find({})
    .then(cards => res.status(200).send(
      cards.map(card => createCardStructure(card))
    ))
    .catch(err => {
      sendInternalError(res)
    })
}

const createCard = (req, res) => {
  const { name, link, owner } = req.body
  Card.create({ name, link, owner })
    .then(card => res.status(200).send(createCardStructure(card)))
    .catch(err => {
      if (err.name === "ValidationError") {
        res.status(ERROR_CODE_VALIDATE).send(ERROR_MESSAGE_VALIDATE_OBJECT)
        return;
      }
      sendInternalError(res)
    })
}

const deleteCard = (req, res) => {
  const { cardId } = req.params
  Card.findByIdAndRemove(cardId)
    .then(card => res.status(200).send(createCardStructure(card)))
    .catch(err => {
      sendInternalError(res)
    })
}

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then(card => res.status(200).send(createCardStructure(card)))
    .catch(err => {
      if (err.name === "CastError") {
        res.status(ERROR_CODE_UNDERFIND).send(ERROR_MESSAGE_UNDERFIND_OBJECT)
        return;
      }
      sendInternalError(res)
    })
}

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then(card => res.status(200).send(createCardStructure(card)))
    .catch(err => {
      if (err.name === "CastError") {
        res.status(ERROR_CODE_UNDERFIND).send(ERROR_MESSAGE_UNDERFIND_OBJECT)
        return;
      }
      sendInternalError(res)
    })
}

module.exports = { getCards, createCard, deleteCard, likeCard, dislikeCard }