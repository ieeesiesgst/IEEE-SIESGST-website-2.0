// // const User = require('../../schema/userSchema');
// const express = require('express');
// const router = express.Router();
// const passport = require('passport');
// const loginController = require('../../controllers/loginController');

// router.get('/login', (req, res) => {
// 	res.send({ message: 'Login page' });
// });

// router.post('/login', loginController, (req, res) => {
// 	req.login(res.locals.user, (err) => {
// 		console.log(err);
// 		if (err) {
// 			console.log(err);
// 			res.send({
// 				message: 'Incorrect Email Address or Password!!',
// 				status: 'failed'
// 			});
// 		} else {
// 			passport.authenticate('local')(req, res, (err) => {
// 				console.log(err);
// 				res.send({ message: 'done', status: 'success' });
// 			});
// 		}
// 	});
// });

// module.exports = router;
