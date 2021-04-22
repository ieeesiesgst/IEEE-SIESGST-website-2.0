const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	console.log(req.flash('info'));
	if (req.isAuthenticated()) {
		res.send(req.user);
	} else {
		res.send(
			'Not signed in. <a href = "/auth/google"> Click here </a> <p> <a href = "/auth/microsoft"> Click here to login with Microsoft. </a></p> <p><from action="/auth/login" method = "POST"><input placeholder="name" type="text" id="fname" name="fname"><br><br><input placeholder="password" type="text" id="lname" name="lname"><br><br></p><input type="submit" value="Submit"></form>'
		);
	}
});

router.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});
module.exports = router;
