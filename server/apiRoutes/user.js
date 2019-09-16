const router = require('express').Router();
const { User } = require('../db/index');
const { compareStrAgainstHash } = require('../../utils/index');
const { queryForUser } = require('../../utils/backend');
const { client, cacheDuration } = require('../redis');

router.put('/updateUser', queryForUser(User), async (req, res, next) => {
  try {
    const newUser = await req.user.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      zipcode: req.body.zipcode,
      username: req.body.username,
    });

    client.setex(
      req.session.userId,
      cacheDuration,
      JSON.stringify(newUser),
      err => {
        if (err) {
          next(err);
        } else {
          res.send(newUser);
        }
      }
    );
  } catch (err) {
    next(err);
  }
});

router.put('/updateUserPass', queryForUser(User), async (req, res, next) => {
  try {
    const validation = await compareStrAgainstHash(
      req.body.password,
      req.user.password
    );

    if (validation) {
      const user = await req.user.update({
        password: req.body.NPass,
      });

      client.setex(
        req.session.userId,
        cacheDuration,
        JSON.stringify(user),
        err => {
          if (err) {
            next(err);
          } else {
            res.send(user);
          }
        }
      );

      res.sendStatus(204);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
