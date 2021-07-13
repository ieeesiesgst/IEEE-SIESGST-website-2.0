const express = require('express');
// const getData = require('../functions/getData');

const router = express.Router();

router.get('/', (req, res) => {
	try {
		// const domainData = {
		// 	domain: 'events'
		// };
		// const homeResponse = await getData(domainData);
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

router.post('/', (req, res) => {
	try {
		const data = {
			name: req.body.firstName + ' ' + req.body.lastName,
			email: req.body.email,
			phone: req.body.phoneNumber,
			message: req.body.message
		};
		console.log(data);

		const domainData = {
			domain: 'contact',
			data
		};
		// const homeResponse = await getData(domainData);
		// console.log(req);

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
