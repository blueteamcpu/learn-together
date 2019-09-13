const router = require('express').Router();
const {User} = require('../../db/index');
const {compareStrAgainstHash} = require('../../../utils/index');

router.put('/updateUser', async (req, res, next) => {
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
    if (newUser !== [0]){
        res.send(newUser[1][0]);
    } else {
        res.send('No User Found')
    }
} catch (err){
    next(err);
}
});

router.put('/updateUserPass', async (req, res, next) => {
    try {
        const validation = await compareStrAgainstHash(req.body.password, req.user.password);
        console.log('HIT IN UPDATEUSERPASS')
        console.log(validation)
        if (validation && req.user.id === req.session.userId){
            console.log('HIT IN VALIDATION')
            await req.user.update({
            password: req.body.NPass
            });
            res.sendStatus(204);
        } else {
            console.log('FAILED')
            res.sendStatus(401);
        }
    } catch (err){
        next(err);
    }
});

module.exports = router;
