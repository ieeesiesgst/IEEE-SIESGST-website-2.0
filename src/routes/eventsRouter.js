const express = require('express');
const getData = require('../functions/getData');
const eventDivision = require('../functions/subFunctions/eventDivision');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const domainData = {
			domain: 'events',
			topic: 'events'
		};
		const homeResponse = await getData(domainData);
		const eventArray = await eventDivision(homeResponse);

		// homeEvent = {
		// 	name: homeResponse.data.Ename,
		// 	pic: homeResponse.data.Epic
		// };
		res.render('partials/events', { title: 'EVENTS | IEEE SIESGST' });
	} catch (err) {
		console.log(err);
		res.status(400).json({
			status: 'Fail',
			essage: 'Server Error!'
		});
	}
});

module.exports = router;
