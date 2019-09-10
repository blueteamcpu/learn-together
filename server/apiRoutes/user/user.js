const router = require('express').Router();
const {User} = require('../../db/index');

router.post('/updateUser', async (req, res, next) => {
    try {
        const newUser = await User.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        zipcode: req.body.zipcode,
        username: req.body.username
    }, {
        where: {
            id: req.session.userId
        }
    });
    if (newUser){
        res.send('User Updated')
    }
} catch (err){
    next(err);
}
});

module.exports = router;
