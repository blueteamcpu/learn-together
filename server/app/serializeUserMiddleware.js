// const redis = require('redis');
const { User } = require('../db/index');
const Cache = require('../../utils/cache');

// const REDIS_PORT = process.env.REDIS_PORT || 6379;
// const client = redis.createClient(REDIS_PORT);
const cacheDuration = 1000 * 60 * 2;

// const middleware = (req, _, next) => {
//   if (req.session && req.session.userId) {
//     client.get(req.session.userId, async (error, data) => {
//       if (error) {
//         next(error);
//       } else if (data) {
//         req.user = JSON.parse(data);
//         next();
//       } else {
//         const user = await User.findOne({
//           where: { id: req.session.userId },
//         });

//         client.setex(
//           req.session.userId,
//           cacheDuration,
//           JSON.stringify(user),
//           err => {
//             if (err) {
//               next(err);
//             } else {
//               req.user = user;
//               next();
//             }
//           }
//         );
//       }
//     });
//   } else {
//     next();
//   }
// };

const cache = new Cache();

const middleware = async (req, _, next) => {
  try {
    if (req.session && req.session.userId) {
      if (cache.hasKey(req.session.userId)) {
        req.user = cache.get(req.session.userId).value;
      } else {
        const user = await User.findOne({ where: { id: req.session.userId } });
        req.user = user;
        cache.set(req.session.userId, { value: user }, cacheDuration);
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = middleware;
