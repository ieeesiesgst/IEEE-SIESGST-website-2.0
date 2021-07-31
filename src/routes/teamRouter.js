const express = require('express');
// const getData = require('../functions/getData');

const router = express.Router();

router.get('/', (req, res) => {
	try {
		// const domainData = {
		// 	domain: 'team',
		// 	topic: 'team'
		// };
		// const homeResponse = await getData(domainData);
		res.render('teams', {
			title: 'TEAM | IEEE SIESGST'
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: 'Fail',
			message: 'Server Error!'
		});
	}
});

module.exports = router;
