const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	try {
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
