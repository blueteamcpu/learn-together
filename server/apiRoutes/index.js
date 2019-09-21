const router = require('express').Router();

router.use('/groups', require('./group'));
router.use('/events', require('./event'));
router.use('/user', require('./user'));
router.use('/posts', require('./post'));

module.exports = router;
