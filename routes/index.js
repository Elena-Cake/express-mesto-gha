const router = require('express').Router()

const userRoutes = require('./user')
const cardRoutes = require('./card')

router.use('/users', userRoutes)
router.use('/cards', cardRoutes)

router.use((req, res) => {
  res.status(404).send({ error: "я" })
})

module.exports = router;