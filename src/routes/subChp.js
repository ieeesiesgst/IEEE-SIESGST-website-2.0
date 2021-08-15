const express = require('express');
const cachedata = require('../cache/cacheData');
const router = express.Router();

router.get('/', (req, res) => {
	try {
		const subRes = cachedata('subChp');
		let chapterRes;

		if (req.query.chp == 'wie') {
			chapterRes = subRes.Wie;
		} else if (req.query.chp == 'mtts') {
			chapterRes = subRes.Mtts;
		} else if (req.query.chp == 'isv') {
			chapterRes = subRes.Wie;
		} else if (req.query.chp == 'cs') {
			chapterRes = subRes.Cs;
		} else {
			chapterRes = subRes.Isv;
		}
		// console.log(chapterRes);

		if (subRes.Error) {
			res.status(500).json({
				status: 'Fail',
				message: 'Server Error!'
			});
		} else {
			res.render('wie', {
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
