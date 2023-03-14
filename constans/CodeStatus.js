const CodeStatus = {
  OK: { CODE: 200 },
  CREATED: { CODE: 201 },
  NO_VALIDATE: {
    CODE: 400,
    MESSAGE: 'Переданы некорректные данные',
  },
  UNAUTHORIZED: {
    CODE: 401,
    MESSAGE: 'Проверьте почту и пароль',
  },
  FORBIDDEN: {
    CODE: 403,
    MESSAGE: 'Недостаточно прав',
  },
  UNDERFINED: {
    CODE: 404,
    USER_MESSAGE: 'Пользователь не найден',
    CARD_MESSAGE: 'Карточка не найдена',
    TEAPOT_MESSAGE: 'я - чайник!',
  },
  CONFLICT: {
    CODE: 409,
    MESSAGE: 'Пользователь с такими данными уже существует',
  },
  INTERNAL: {
    CODE: 500,
    MESSAGE: 'Проблема во мне...',
  },
};

module.exports = { CodeStatus };
