const express = require('express');
const eventDivision = require('../functions/subFunctions/eventDivision');
const cachedata = require('../cache/cacheData');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const homeResponse = cachedata('events');
		if (homeResponse == undefined) {
			const eventArray = [];
			res.render('events', {
				title: 'EVENTS | IEEE SIESGST',
				eventArray: eventArray
			});
		} else if (homeResponse.Error) {
			res.status(500).json({
				status: 'Fail',
				message: 'Server Error!'
			});
		} else {
			const eventArray = await eventDivision(homeResponse, 2);
			// console.log(eventArray);
			res.render('events', {
				title: 'EVENTS | IEEE SIESGST',
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
