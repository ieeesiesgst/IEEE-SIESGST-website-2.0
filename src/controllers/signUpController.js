// var validator = require('validator');

// module.exports = (req, res, next) => {
// 	if (req.body.password === req.body.passwordCheck) {
// 		if (
// 			!(
// 				!(req.body.name && req.body.college && req.body.branch) ||
// 				req.body.password == '' ||
// 				req.body.name == '' ||
// 				req.body.email == '' ||
// 				req.body.branch == '' ||
// 				req.body.college == ''
// 			)
// 		) {
// 			if (
// 				typeof req.body.email == 'string' &&
// 				validator.isEmail(req.body.email)
// 			) {
// 				res.locals.user = {
// 					name: String(req.body.name)
// 						.replace(/&/g, '&amp;')
// 						.replace(/</g, '&lt;')
// 						.replace(/>/g, '&gt;')
// 						.replace(/"/g, '&quot;'),
// 					email: req.body.email,
// 					college: String(req.body.college)
// 						.replace(/&/g, '&amp;')
// 						.replace(/</g, '&lt;')
// 						.replace(/>/g, '&gt;')
// 						.replace(/"/g, '&quot;'),
// 					branch: String(req.body.branch)
// 						.replace(/&/g, '&amp;')
// 						.replace(/</g, '&lt;')
// 						.replace(/>/g, '&gt;')
// 						.replace(/"/g, '&quot;'),
// 					contact: String(req.body.contact)
// 						.replace(/&/g, '&amp;')
// 						.replace(/</g, '&lt;')
// 						.replace(/>/g, '&gt;')
// 						.replace(/"/g, '&quot;'),
// 					profileDetails: true
// 				};
// 				next();
// 			} else {
// 				res.send({
// 					message: 'Please enter correct Email!'
// 				});
// 			}
// 		} else {
// 			res.send({
// 				message: 'Incomplete inputs'
// 			});
// 		}
// 	} else {
// 		res.send({
// 			message: 'Password do not match!'
// 		});
// 	}
// };
