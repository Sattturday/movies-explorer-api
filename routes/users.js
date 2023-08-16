const router = require('express').Router();

const {
  getUsers,
  getCurrentUser,
  updateProfile,
} = require('../controllers/users');

const {
  profileUpdateCelebrate,
} = require('../validation/userValidation');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.patch('/me', profileUpdateCelebrate, updateProfile);

module.exports = router;
