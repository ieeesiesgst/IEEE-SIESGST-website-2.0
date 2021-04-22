const User = require('../../schema/userSchema');
const signUpController = require('../../controllers/signUpController');
const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/signup', (req, res) => {
	res.send({ message: 'singUp page' });
});

router.post('/signup', signUpController, (req, res) => {
	User.register(res.locals.user, req.body.password, (err, user) => {
		if (err) {
			console.log(err);
			res.send(err);
		} else {
			passport.authenticate('local')(req, res, () => {
				res.send({ message: 'done' });
			});
		}
	});
});

module.exports = router;
