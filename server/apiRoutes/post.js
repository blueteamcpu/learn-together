const router = require('express').Router();
const { Post, User } = require('../db/index');
const { isLoggedIn } = require('../../utils/backend');

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
            },
            include: [
                { model: User, attributes: ['id', 'username', 'imageURL'] },
              ],
        });
        res.json(posts);
    } catch (err) {
        next(err);
    }
});

//delete a post
router.delete('/deletePost/:postId', isLoggedIn, async (req, res, next) => {
    if (req.user.isSiteAdmin) {
        const deleted = await Post.destroy({
            where: {
                id: req.params.id,
            }
        });
        if (deleted) {
            res.status(201);
        } else {
            res.status(400);
        }
    } else {
        const deleted = Post.destroy({
            where: {
                id: req.params.id,
                userId: req.user.id
            }
        });
        if (deleted) {
            res.status(201);
        } else {
            res.status(400);
        }
    }
});

// grab a single post i.e. when someone clicks on a post link to read comments
router.get('/:postId', async (req, res, next) => {
    try {
        const post = await Post.findOne({
            where: {
                id: req.params.postId
            }
        });
        if (post.userId === req.user.id) {
            post.creator = true;
        } else if (req.user.isSiteAdmin) {
            post.admin = true;
        }
        res.json(post);
    } catch (err) {
        next(err)
    }
});

module.exports = router;
