const router = require('express').Router();
// const { client, cacheDuration } = require('../redis');
const { Post } = require('../db/index');
const {isLoggedIn} = require('../../utils/backend');

// create an event
router.put('/createPost', isLoggedIn, async (req, res, next) => {
    try {
        res.json(await Post.create({
            ...req.body,
            userId: req.user.id,
            groupId: req.params.groupId,
        }));
    } catch (err) {
        next(err);
    }
});

//get all posts associated with a user
router.get('/userPosts', isLoggedIn, async (req, res, next) => {
    try {
        res.json(await Post.findAll({
            where: {
                userId: req.user.id
            }
        }));
    } catch (err) {
        next(err);
    }
});

//get all posts associated to a group
router.get('/groupPosts/:groupId', async (req, res, next) => {
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

//get all posts associated to an event
router.get('/eventPosts/:eventId', async (req, res, next) => {
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

  // grab a single post i.e. when someone clicks on a post link to read comments
router.get('/:postId', async (req, res, next) => {
    try {
        res.json(await Post.findOne({
            where: {
                id: req.params.postId
            }
        }));
    } catch (err) {
        next(err)
    }
});


module.exports = router;
