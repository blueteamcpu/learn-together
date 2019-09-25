const router = require('express').Router();
const uuid = require('uuid/v4');
const { Comment, User } = require('../db/index');
const { isLoggedIn } = require('../../utils/backend');

// type: post / event
router.get('/thread/:id', async (req, res, next) => {
  try {
    if (!req.params.id) {
      res.sendStatus(400);
    }

    const comments = await Comment.findAll({
      where: { threadId: req.params.id },
      include: [{ model: User, attributes: ['username'] }],
      order: [['createdAt', 'DESC']],
    });

    res.json(comments);
  } catch (error) {
    next(error);
  }
});

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
      include: [
        { model: Comment, attributes: ['id'] },
        { model: User, attributes: ['username'] },
      ],
      order: [['createdAt', 'DESC']],
    };

    if (offset) {
      query.offset = offset;
    }

    const comments = await Comment.findAll(query);

    comments.forEach(c => {
      c.dataValues.threadCount = c.comments.length;
      delete c.dataValues.comments;
    });

    res.json(comments);
  } catch (error) {
    next(error);
  }
});

// type: post / event
router.post('/:type/:typeId/comment/:commentId', isLoggedIn, (req, res) => {
  const { type, typeId, commentId } = req.params;
  const { content } = req.body;

  if (!type || !typeId || !commentId || !content) {
    res.sendStatus(400);
  }

  const io = req.app.get('io');
  const room = `${type}-${typeId}`;

  const id = uuid();

  Comment.commentOnAComment(commentId, content, id, req.user.id).catch(() => {
    io.in(room).emit('message-thread-error', {
      threadId: commentId,
      id,
    });
  });

  const initDate = new Date();

  io.in(room).emit('message-thread', {
    id,
    content: content,
    createdAt: initDate,
    updatedAt: initDate,
    threadId: commentId,
    user: {
      id: req.user.id,
      username: req.user.username,
    },
  });

  res.end();
});

// type: post / event
router.post('/:type/:typeId', isLoggedIn, (req, res) => {
  const { type, typeId } = req.params;
  const { content } = req.body;

  if (!type || !typeId || !content) {
    res.sendStatus(400);
  }

  const io = req.app.get('io');
  const room = `${type}-${typeId}`;

  const id = uuid();
  const fk = type + 'Id';

  Comment.create({
    id,
    userId: req.user.id,
    content: content,
    [fk]: typeId,
  }).catch(() => {
    io.in(room).emit('message-error', { id });
  });

  const initDate = new Date();

  io.in(room).emit('message', {
    id,
    content: content,
    createdAt: initDate,
    updatedAt: initDate,
    [fk]: typeId,
    user: {
      id: req.user.id,
      username: req.user.username,
    },
    threadCount: 0,
  });

  res.end();
});

module.exports = router;
