class ConflictError extends Error {
  constructor() {
    super();
    this.message = 'Пользователь с такими данными уже существует';
    this.name = 'ConflictError';
    this.statusCode = 401;
  }
}

module.exports = ConflictError;
