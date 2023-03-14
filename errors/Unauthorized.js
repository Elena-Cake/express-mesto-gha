class UnauthorizedError extends Error {
  constructor() {
    super();
    this.message = 'Проверьте почту и пароль';
    this.name = 'AnauthorizedError';
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
