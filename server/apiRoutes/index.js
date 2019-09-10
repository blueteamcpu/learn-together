const router = require('express').Router();

router.use('/groups', require('./group'));

module.exports = router;
