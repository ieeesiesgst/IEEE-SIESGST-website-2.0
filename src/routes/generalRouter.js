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
		const eventArray = await eventDivision(homeRes, 1);
		if (eventArray == 'error') {
			res.send({ message: 'Server Error!!' });
		} else {
			res.render('home', {
				title: 'HOME | IEEE SIESGST',
				event: eventArray
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
