const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	if (req.isAuthenticated()) {
		res.send(req.user);
	} else {
		res.send('Not signed in. <a href = "/auth/google"> Click here </a> <p> <a href = "/auth/microsoft"> Click here to login with Microsoft. </a></p>');
	}
});

module.exports = router;
