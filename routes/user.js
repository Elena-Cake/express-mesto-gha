const router = require('express').Router();
const {
  getUsers, getUser, createUser, updateUser, updateAvatar, login,
} = require('../controllers/usersControllers');

const { auth } = require('../midldlewares/auth');

router.get('/', auth, getUsers);
router.get('/:id', auth, getUser);

router.post('/signup', createUser);
router.post('/login', login);

router.patch('/me', auth, updateUser);
router.patch('/me/avatar', auth, updateAvatar);

module.exports = router;
