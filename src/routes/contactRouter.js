const express = require('express');
const getData = require('../functions/getData');

const router = express.Router();

router.get('/', (req, res) => {
	try {
		res.render('contact', {
			title: 'CONTACT | IEEE SIESGST'
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: 'Fail',
			message: 'Server Error!'
		});
	}
});

router.post('/', async (req, res) => {
	try {
		const domainData = {
			domain: 'contact',
			name: req.body.firstName + ' ' + req.body.lastName,
			email: req.body.email,
			phone: req.body.phoneNumber,
			message: req.body.message
		};
		const homeResponse = await getData(domainData);
		console.log(homeResponse.data);

		res.json({ message: 'done' });
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: 'Fail',
			message: 'Server Error!'
		});
	}
});

module.exports = router;
