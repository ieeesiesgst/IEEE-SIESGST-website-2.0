const express = require('express');
const getData = require('../functions/getData');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const domainData = {
			domain: 'gallery',
			topic: 'gallery'
		};
		const galleryRes = await getData(domainData);
		// console.log(galleryRes.data);
		res.render('gallery', {
			title: 'GALLERY | IEEE SIESGST'
		});
	} catch (err) {
		console.log(err);
		res.status(400).json({
			status: 'Fail',
			message: 'Server Error!'
		});
	}
});

module.exports = router;
