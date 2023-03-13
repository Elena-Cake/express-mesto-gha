const mongoose = require('mongoose');
const { CodeStatus } = require('../constans/CodeStatus');
const User = require('../models/user');
const bcrypt = require('bcrypt');

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
  const { id } = req.params;
  User
    .findById(id)
    .then((user) => {
      if (!user) {
        res.status(CodeStatus.UNDERFINED.CODE)
          .send({ message: CodeStatus.UNDERFINED.USER_MESSAGE });
        return;
      }
      res.status(CodeStatus.OK.CODE)
        .send(createUserDTO(user));
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(CodeStatus.NO_VALIDATE.CODE)
          .send({ message: CodeStatus.NO_VALIDATE.MESSAGE });
        return;
      }
      next(err);
    });
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
            res.status(CodeStatus.NO_VALIDATE.CODE)
              .send({ message: CodeStatus.NO_VALIDATE.MESSAGE });
            return;
          }
          if (err.code === 11000) {
            res.status(CodeStatus.CONFLICT.CODE)
              .send({ message: CodeStatus.CONFLICT.MESSAGE });
          }
          next(err);
        });
    });
};

// POST http://localhost:3001/users/login
const login = (req, res, next) => {
  const { email, password } = req.body;
  res.status(200).send({ email, password })
    .catch((err) => {
      next(err);
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User
    .findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(CodeStatus.UNDERFINED.CODE)
          .send({ message: CodeStatus.UNDERFINED.USER_MESSAGE });
        return;
      }
      res.status(CodeStatus.OK.CODE)
        .send({ data: user });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(CodeStatus.NO_VALIDATE.CODE)
          .send({ message: CodeStatus.NO_VALIDATE.MESSAGE });
        return;
      }
      next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User
    .findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(CodeStatus.UNDERFINED.CODE)
          .send({ message: CodeStatus.UNDERFINED.USER_MESSAGE });
        return;
      }
      res.status(CodeStatus.OK.CODE)
        .send(createUserDTO(user));
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(CodeStatus.NO_VALIDATE.CODE)
          .send({ message: CodeStatus.NO_VALIDATE.MESSAGE });
        return;
      }
      next(err);
    });
};

module.exports = {
  getUsers, getUser, createUser, updateUser, updateAvatar, login,
};
