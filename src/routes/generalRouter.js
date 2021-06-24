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

		var homeEvent = await getData(domainData);
		if (homeEvent == 'error') {
			res.send({ message: 'Server Error!!' });
		} else {
			res.render('test', {
				title: 'HOME | IEEE SIESGST',
				eventName: homeEvent.name,
				eventPic: homeEvent.pic
			});
		}
	}
});

// router.get('/logout', function (req, res) {
// 	req.logout();
// 	res.redirect('/');
// });

module.exports = router;
