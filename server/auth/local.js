const router = require('express').Router();
const { User } = require('../db/index');

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.signup(req.body);
    req.session.userId = user.id;
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.get('/login', async (req, res, next) => {
  try {
    const user = await User.login(req.body.email, req.body.password);
    req.session.userId = user.id;
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.use((error, req, res, next) => {
  if (error.type === 'Authentication') {
    res
      .status(error.status)
      .json({ error: { [error.field]: error.message } });
  } else {
    next(error);
  }
});

module.exports = router;
