class ForbiddenError extends Error {
  constructor() {
    super();
    this.message = 'Недостаточно прав';
    this.name = 'ForbiddenError';
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
