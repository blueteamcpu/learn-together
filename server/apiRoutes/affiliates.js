const router = require('express').Router();
const { Topic, Course } = require('../db/index');

router.get('/topics/all', async (req, res, next) => {
  try {
    res.send(await Topic.findAll({ attributes: ['name', 'id'] }));
  }
  catch(e) {
    next(e);
  }
});

router.get('/courses/all', async (req, res, next) => {
  try {
    res.send(await Course.findAll({ attributes: ['name', 'link'] }));
  }
  catch(e) {
    next(e);
  }
});

module.exports = router;
