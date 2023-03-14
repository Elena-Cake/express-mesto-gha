class UnderfinedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnderfinedError';
    this.statusCode = 403;
  }
}

module.exports = UnderfinedError;
