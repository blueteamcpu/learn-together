class AuthenticationError extends Error {
  constructor(field, message) {
    super(message);
    this.type = 'Authentication';
    this.field = field;
    this.status = 401;
  }
}
class EventError extends Error {
  constructor(field, message) {
    super(message);
    this.type = 'Event';
    this.field = field;
    this.status = 401;
  }
}

const queryForUser = User => async (req, _, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });

    if (user) {
      req.user = user;
    }
    
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  AuthenticationError,
  EventError,
  queryForUser,
};
