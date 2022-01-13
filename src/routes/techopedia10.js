const express = require('express');
const CryptoJS = require('crypto-js');

const router = express.Router();

function decryptValue(encodedVal) {
	let decodedVal = [];
	for (let k = 0; k < encodedVal.length; k++) {
		let decryptName = CryptoJS.Rabbit.decrypt(
			encodedVal[k],
			process.env.TECHOEDIAX_KEY
		).toString(CryptoJS.enc.Utf8);
		decodedVal.push(decryptName);
	}
	return decodedVal;
}

router.get('/', (req, res) => {
	try {
		let params = Object.keys(req.query).length;
		let encodedValue;
		if (params == 3) {
			encodedValue = [req.query.x, req.query.a, req.query.b];
		}
		if (params == 4) {
			encodedValue = [req.query.x, req.query.y, req.query.a, req.query.b];
		}
		if (params == 5) {
			encodedValue = [
				req.query.x,
				req.query.y,
				req.query.z,
				req.query.a,
				req.query.b
			];
		}
		console.log(decryptValue(encodedValue));
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
