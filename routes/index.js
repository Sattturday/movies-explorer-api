const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const { auth } = require('../middlewares/auth');
const { createUser, login, logout } = require('../controllers/auth');
const { signUpCelebrate, signInCelebrate } = require('../validation/userValidation');
const NotFoundError = require('../errors/NotFoundError');
const { messages } = require('../utils/constants');

router.post('/signup', signUpCelebrate, createUser);
router.post('/signin', signInCelebrate, login);

router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.post('/signout', logout);

router.use((req, res, next) => {
  next(new NotFoundError(messages.shared.notFound));
});

module.exports = router;
