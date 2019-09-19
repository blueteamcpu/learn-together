const router = require('express').Router();
const { Post } = require('../db/index');
const {isLoggedIn} = require('../../utils/backend');

// create an post
router.post('/createPost', isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.create({
            ...req.body,
            userId: req.user.id,
            groupId: req.body.groupId,
        });
        res.json(post);
    } catch (err) {
        next(err);
    }
});

//get all posts associated with a user
router.get('/userPosts', isLoggedIn, async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            where: {
                userId: req.user.id
            }
        })
        res.json(posts);
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

  // grab a single post i.e. when someone clicks on a post link to read comments
router.get('/:postId', async (req, res, next) => {
    try {
        const posts = await Post.findOne({
            where: {
                id: req.params.postId
            }
        });
        res.json(posts);
    } catch (err) {
        next(err)
    }
});


module.exports = router;
