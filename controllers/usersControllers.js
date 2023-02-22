const users = require('../models/user')
const User = require('../models/user')

const getUsers = (req, res) => {
  return User.find({})
    .then(users => res.status(200).send(users))
}

const getUser = (req, res) => {
  const { id } = req.params

  return User.findById(id)
    .then(user => res.status(200).send(user))
}

const createUser = (req, res) => {
  const { name, about, avatar } = req.body
  console.log("_________________hop hey la la ley_________________", req)
  User.create({ name, about, avatar })
    .then(user => res.status(200).send({ name: user.name, about: user.about, avatar: user.avatar }))
}

module.exports = { getUsers, getUser, createUser }