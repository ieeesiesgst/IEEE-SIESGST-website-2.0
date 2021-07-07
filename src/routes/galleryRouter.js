const { parse } = require('dotenv');
const express = require('express');
const getData = require('../functions/getData');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		let callPg = parseInt(req.query.page);
		if (isNaN(callPg)) {
			callPg = 1;
		}
		const domainData = {
			domain: 'gallery',
			page: callPg
		};
		const galleryRes = await getData(domainData);
		// Gdata -- object of arrays i.e name, imgLink, description, type, alt, lastPg
		res.render('gallery', {
			title: 'GALLERY | IEEE SIESGST',
			lastPg: galleryRes.data.GlastPg,
			galResponse: galleryRes.data.GalRes,
			callPg: callPg
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
