const { User } = require('../db/index');
const {
  existsAsync,
  getAsync,
  setExAsync,
  cacheDurationInSeconds,
} = require('../redis');

const middleware = async (req, _, next) => {
  try {
    if (req.session && req.session.userId) {
      const userIsCached = await existsAsync(req.session.userId);

      if (userIsCached) {
        const data = await getAsync(req.session.userId);

        req.user = JSON.parse(data);
      } else {
        const user = await User.findOne({
          where: { id: req.session.userId },
        });

        await setExAsync(
          req.session.userId,
          cacheDurationInSeconds,
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
