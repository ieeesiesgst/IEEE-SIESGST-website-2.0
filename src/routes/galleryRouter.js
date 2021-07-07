const express = require('express');
const getData = require('../functions/getData');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const domainData = {
			domain: 'gallery',
			topic: 'gallery',
			page: req.query.page
		};
		const galleryRes = await getData(domainData);
		const Gdata = galleryRes.data;
		// Gdata -- object of arrays i.e name, imgLink, description, type

		// console.log(Gdata);
		console.log(Gdata.Gname);
		// console.log(Gdata.Gdes);
		// console.log(Gdata.Gimg);
		// console.log(Gdata.Gtype);
		// console.log(Gdata.Galt);
		// console.log(Gdata.GlastPg);

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
