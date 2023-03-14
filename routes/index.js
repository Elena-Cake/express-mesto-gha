const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { CodeStatus } = require('../constans/CodeStatus');
const { createUser, login } = require('../controllers/usersControllers');

const userRoutes = require('./user');
const cardRoutes = require('./card');

// http://localhost:3001/users/signup
router.post('/users/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/),
  }),
}), createUser);

// http://localhost:3001/users/login
router.post('/users/login', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), login);

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

router.use((req, res) => {
  res.status(CodeStatus.UNDERFINED.CODE).send({ message: CodeStatus.UNDERFINED.TEAPOT_MESSAGE });
});

module.exports = router;
