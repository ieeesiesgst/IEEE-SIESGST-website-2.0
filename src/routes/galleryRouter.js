const express = require('express');
const getData = require('../functions/getData');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const domainData = {
			domain: 'gallery',
			topic: 'gallery'
		};
		const galleryRes = await getData(domainData);
		// console.log(galleryRes.data);
		// console.log(req.query.page);
		// const imgName = galleryRes.data.Gname;
		// console.log(imgName);

		// const page = 1;
		// const limit = 10;
		// const skip = (page - 1) * limit;

		// for(let i=0; i)

		// console.log(imgName.skip(5).limit(limit));

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
