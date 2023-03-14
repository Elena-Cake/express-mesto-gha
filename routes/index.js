const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const userRoutes = require('./user');
const cardRoutes = require('./card');
const { createUser, login } = require('../controllers/usersControllers');

router.post(
  '/users/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string()
        .regex(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/),
    }),
  }),
  createUser,
);

router.post(
  '/users/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
    }),
  }),
  login,
);

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

router.use(
  (req, res) => {
    res.status(404).send({ message: 'Неправильный путь' });
  },
);

module.exports = router;
