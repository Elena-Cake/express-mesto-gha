const router = require('express').Router()
const { getUsers, getUser, createUser } = require('../controllers/usersControllers')

app.get('/', getUsers)
app.get('/:id', getUser)

app.post('/', createUser)

module.exports = router