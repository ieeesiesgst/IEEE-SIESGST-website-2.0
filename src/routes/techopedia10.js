const express = require('express');
const CryptoJS = require('crypto-js');

const router = express.Router();

router.get('/', (req, res) => {
	try {
		let decryptName = CryptoJS.Rabbit.decrypt(
			req.query.x,
			process.env.TECHOEDIAX_KEY
		).toString(CryptoJS.enc.Utf8);

		let decryptEvent = CryptoJS.Rabbit.decrypt(
			req.query.y,
			process.env.TECHOEDIAX_KEY
		).toString(CryptoJS.enc.Utf8);

		console.log(decryptName, decryptEvent);
		res.send('TechopediaX receipts route working.');
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: 'Fail',
			message: 'Server Error!'
		});
	}
});
module.exports = router;
