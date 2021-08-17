const express = require('express');
const cachedata = require('../cache/cacheData');
const router = express.Router();

router.get('/', (req, res) => {
	try {
		const subRes = cachedata('subChp');
		let chapterRes, renderPg;

		if (req.query.chp == 'wie') {
			chapterRes = subRes.Wie;
			renderPg = 'wie';
		} else if (req.query.chp == 'mtts') {
			chapterRes = subRes.Mtts;
			renderPg = 'mtts';
		} else if (req.query.chp == 'isv') {
			chapterRes = subRes.Isv;
			renderPg = 'isv';
		} else if (req.query.chp == 'cs') {
			chapterRes = subRes.Cs;
			renderPg = 'cs';
		} else {
			chapterRes = subRes.Wie;
			renderPg = 'wie';
		}
		// console.log(chapterRes);

		if (subRes.Error) {
			res.status(500).json({
				status: 'Fail',
				message: 'Server Error!'
			});
		} else {
			res.render(renderPg, {
				title: 'SUB-CHAPTERS MEMBERS | IEEE SIESGST'
			});
			// res.send('done');
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: 'Fail',
			message: 'Server Error!'
		});
	}
});

module.exports = router;
