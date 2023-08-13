const { celebrate, Joi } = require('celebrate');

const signUpCelebrate = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().required().min(2).max(30),
    }),
});

const signInCelebrate = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
});

const profileUpdateCelebrate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports = {
  signUpCelebrate,
  signInCelebrate,
  profileUpdateCelebrate,
};
