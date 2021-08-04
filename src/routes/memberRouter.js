const express = require('express');
const getData = require('../functions/getData');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const domainData = {
			domain: 'teams'
		};
		const teamRes = await getData(domainData);
		// console.log(teamRes.data);
		res.render('members', {
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
