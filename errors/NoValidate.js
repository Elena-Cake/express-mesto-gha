class NoValidateError extends Error {
  constructor() {
    super();
    this.message = 'Переданы некорректные данные';
    this.name = 'NoValidateError';
    this.statusCode = 400;
  }
}

module.exports = NoValidateError;
