const express = require('express');
const getData = require('../functions/getData');
const cachedata = require('../cache/cacheData');

const CacheService = require('../cache/nodeCacheData');

const ttl = 60 * 60 * 1;
const cache = new CacheService(ttl);

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		// res.render('achivements', {
		//     title: 'ACHIEVEMENTS | IEEE SIESGST',
		//     lastPg: galleryRes.GlastPg,
		//     galResponse: galleryRes.GalRes,
		//     callPg: callPg
		// });
		res.send('done');
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: 'Fail',
			message: 'Server Error!'
		});
	}
});

module.exports = router;
