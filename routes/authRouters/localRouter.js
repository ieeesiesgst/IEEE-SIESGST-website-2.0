const User = require('../../schema/userSchema');
const signUpController = require('../../controllers/signUpController');
const LoginController = require('../../controllers/loginController');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const loginController = require('../../controllers/loginController');

router.get('/signup', (req, res) => {
	res.send({ message: 'singUp page' });
});

router.post('/signup', signUpController, (req, res) => {
	User.register(res.locals.user, req.body.password, (err, user) => {
		if (err) {
			if ((err.name = 'UserExistsError')) {
				// Adventure.findOne({ country: 'Croatia' }, function (err, adventure) {});
				User.where({
					email: req.body.email,
					verified: false
				}).findOneAndDelete((error, user) => {
					if (error) {
						res.status(501).send({ message: 'Server Error' });
					} else if (user) {
						User.register(
							res.locals.user,
							req.body.password,
							(err, user) => {
								if (err) {
									res.send(err);
								} else {
									passport.authenticate('local')(
										req,
										res,
										() => {
											res.send({
												message: 'done'
											});
										}
									);
								}
							}
						);
					} else {
						res.send(err);
					}
				});
			} else {
				res.send(err);
			}
		} else {
			passport.authenticate('local')(req, res, () => {
				res.send({ message: 'done' });
			});
		}
	});
});

router.get('/login', (req, res) => {
	res.send({ message: 'Login page' });
});

router.post('/login', loginController, (req, res) => {
	req.login(res.locals.user, (err) => {
		console.log(err);
		if (err) {
			console.log(err);
			res.send({
				message: 'Incorrect Email Address or Password!!',
				status: 'failed'
			});
		} else {
			passport.authenticate('local')(req, res, (err) => {
				console.log(err);
				res.send({ message: 'done', status: 'success' });
			});
		}
	});
});

module.exports = router;
