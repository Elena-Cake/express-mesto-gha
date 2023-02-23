
const User = require('../models/user')

const ERROR_CODE_VALIDATE = 400;
const ERROR_MESSAGE_VALIDATE_OBJECT = { "message": "Переданы некорректные данные" }

const ERROR_CODE_UNDERFIND = 404;
const ERROR_MESSAGE_UNDERFIND_OBJECT = { "message": "Пользователь не найден" }

const ERROR_CODE_INTERNAL = 500;
const ERROR_MESSAGE_INTERNAL_OBJECT = { "message": "Что-то не так..." }

const sendInternalError = (res) => {
  res.status(ERROR_CODE_INTERNAL).send(ERROR_MESSAGE_INTERNAL_OBJECT)
}

const createUserStructure = (user) => {
  return {
    name: user.name,
    about: user.about,
    avatar: user.avatar,
    _id: user._id,
  }
}


const getUsers = (req, res) => {
  return User.find({})
    .then(users => res.status(200).send(
      users.map(user => {
        return createUserStructure(user)
      })
    ))
    .catch(err => {
      sendInternalError(res)
    })
}

const getUser = (req, res) => {
  const { id } = req.params
  return User.findById(id)
    .then(user => {
      res.status(200).send(createUserStructure(user))
    })
    .catch(err => {
      if (err.name === "CastError") {
        res.status(ERROR_CODE_UNDERFIND).send(ERROR_MESSAGE_UNDERFIND_OBJECT)
        return;
      }
      sendInternalError(res)
    })
}

const createUser = (req, res) => {
  const { name, about, avatar } = req.body
  User.create({ name, about, avatar })
    .then(user => res.status(200).send(createUserStructure(user)))
    .catch(err => {
      if (err.name === "ValidationError") {
        res.status(ERROR_CODE_VALIDATE).send(ERROR_MESSAGE_VALIDATE_OBJECT)
        return;
      }
      sendInternalError(res)
    })
}

const updateUser = (req, res) => {
  const { name, about } = req.body
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then(user => res.status(200).send(createUserStructure(user)))
    .catch(err => {
      if (err.name === "ValidationError") {
        res.status(ERROR_CODE_VALIDATE).send(ERROR_MESSAGE_VALIDATE_OBJECT)
        return;
      }
      sendInternalError(res)
    })
}

const updateAvatar = (req, res) => {
  const { avatar } = req.body
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then(user => res.status(200).send(createUserStructure(user)))
    .catch(err => {
      if (err.name === "ValidationError") {
        res.status(ERROR_CODE_VALIDATE).send(ERROR_MESSAGE_VALIDATE_OBJECT)
        return;
      }
      sendInternalError(res)
    })
}

module.exports = { getUsers, getUser, createUser, updateUser, updateAvatar }