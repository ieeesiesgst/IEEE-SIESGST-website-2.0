/* eslint-disable no-console */
const express = require('express');
const getData = require('../functions/getData');
const eventDivision = require('../functions/subFunctions/eventDivision');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const domainData = {
			domain: 'events'
		};
		const homeRes = await getData(domainData);
		if (homeRes.data.Error) {
			res.status(500).json({
				status: 'Fail',
				message: 'Server Error!'
			});
		} else {
			const eventArray = await eventDivision(homeRes, 1);
			res.render('home', {
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
