const express = require('express');
const CryptoJS = require('crypto-js');

const formatImage = require('./formatImage');

const router = express.Router();

router.get('/', (req, res) => {
	res.render('techopediaReceipt', {
		title: 'Download TechopediaX Receipt'
	});
	res.end();
});

router.post('/', async (req, res) => {
	try {
		let decryptObject = CryptoJS.Rabbit.decrypt(
			req.query.all,
			process.env.TECHOEDIAX_KEY
		).toString(CryptoJS.enc.Utf8);

		let body = JSON.parse(decryptObject);

		let result = await formatImage(body);

		if (result.message) {
			res.status(200).json({
				event: body.a,
				img: result.data,
				message: true
			});
			res.end();
		} else {
			res.status(400).send('Bad Request');
			res.end();
		}
	} catch (err) {
		res.status(500).send('Server Error');
		res.end();
	}
});

module.exports = router;
