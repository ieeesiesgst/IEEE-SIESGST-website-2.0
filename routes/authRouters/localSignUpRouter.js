const User = require('../../schema/userSchema');
const signUpController = require('../../controllers/signUpController');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const verifyEmail = require('../../functions/verifyEmail');
const CryptoJS = require('crypto-js');

router.get('/signup', (req, res) => {
	res.render();
});

router.get('/signup/verifymail', (req, res) => {
	const decryptedVerification = CryptoJS.Rabbit.decrypt(
		req.query.v,
		process.env.VERIFY_ENCRYPTION
	)
		.toString(CryptoJS.enc.Utf8) //emailtimestamp
		.split(' ');

	if (decryptedVerification.length != 2) {
		res.status(404);
		res.end();
	}

	const checkEmail = decryptedVerification[0];
	const time = parseInt(decryptedVerification[1]);

	if (req.isAuthenticated() && req.user.email != email) {
		res.status(404);
		res.end();
	} else if (time + 24 * 60 * 60 * 1000 < new Date().getTime()) {
		res.status(401);
		res.send('Verification expired page.');
		// res.render('verification-expired');
		// res.end();
	} else {
		User.where({ email: checkEmail }).findOne((err, user) => {
			if (err) {
				res.status(500);
				res.end('Server Error!');
			} else if (user) {
				if (user.verified) {
					res.send('already verfified');
					// res.redirect('/home');
					// res.end();
				} else {
					user.verified = true;
					user.save(); //callback
					// res.send('verified noww');
					res.redirect('/auth/login');
				}
			} else {
				res.status(500);
				res.end('Server Error!');
			}
		});
	}
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
				var verifyURL = CryptoJS.Rabbit.encrypt(
					req.user.email + ' ' + new Date().getTime(),
					process.env.VERIFY_ENCRYPTION
				).toString();

				verifyURL =
					req.headers.host +
					'/auth/signup/verifymail?v=' +
					encodeURIComponent(verifyURL);

				const mailData = {
					email: req.body.email,
					name: req.body.name,
					verifyURL: verifyURL
				};
				verifyEmail(mailData);

				res.send({ message: 'please verify your email.' });
			});
		}
	});
});

module.exports = router;
