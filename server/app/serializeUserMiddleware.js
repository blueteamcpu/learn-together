const redis = require('redis');
const { User } = require('../db/index');

const REDIS_PORT = process.env.REDIS_PORT || 6379;
const client = redis.createClient(REDIS_PORT);
const cacheDuration = 1000 * 60 * 2;

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
