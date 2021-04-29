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
			if ((err.name = 'UserExistsError')) {
				User.where({ email: req.body.email }).findOne((error, user) => {
					if (error) {
						res.status(501).send({ message: 'Server Error' });
					} else if (user && (user.googleId || user.microsoftId)) {
						res.send({
							message: 'User exists with Microsoft/Google id'
						});
						return;
					} else {
						console.log('hereee');
						User.where({
							email: req.body.email,
							verified: false
						}).findOneAndDelete((error, user) => {
							if (error) {
								res.status(501).send({
									message: 'Server Error'
								});
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

module.exports = router;
