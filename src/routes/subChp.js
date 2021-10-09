const express = require('express');
const cachedata = require('../cache/cacheData');
const router = express.Router();

router.get('/:chapter', (req, res) => {
	try {
		const subRes = cachedata('subChp');
		let chapterRes, renderPg;

		if (req.params.chapter == 'wie') {
			chapterRes = subRes.Wie;
			renderPg = 'wie';
		} else if (req.params.chapter == 'mtts') {
			chapterRes = subRes.Mtts;
			renderPg = 'mtts';
		} else if (req.params.chapter == 'isv') {
			chapterRes = subRes.Isv;
			renderPg = 'isv';
		} else if (req.params.chapter == 'cs') {
			chapterRes = subRes.Cs;
			renderPg = 'cs';
		} else {
			chapterRes = subRes.Wie;
			renderPg = 'wie';
		}

		if (subRes.Error) {
			res.status(500).json({
				status: 'Fail',
				message: 'Server Error!'
			});
		} else {
			res.render(renderPg, {
				title:
					req.params.chapter?.toLocaleUpperCase() +
					' SUB-CHAPTER | IEEE SIESGST',
				chapterRes: chapterRes
			});
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
