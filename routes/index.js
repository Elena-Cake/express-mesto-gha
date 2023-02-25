const router = require('express').Router();
const { CodeStatus } = require('../constans/CodeStatus');

const userRoutes = require('./user');
const cardRoutes = require('./card');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

router.use((req, res) => {
  res.status(CodeStatus.UNDERFINED.CODE).send({ message: CodeStatus.UNDERFINED.TEAPOT_MESSAGE });
});

module.exports = router;
