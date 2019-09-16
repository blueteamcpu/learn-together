const router = require('express').Router();
const { compareStrAgainstHash } = require('../../utils/index');
const { cache } = require('../app/serializeUserMiddleware');

router.put('/updateUser', async (req, res, next) => {
  try {
    const newUser = await req.user.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      zipcode: req.body.zipcode,
      username: req.body.username,
    });

    cache.clear(req.session.userId);
    cache.set(req.session.userId, newUser);

    res.send(newUser);
  } catch (err) {
    next(err);
  }
});

router.put('/updateUserPass', async (req, res, next) => {
  try {
    const validation = await compareStrAgainstHash(
      req.body.password,
      req.user.password
    );

    if (validation) {
      const user = await req.user.update({
        password: req.body.NPass,
      });

      cache.clear(req.session.userId);
      cache.set(req.session.userId, user);

      res.sendStatus(204);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
