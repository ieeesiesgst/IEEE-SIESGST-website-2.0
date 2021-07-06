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
		const Gdata = galleryRes.data;
		// console.log(Gdata.Gname);

		const lastPg = Math.ceil(Gdata.Gname.length / 9);
		// const limit = 9;
		let page;

		if (req.query.page * 1 > lastPg) {
			page = lastPg;
		} else if (req.query.page * 1 <= lastPg && req.query.page * 1 > 0) {
			page = req.query.page * 1;
		} else {
			page = 1;
		}

		const skip = (page - 1) * 9;
		let imgName = [],
			imgDes = [],
			imgLink = [];

		for (let i = skip; i < skip + 9; i++) {
			if (Gdata.Gname[i] != undefined) {
				imgName.push(Gdata.Gname[i]);
			}
			if (Gdata.Gdes[i] != undefined) {
				imgDes.push(Gdata.Gdes[i]);
			}
			if (Gdata.Gimg[i] != undefined) {
				imgLink.push(Gdata.Gimg[i]);
			}
		}
		// console.log(imgName);
		// console.log(imgDes);
		// console.log(imgLink);

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
