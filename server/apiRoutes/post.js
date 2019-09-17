const router = require('express').Router();
//const { queryForUser } = require('../../utils/backend');
// const { client, cacheDuration } = require('../redis');
const { Post } = require('../db/index');

router.get('/groupPosts', async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            where: {
                groupId: req.params.groupId
            }
        });
        res.json(posts);
    } catch (err) {
        next(err);
    }
});

router.get('/eventPosts', async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            where: {
                eventId: req.params.eventId
            }
        })
        res.json(posts);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
