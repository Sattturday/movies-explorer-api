const User = require('../models/user');
const { messages } = require('../utils/constants');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .orFail(new NotFoundError(messages.users.notFound))
    .then((user) => res.send(user))
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  const id = req.user._id;

  User.findByIdAndUpdate(
    id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(messages.users.updateBadRequest));
        return;
      }
      next(err);
    });
};

module.exports = {
  getUsers,
  getCurrentUser,
  updateProfile,
};
