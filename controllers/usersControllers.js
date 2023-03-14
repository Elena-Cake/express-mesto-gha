const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const { CodeStatus } = require('../constans/CodeStatus');
const User = require('../models/user');
const { JWT_SECRET } = require('../config');
const UnderfinedError = require('../errors/Underfined');
const NoValidateError = require('../errors/NoValidate');
const ConflictError = require('../errors/Conflict');
const UnauthorizedError = require('../errors/Unauthorized');

const createUserDTO = (user) => (
  {
    name: user.name,
    about: user.about,
    avatar: user.avatar,
    email: user.email,
    _id: user._id,
  }
);

const getUsers = (req, res, next) => {
  User
    .find({})
    .then((users) => res.status(CodeStatus.OK.CODE)
      .send(
        users.map((user) => (
          createUserDTO(user)
        )),
      ))
    .catch(next);
};

const getUser = (req, res, next) => {
  const id = req.user._id;
  User
    .findById(id)
    .then((user) => {
      if (!user) {
        throw next(new UnderfinedError('Пользователь не найден'));
      }
      res.status(CodeStatus.OK.CODE)
        .send(createUserDTO(user));
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        throw next(new NoValidateError());
      }
    })
    .catch(next);
};

// POST http://localhost:3001/users/signup
const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User
        .create({
          name,
          about,
          avatar,
          email,
          password: hash,
        })
        .then((user) => res.status(CodeStatus.CREATED.CODE)
          .send(createUserDTO(user)))
        .catch((err) => {
          if (err instanceof mongoose.Error.ValidationError) {
            throw next(new NoValidateError());
          }
          if (err.code === 11000) {
            throw next(new ConflictError());
          }
        })
        .catch(next);
    });
};

// POST http://localhost:3001/users/login
const login = (req, res, next) => {
  const { email, password } = req.body;
  User
    .findOne({ email }).select('+password')
    .orFail(() => {
      throw next(new UnauthorizedError());
    })
    .then((user) => bcrypt.compare(password, user.password).then((mached) => {
      if (mached) {
        return user;
      }
      throw next(new UnauthorizedError());
    }))
    .then((user) => {
      const jwt = jsonwebtoken.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ user: createUserDTO(user), jwt });
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User
    .findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw next(new UnderfinedError('Пользователь не найден'));
      }
      res.status(CodeStatus.OK.CODE)
        .send({ data: user });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        throw next(new NoValidateError());
      }
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User
    .findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw next(new UnderfinedError('Пользователь не найден'));
      }
      res.status(CodeStatus.OK.CODE)
        .send(createUserDTO(user));
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        throw next(new NoValidateError());
      }
      next(err);
    });
};

module.exports = {
  getUsers, getUser, createUser, updateUser, updateAvatar, login,
};
