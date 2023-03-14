class UnderfinedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnderfinedError';
    this.statusCode = 404;
  }
}

module.exports = UnderfinedError;
