// const User = require('../schema/userSchema');

// module.exports = (req, res, next) => {
// 	if (req.isAuthenticated()) {
// 		res.status(401);
// 	} else if (
// 		!(req.body.email && req.body.password) ||
// 		req.body.email == '' ||
// 		req.body.password == ''
// 	) {
// 		res.send({
// 			message: 'Incorrect Email Address or Password',
// 			status: 'failed'
// 		});
// 	} else {
// 		const user = new User({
// 			email: req.body.email,
// 			password: req.body.password
// 		});
// 		res.locals.user = user;
// 		next();
// 	}
// };
