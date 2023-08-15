const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const Movie = require('../models/movie');
const { messages, statuses } = require('../utils/constants');

const getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const data = req.body;
  const owner = req.user;
  Movie.create({ ...data, owner })
    .then((movie) => res.status(statuses.created).send(movie))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(messages.movies.badRequest));
        return;
      }
      if (err.name === 'ValidationError') {
        next(new BadRequestError(messages.movies.badRequest));
        return;
      }
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user._id;

  Movie.findOne({ _id: movieId })
    .orFail(new NotFoundError(messages.movies.notFound))
    .then((movie) => {
      if (userId !== String(movie.owner)) {
        next(new ForbiddenError(messages.movies.forbiddenDelete));
        return;
      }
      Movie.findByIdAndRemove(movie._id)
        .orFail(new NotFoundError(messages.movies.notFound))
        .then(() => res.send({ message: `${messages.movies.deleteMovie}` }))
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
