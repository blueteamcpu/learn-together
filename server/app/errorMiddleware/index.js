const parseErrors = require('./parseErrors');

const middleware = (e, _, res, next) => {
  if (
    e.name === 'SequelizeValidationError' ||
    e.name === 'SequelizeUniqueConstraintError'
  ) {
    res.json(parseErrors(e.errors));
    return;
  }
  next(e);
};

module.exports = middleware;
