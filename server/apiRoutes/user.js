const router = require('express').Router();
const { User } = require('../db/index');
const { compareStrAgainstHash } = require('../../utils/index');
const { queryForUser, isLoggedIn } = require('../../utils/backend');
const { client, cacheDurationInSeconds, setExAsync } = require('../redis');

router.put(
  '/updateUser',
  isLoggedIn,
  queryForUser(User),
  async (req, res, next) => {
    try {
      const newUser = await req.user.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        zipcode: req.body.zipcode,
        username: req.body.username,
        imageURL: req.body.imageURL
      });
      await setExAsync(
        req.session.userId,
        cacheDurationInSeconds,
        JSON.stringify(newUser),
      );
      res.send(newUser);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  '/updateUserPass',
  isLoggedIn,
  queryForUser(User),
  async (req, res, next) => {
    try {
      const validation = await compareStrAgainstHash(
        req.body.password,
        req.user.password
      );

      if (validation) {
        const user = await req.user.update({
          password: req.body.NPass,
        });

        await setExAsync(
          req.session.userId,
          cacheDurationInSeconds,
          JSON.stringify(user),
        );
        res.sendStatus(204);
      } else {
        res.sendStatus(401);
      }
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
