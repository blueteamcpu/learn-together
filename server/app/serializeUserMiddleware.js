const { User } = require('../db/index');
const { getAsync, setExAsync, cacheDuration } = require('../redis');

const middleware = async (req, _, next) => {
  try {
    if (req.session && req.session.userId) {
      const data = await getAsync(req.session.userId);

      if (data) {
        req.user = JSON.parse(data);
      } else {
        const user = await User.findOne({
          where: { id: req.session.userId },
        });

        await setExAsync(
          req.session.userId,
          cacheDuration,
          JSON.stringify(user)
        );

        req.user = user;
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = middleware;
