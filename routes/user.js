const router = require('express').Router();
const {
  getUsers, getUser, createUser, updateUser, updateAvatar, login,
} = require('../controllers/usersControllers');

router.get('/', getUsers);
router.get('/:id', getUser);

router.post('/signup', createUser);
router.post('/login', login);

router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
