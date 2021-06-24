const express = require('express');
const getData = require('../functions/getData');

const router = express.Router();

router.get('/', async (req, res) => {
	if (req.isAuthenticated()) {
		res.send(req.user);
	} else {
		const domainData = {
			domain: 'events',
			topic: 'events'
		};
		var x = await getData(domainData);
		console.log(x);
		// res.send('correct');
		res.render('test', { title: 'HOME | IEEE SIESGST' });
	}
});

// router.get('/logout', function (req, res) {
// 	req.logout();
// 	res.redirect('/');
// });

module.exports = router;
