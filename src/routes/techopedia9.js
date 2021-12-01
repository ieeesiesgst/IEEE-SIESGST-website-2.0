const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	try {
		res.render('techopedia9', {
			title: 'TECHOPEDIA 9.0 | IEEE SIESGST'
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
