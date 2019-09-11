const router = require('express').Router();
const {User} = require('../../db/index');
const {makeHash} = require('../../../utils/backend')

router.post('/updateUser', async (req, res, next) => {
    try {
        const newUser = await User.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        zipcode: req.body.zipcode,
        username: req.body.username
    }, {
        returning: true,
        where: {
            id: req.session.userId
        }
    });
    if (newUser){
        res.send(newUser);
    }
} catch (err){
    next(err);
}
});

router.post('/updateUserPass', async (req, res, next) => {
    try {
        const newUser = await User.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        zipcode: req.body.zipcode,
        username: req.body.username,
        password: req.body.NPass
    }, {
        returning: true,
        where: {
            id: req.session.userId,
            password: makeHash(req.body.password),
        }
    });
    if (newUser){
        res.send(newUser);
    }
} catch (err){
    res.send(err);
    next(err);
}
});

module.exports = router;
