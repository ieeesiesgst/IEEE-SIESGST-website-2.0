const User = require('../../schema/userSchema');
const signUpController = require('../../controller/signUpController');

exports.creatUser = (req, res) => {
	try {
		if (
			!(
				req.body.name &&
				req.body.email &&
				req.body.password &&
				req.body.college &&
				req.body.contact &&
				req.body.branch &&
				req.body.yearOfStudy
			) ||
			req.body.password == '' ||
			req.body.name == '' ||
			req.body.email == '' ||
			req.body.branch == '' ||
			req.body.college == '' ||
			req.body.contact == '' ||
			req.body.yearOfStudy == ''
		) {
			res.status(401);
		} else if (req.body.password !== req.body.passwordCheck) {
			res.send({ message: 'Passwords do not match' });
		} else {
			let pwTest = new RegExp(
				'^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
			);
			if (pwTest.test(req.body.password)) {
				console.log(req.body);
				User.register(
					{
						name: String(req.body.name)
							.replace(/&/g, '&amp;')
							.replace(/</g, '&lt;')
							.replace(/>/g, '&gt;')
							.replace(/"/g, '&quot;'),
						email: String(req.body.email)
							.replace(/&/g, '&amp;')
							.replace(/</g, '&lt;')
							.replace(/>/g, '&gt;')
							.replace(/"/g, '&quot;'),
						college: String(req.body.college)
							.replace(/&/g, '&amp;')
							.replace(/</g, '&lt;')
							.replace(/>/g, '&gt;')
							.replace(/"/g, '&quot;'),
						branch: String(req.body.branch)
							.replace(/&/g, '&amp;')
							.replace(/</g, '&lt;')
							.replace(/>/g, '&gt;')
							.replace(/"/g, '&quot;'),
						yearOfStudy: String(req.body.yearOfStudy)
							.replace(/&/g, '&amp;')
							.replace(/</g, '&lt;')
							.replace(/>/g, '&gt;')
							.replace(/"/g, '&quot;'),
						contact: String(req.body.contact)
							.replace(/&/g, '&amp;')
							.replace(/</g, '&lt;')
							.replace(/>/g, '&gt;')
							.replace(/"/g, '&quot;')
					},
					req.body.password,
					function (err, user) {
						if (err) {
							if (err.name === 'UserExistsError') {
								res.json({
									success: false,
									message: 'Username  already exist'
								});
							} else {
								res.json({
									success: false,
									message:
										'Your account could not be saved. Error: ',
									err
								});
							}
						} else {
							res.json({
								success: true,
								message:
									'Your account has been saved, Now you can login!'
							});
						}
					}
				);
			} else {
				res.send({
					message: "Password doesn't satisfy the conditions!"
				});
			}
		}
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err
		});
	}
};
