/* eslint-disable no-useless-escape */
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUser, updateUser, updateAvatar, getOwner,
} = require('../controllers/usersControllers');
const { auth } = require('../midldlewares/auth');

router.use(auth);

router.get('/', getUsers);
router.get('/me', getOwner);

router.get('/:id', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().pattern(/[0-9a-f]{24}/i),
  }),
}), getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?/i),
  }),
}), updateAvatar);

module.exports = router;
