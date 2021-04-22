module.exports = (req, res, next) => {
	if (
		!(
			req.body.name &&
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
		return true;
	}
};
