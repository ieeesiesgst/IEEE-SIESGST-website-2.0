const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	if (req.isAuthenticated()) {
		res.send(req.user);
	} else {
		res.send('Not signed in. <a href = "/auth/google"> Click here </a>');
	}
});

module.exports = router;
