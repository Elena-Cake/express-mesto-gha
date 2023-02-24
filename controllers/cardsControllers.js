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
  const { name, link } = req.body
  Card.create({ name, link, owner: req.user._id })
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
    .then(card => {
      if (!card) {
        res.status(CodeStatus.UNDERFINED.CODE).send(CodeStatus.UNDERFINED.CARD_MESSAGE)
        return;
      }
      res.status(CodeStatus.OK.CODE).send(createCardStructure(card))
    })
    .catch(err => {
      if (err.name === "CastError") {
        res.status(CodeStatus.NO_VALIDATE.CODE).send(CodeStatus.NO_VALIDATE.MESSAGE)
        return;
      }
      next(err);
    })
}

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true }
  )
    .then(card => {
      if (!card) {
        res.status(CodeStatus.UNDERFINED.CODE).send(CodeStatus.UNDERFINED.CARD_MESSAGE)
        return;
      }
      res.status(CodeStatus.OK.CODE).send(createCardStructure(card))
    })
    .catch(err => {
      if (err.name === "CastError") {
        res.status(CodeStatus.NO_VALIDATE.CODE).send(CodeStatus.NO_VALIDATE.MESSAGE)
        return;
      }
      next(err);
    })
}

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true }
  )
    .then(card => {
      if (!card) {
        res.status(CodeStatus.UNDERFINED.CODE).send(CodeStatus.UNDERFINED.CARD_MESSAGE)
        return;
      }
      res.status(CodeStatus.OK.CODE).send(createCardStructure(card))
    })
    .catch(err => {
      if (err.name === "CastError") {
        res.status(CodeStatus.NO_VALIDATE.CODE).send(CodeStatus.NO_VALIDATE.MESSAGE)
        return;
      }
      next(err);
    })
}

module.exports = { getCards, createCard, deleteCard, likeCard, dislikeCard }