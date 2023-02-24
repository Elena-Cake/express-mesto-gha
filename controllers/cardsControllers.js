const { CodeStatus } = require('../constans/CodeStatus')
const Card = require('../models/card')

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


const getCards = (req, res, next) => {
  return Card.find({})
    .then(cards => res.status(CodeStatus.OK.CODE).send(
      cards.map(card => createCardStructure(card))
    ))
    .catch(err => {
      next(err);
    })
}

const createCard = (req, res, next) => {
  const { name, link, owner } = req.body
  Card.create({ name, link, owner })
    .then(card => res.status(CodeStatus.OK.CODE).send(createCardStructure(card)))
    .catch(err => {
      if (err.name === "ValidationError") {
        res.status(CodeStatus.NO_VALIDATE.CODE).send(CodeStatus.NO_VALIDATE.MESSAGE)
        return;
      }
      next(err);
    })
}

const deleteCard = (req, res, next) => {
  const { cardId } = req.params
  Card.findByIdAndRemove(cardId)
    .then(card => res.status(CodeStatus.OK.CODE).send(createCardStructure(card)))
    .catch(err => {
      next(err);
    })
}

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then(card => res.status(CodeStatus.OK.CODE).send(createCardStructure(card)))
    .catch(err => {
      if (err.name === "CastError") {
        res.status(CodeStatus.UNDERFIND.CODE).send(CodeStatus.UNDERFIND.CARD_MESSAGE)
        return;
      }
      next(err);
    })
}

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then(card => res.status(CodeStatus.OK.CODE).send(createCardStructure(card)))
    .catch(err => {
      if (err.name === "CastError") {
        res.status(CodeStatus.UNDERFIND.CODE).send(CodeStatus.UNDERFIND.CARD_MESSAGE)
        return;
      }
      next(err);
    })
}

module.exports = { getCards, createCard, deleteCard, likeCard, dislikeCard }