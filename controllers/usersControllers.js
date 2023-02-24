const { CodeStatus } = require('../constans/CodeStatus')
const User = require('../models/user')

const createUserStructure = (user) => {
  return {
    name: user.name,
    about: user.about,
    avatar: user.avatar,
    _id: user._id,
  }
}


const getUsers = (req, res, next) => {
  return User.find({})
    .then(users => res.status(CodeStatus.OK.CODE).send(
      users.map(user => {
        return createUserStructure(user)
      })
    ))
    .catch(err => {
      next(err);
    })
}

const getUser = (req, res, next) => {
  const { id } = req.params
  return User.findById(id)
    .then(user => {
      if (!user) {
        res.status(CodeStatus.UNDERFIND.CODE).send(CodeStatus.UNDERFIND.USER_MESSAGE)
        return;
      }
      console.log(user)
      res.status(CodeStatus.OK.CODE).send(createUserStructure(user))
    })
    .catch(err => {
      console.log(err)
      if (err.name === "CastError") {
        res.status(CodeStatus.NO_VALIDATE.CODE).send(CodeStatus.NO_VALIDATE.MESSAGE)
        return;
      }
      next(err);
    })
}

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body
  User.create({ name, about, avatar })
    .then(user => res.status(CodeStatus.OK.CODE).send(createUserStructure(user)))
    .catch(err => {
      if (err.name === "ValidationError") {
        res.status(CodeStatus.NO_VALIDATE.CODE).send(CodeStatus.NO_VALIDATE.MESSAGE)
        return;
      }
      next(err);
    })
}

const updateUser = (req, res, next) => {
  const { name, about } = req.body
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then(user => {
      if (!user) {
        res.status(CodeStatus.UNDERFIND.CODE).send(CodeStatus.UNDERFIND.USER_MESSAGE)
        return;
      }
      return res.status(CodeStatus.OK.CODE).send({ data: user })
    })
    .catch(err => {
      if (err.name === "ValidationError") {
        res.status(CodeStatus.NO_VALIDATE.CODE).send(CodeStatus.NO_VALIDATE.MESSAGE)
        return;
      }
      next(err);
    })
}

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then(user => {
      if (!user) {
        res.status(CodeStatus.UNDERFIND.CODE).send(CodeStatus.UNDERFIND.USER_MESSAGE)
        return;
      }
      res.status(CodeStatus.OK.CODE).send(createUserStructure(user))
    })
    .catch(err => {
      if (err.name === "ValidationError") {
        res.status(CodeStatus.NO_VALIDATE.CODE).send(CodeStatus.NO_VALIDATE.MESSAGE)
        return;
      }
      sendInternalError(res)
    })
}

module.exports = { getUsers, getUser, createUser, updateUser, updateAvatar }