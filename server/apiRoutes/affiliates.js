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

router.post('/topics/new', async (req, res, next) => {
  try {
    const newTopic = await Topic.create({name: req.body.name});
    res.status(201).send({ name: newTopic.name, id: newTopic.id });
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
