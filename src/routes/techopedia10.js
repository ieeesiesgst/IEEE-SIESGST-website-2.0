const express = require('express');
const CryptoJS = require('crypto-js');

const router = express.Router();

router.get('/', (req, res) => {
	try {
		let decryptObject = CryptoJS.Rabbit.decrypt(
			req.query.all,
			process.env.TECHOEDIAX_KEY
		).toString(CryptoJS.enc.Utf8);

		let allDataObj = JSON.parse(decryptObject);
		console.log(allDataObj);

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
