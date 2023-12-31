const { celebrate, Joi } = require('celebrate');
const { urlRegex } = require('../utils/constants');

const movieCelebrate = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    cardId: Joi.string().length(12).hex().required(),
    year: Joi.string().required(),
    created_at: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(urlRegex),
    trailerLink: Joi.string().required().regex(urlRegex),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    isSaved: Joi.bool().required(),
  }),
});

const movieIdCelebrate = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  movieCelebrate,
  movieIdCelebrate,
};
