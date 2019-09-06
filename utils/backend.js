class AuthenticationError extends Error {
  constructor(field, message) {
    super(message);
    this.type = 'Authentication';
    this.field = field;
    this.status = 401;
  }
}

module.exports = {
  AuthenticationError,
};
