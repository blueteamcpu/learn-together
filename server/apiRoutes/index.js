const router = require('express').Router();

router.use('/groups', require('./group'));
router.use('/events', require('./event'));

module.exports = router;
