const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	if (req.isAuthenticated()) {
		res.send(req.user);
	} else {
		res.render('test', { title: 'HOME | IEEE SIESGST' });
	}
});

// router.get('/logout', function (req, res) {
// 	req.logout();
// 	res.redirect('/');
// });

module.exports = router;
