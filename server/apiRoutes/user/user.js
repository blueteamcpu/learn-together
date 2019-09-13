const router = require('express').Router();
const {User} = require('../../db/index');
const {compareStrAgainstHash} = require('../../../utils/index');

router.put('/updateUser', async (req, res, next) => {
    try {
        const newUser = await req.user.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        zipcode: req.body.zipcode,
        username: req.body.username
    });
    res.send(newUser);
} catch (err){
    next(err);
}
});

router.put('/updateUserPass', async (req, res, next) => {
    try {
        const validation = await compareStrAgainstHash(req.body.password, req.user.password);
        if (validation){
            await req.user.update({
            password: req.body.NPass
            });
            res.sendStatus(204);
        } else {
            res.sendStatus(401);
        }
    } catch (err){
        next(err);
    }
});

module.exports = router;
