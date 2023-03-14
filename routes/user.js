const router = require('express').Router();
const {
  getUsers, getUser, updateUser, updateAvatar, getOwner,
} = require('../controllers/usersControllers');
const { auth } = require('../midldlewares/auth');

router.get('/', auth, getUsers);
router.get('/:id', auth, getUser);
router.get('/me', auth, getOwner);
router.patch('/me', auth, updateUser);
router.patch('/me/avatar', auth, updateAvatar);

module.exports = router;
