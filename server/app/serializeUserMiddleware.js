const { User } = require('../db/index');
const { client, cacheDuration } = require('../redis');

const middleware = (req, _, next) => {
  if (req.session && req.session.userId) {
    client.get(req.session.userId, async (error, data) => {
      if (error) {
        next(error);
      } else if (data) {
        req.user = JSON.parse(data);
        next();
      } else {
        const user = await User.findOne({
          where: { id: req.session.userId },
        });

        client.setex(
          req.session.userId,
          cacheDuration,
          JSON.stringify(user),
          err => {
            if (err) {
              next(err);
            } else {
              req.user = user;
              next();
            }
          }
        );
      }
    });
  } else {
    next();
  }
};

module.exports = middleware;
