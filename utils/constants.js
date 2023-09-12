const messages = {
  shared: {
    serverError: 'На сервере произошла ошибка.',
    notFound: 'По указанному пути ничего не найдено.',
    badToken: 'Необходима авторизация.',
    clearCookie: 'Выход совершен',
  },
  users: {
    notFound: 'Пользователь с указанным _id не найден.',
    badRequest: 'Переданы некорректные данные',
    createBadRequest: 'Переданы некорректные данные при создании пользователя.',
    updateBadRequest: 'Переданы некорректные данные при обновлении профиля.',
    badEmail: 'Пользователь с таким email уже зарегестрирован.',
    badLogin: 'Неверный email или пароль.',
  },
  movies: {
    notFound: 'Фильм с указанным _id не найден.',
    badRequest: 'Переданы некорректные данные.',
    badId: 'Фильм  с указанным id уже есть в базе.',
    forbiddenDelete: 'Недостаточно прав для удаления этого фильма.',
    deleteMovie: 'Фильм успешно удален.',
  },
};

const statuses = {
  created: 201,
  badRequest: 400,
  badLogin: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  default: 500,
};

const urlRegex = /https?:\/\/(www.)?[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=,]*\.[a-zA-Z]*/;

module.exports = {
  messages,
  statuses,
  urlRegex,
};
