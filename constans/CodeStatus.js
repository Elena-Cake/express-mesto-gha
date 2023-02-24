const CodeStatus = {
  OK: {
    CODE: 200
  },
  CREATED: {
    CODE: 201
  },
  NO_VALIDATE: {
    CODE: 400,
    MESSAGE: { "message": "Переданы некорректные данные" }
  },
  UNDERFIND: {
    CODE: 404,
    USER_MESSAGE: { "message": "Пользователь не найден" },
    CARD_MESSAGE: { "message": "Карточка не найдена" }
  },
  INTERNAL: {
    CODE: 500,
    MESSAGE: { "message": "Проблема во мне..." }
  }
}

module.exports = { CodeStatus }