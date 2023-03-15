const mongoose = require('mongoose');
const { CodeStatus } = require('../constans/CodeStatus');
const ForbiddenError = require('../errors/Forbidden');
const NoValidateError = require('../errors/NoValidate');
const UnderfinedError = require('../errors/Underfined');
const Card = require('../models/card');

const createCardDTO = (card) => (
  {
    createdAt: card.createdAt,
    likes: card.likes,
    link: card.link,
    name: card.name,
    owner: card.owner,
    _id: card._id,
  }
);

// GET http://localhost:3001/cards/
const getCards = (req, res, next) => {
  Card
    .find({})
    .populate(['owner', 'likes'])
    .then((cards) => {
      res.status(CodeStatus.OK.CODE)
        .send(
          cards.map((card) => createCardDTO(card)),
        );
    })
    .catch(next);
};

// POST http://localhost:3001/cards/
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card
    .create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(CodeStatus.CREATED.CODE)
        .send(createCardDTO(card));
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new NoValidateError());
        return;
      }
      next(err);
    });
};

// DELETE http://localhost:3001/cards/:cardId
const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card
    .findById(cardId)
    .then((card) => {
      if (!card) {
        throw new UnderfinedError('Карточка не найдена');
      }
      if (userId !== card.owner.valueOf()) {
        throw new ForbiddenError();
      }
      return card.remove()
        .then(() => res.send({ card }));
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new NoValidateError());
        return;
      }
      next(err);
    });
};

// PUT http://localhost:3001/cards/:cardId/likes
const likeCard = (req, res, next) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .populate('owner')
    .then((card) => {
      if (!card) {
        throw new UnderfinedError('Карточка не найдена');
      }
      res.status(CodeStatus.OK.CODE)
        .send(createCardDTO(card));
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new NoValidateError());
        return;
      }
      next(err);
    });
};

// DELETE http://localhost:3001/cards/:cardId/likes
const dislikeCard = (req, res, next) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .populate('owner')
    .then((card) => {
      if (!card) {
        throw new UnderfinedError('Карточка не найдена');
      }
      res.status(CodeStatus.OK.CODE)
        .send(createCardDTO(card));
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new NoValidateError());
        return;
      }
      next(err);
    });
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
