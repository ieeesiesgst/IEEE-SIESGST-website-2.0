const express = require('express');
const cachedata = require('../cache/cacheData');
const eventDivision = require('../functions/subFunctions/eventDivision');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const homeRes = cachedata('events');
		if (homeRes == undefined) {
			const eventArray = [];
			res.render('homeV2', {
				title: 'HOME | IEEE SIESGST',
				eventArray: eventArray
			});
		} else if (homeRes.Error) {
			res.status(500).json({
				status: 'Fail',
				message: 'Server Error!'
			});
		} else {
			const eventArray = await eventDivision(homeRes, 1);
			res.render('homeV2', {
				title: 'HOME | IEEE SIESGST',
				eventArray: eventArray
			});
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: 'Fail',
			message: 'Server Error!'
		});
	}
});

module.exports = router;
