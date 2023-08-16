const jsonwebtoken = require('jsonwebtoken');
const { messages } = require('../utils/constants');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(new UnauthorizedError(messages.shared.badToken));
    return;
  }

  let payload;

  try {
    payload = jsonwebtoken.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new UnauthorizedError(messages.shared.badToken));
    return;
  }

  req.user = {
    _id: payload._id,
  };

  next();
};

module.exports = { auth };
