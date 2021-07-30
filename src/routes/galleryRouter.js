// const { parse } = require('dotenv');
const express = require('express');
const getData = require('../functions/getData');
const cachedata = require('../cache/cacheData');

const CacheService = require('../cache/nodeCacheData');

const ttl = 60 * 60 * 1; // cache for 1 Hour
const cache = new CacheService(ttl); // Create a new cache service instance

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		let callPg = parseInt(req.query.page);
		if (isNaN(callPg) || callPg < 1) {
			callPg = 1;
		}
		const domainData = {
			domain: 'gallery',
			page: callPg
		};

		let galleryRes;
		if (callPg == 1) {
			galleryRes = cachedata('gallery');
		} else {
			await cache
				.get('gal' + callPg, async () => {
					const galData = await getData(domainData);
					galleryRes = galData.data;
					return galleryRes;
				})
				.then((result) => {
					galleryRes = result;
				})
				.catch((err) => {
					//ejected promise error
					console.log(err);
					res.status(500).json({
						status: 'Fail',
						message: 'Server Error!'
					});
				});
		}

		if (galleryRes.Error) {
			res.status(500).json({
				status: 'Fail',
				message: 'Server Error!'
			});
		} else {
			if (callPg > galleryRes.GlastPg) {
				callPg = galleryRes.GlastPg;
			}
			res.render('gallery', {
				title: 'GALLERY | IEEE SIESGST',
				lastPg: galleryRes.GlastPg,
				galResponse: galleryRes.GalRes,
				callPg: callPg
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
