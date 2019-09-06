const { User } = require('../db/index');

const middleware = async (req, res, next) => {
  try {
    if (req.session && req.session.userId) {
      const user = await User.findOne({ where: { id: req.session.userId } });

      if (user) {
        req.user = user;
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = middleware;
