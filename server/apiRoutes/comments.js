const router = require('express').Router();
const { Comment } = require('../db/index');
const { isLoggedIn } = require('../../utils/backend');

// type: post / event
router.get('/:type/:id', async (req, res, next) => {
  try {
    let { offset } = req.query;
    let { type, id } = req.params;

    if (!type || !id) {
      res.sendStatus(400);
    }

    offset = offset ? parseInt(offset, 10) * 30 : 0;

    const query = {
      where: { [type + 'Id']: id },
      limit: 30,
      include: [{ model: Comment, attributes: ['id'] }],
    };

    if (offset) {
      query.offset = offset;
    }

    const comments = await Comment.findAll(query);

    res.json(comments);
  } catch (error) {
    next(error);
  }
});

router.get('/thread/:id', async (req, res, next) => {
  try {
    if (!req.params.id) {
      res.sendStatus(400);
    }

    const comments = await Comment.findAll({
      where: { threadId: req.params.id },
    });

    res.json(comments);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/events/:eventId/comment/:commentId',
  isLoggedIn,
  async (req, res, next) => {
    try {
      const io = req.app.get('io');

      const comment = await Comment.commentOnAComment(
        req.params.commentId,
        req.body.content,
        req.user.id
      );

      if (comment) {
        io.in(`event-${req.params.eventId}`).emit('message-thread', comment);
        res.end();
      } else {
        const error = new Error('thread-depth > 1');
        res.status(400).json({ error });
      }
    } catch (error) {
      next(error);
    }
  }
);

router.post('/events/:id', isLoggedIn, async (req, res, next) => {
  try {
    const io = req.app.get('io');

    const comment = await Comment.create({
      userId: req.user.id,
      content: req.body.content,
      eventId: req.params.id,
    });

    io.in(`event-${req.params.id}`).emit('message', comment);
    res.end();
  } catch (error) {
    next(error);
  }
});

router.post(
  '/posts/:postId/comment/:commentId',
  isLoggedIn,
  async (req, res, next) => {
    try {
      const io = req.app.get('io');

      const comment = await Comment.commentOnAComment(
        req.params.commentId,
        req.body.content,
        req.user.id
      );

      if (comment) {
        io.in(`post-${req.params.postId}`).emit('message-thread', comment);
        res.end();
      } else {
        const error = new Error('thread-depth > 1');
        res.status(400).json(error);
      }
    } catch (error) {
      next(error);
    }
  }
);

router.post('/posts/:id', isLoggedIn, async (req, res, next) => {
  try {
    const io = req.app.get('io');

    const comment = await Comment.create({
      userId: req.user.id,
      content: req.body.content,
      postId: req.params.id,
    });

    io.in(`post-${req.params.id}`).emit('message', comment);
    res.end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
