const router = require('express').Router()

const userRoutes = require('./user')

router.use('/users', userRoutes)

router.use((req, res) => {
  res.status(404).send({ error: "Ой" })
})

module.exports = router;