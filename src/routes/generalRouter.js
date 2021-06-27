const express = require('express');
const getData = require('../functions/getData');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		if (req.isAuthenticated()) {
			res.send(req.user);
		} else {
			const domainData = {
				domain: 'events',
				topic: 'events'
			};
			const homeResponse = await getData(domainData);
			homeEvent = {
				name: homeResponse.data.Ename,
				pic: homeResponse.data.Epic
			};
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
	} catch (err) {
		res.status(400).json({
			status: 'Fail',
			message: 'Server Error!'
		});
	}
});

// router.get('/logout', function (req, res) {
// 	req.logout();
// 	res.redirect('/');
// });

module.exports = router;
