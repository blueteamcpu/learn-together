const router = require('express').Router();

router.use('/groups', require('./group'));
router.use('/events', require('./event'));
router.use('/user', require('./user'));
router.use('/comments', require('./comments'));
router.use('/posts', require('./post'));
router.use('/affiliates', require('./affiliates'));

module.exports = router;
