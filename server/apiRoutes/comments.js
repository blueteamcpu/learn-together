const router = require('express').Router();
const uuid = require('uuid/v4');
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

router.post('/:type/:typeId/comment/:commentId', isLoggedIn, (req, res) => {
  const io = req.app.get('io');
  const room = `${req.params.type}-${req.params.typeId}`;

  const id = uuid();

  Comment.commentOnAComment(
    req.params.commentId,
    req.body.content,
    id,
    req.user.id
  ).catch(() => {
    io.in(room).emit('message-thread-error', {
      threadId: req.params.commentId,
      id,
    });
  });

  const initDate = new Date();

  io.in(room).emit('message-thread', {
    id,
    content: req.body.content,
    createdAt: initDate,
    updatedAt: initDate,
    threadId: req.params.commentId,
    userId: req.user.id,
    username: req.user.username,
  });

  res.end();
});

router.post('/:type/:id', isLoggedIn, (req, res) => {
  const io = req.app.get('io');
  const room = `${req.params.type}-${req.params.id}`;

  const id = uuid();

  Comment.create({
    id,
    userId: req.user.id,
    content: req.body.content,
    [req.params.type + 'Id']: req.params.id,
  }).catch(() => {
    io.in(room).emit('message-error', { id });
  });

  const initDate = new Date();

  io.in(room).emit('message', {
    id,
    content: req.body.content,
    createdAt: initDate,
    updatedAt: initDate,
    [req.params.type + 'Id']: req.params.id,
    userId: req.user.id,
    username: req.user.username,
  });

  res.end();
});

module.exports = router;
