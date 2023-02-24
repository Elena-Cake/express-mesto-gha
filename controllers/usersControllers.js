const { CodeStatus } = require('../constans/CodeStatus');
const User = require('../models/user');

const createUserDTO = (user) => (
  {
    name: user.name,
    about: user.about,
    avatar: user.avatar,
    _id: user._id,
  }
);

const getUsers = (req, res, next) => {
  User
    .find({})
    .then((users) => res.status(CodeStatus.OK.CODE).send(
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
        res.status(CodeStatus.UNDERFINED.CODE).send(CodeStatus.UNDERFINED.USER_MESSAGE);
        return;
      }
      res.status(CodeStatus.OK.CODE).send(createUserDTO(user));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(CodeStatus.NO_VALIDATE.CODE).send(CodeStatus.NO_VALIDATE.MESSAGE);
        return;
      }
      next(err);
    });
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User
    .create({ name, about, avatar })
    .then((user) => res.status(CodeStatus.CREATED.CODE).send(createUserDTO(user)))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(CodeStatus.NO_VALIDATE.CODE).send(CodeStatus.NO_VALIDATE.MESSAGE);
        return;
      }
      next(err);
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User
    .findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(CodeStatus.UNDERFINED.CODE).send(CodeStatus.UNDERFINED.USER_MESSAGE);
        return;
      }
      res.status(CodeStatus.OK.CODE).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(CodeStatus.NO_VALIDATE.CODE).send(CodeStatus.NO_VALIDATE.MESSAGE);
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
        res.status(CodeStatus.UNDERFINED.CODE).send(CodeStatus.UNDERFINED.USER_MESSAGE);
        return;
      }
      res.status(CodeStatus.OK.CODE).send(createUserDTO(user));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(CodeStatus.NO_VALIDATE.CODE).send(CodeStatus.NO_VALIDATE.MESSAGE);
        return;
      }
      next(err);
    });
};

module.exports = {
  getUsers, getUser, createUser, updateUser, updateAvatar,
};
