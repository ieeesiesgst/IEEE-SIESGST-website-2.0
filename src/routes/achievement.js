const express = require('express');
const getData = require('../functions/getData');
const cachedata = require('../cache/cacheData');

const CacheService = require('../cache/nodeCacheData');

const ttl = 60 * 60 * 1;
const cache = new CacheService(ttl);

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		let callPg = parseInt(req.query.page);
		if (isNaN(callPg) || callPg < 1) {
			callPg = 1;
		}
		const domainData = {
			domain: 'achieve',
			page: callPg
		};

		let achieveRes;
		if (callPg == 1) {
			achieveRes = cachedata('achieve');
		} else {
			await cache
				.get('achieve' + callPg, async () => {
					const achieveData = await getData(domainData);
					achieveRes = achieveData.data;
					return achieveRes;
				})
				.then((result) => {
					achieveRes = result;
				})
				.catch((err) => {
					//rejected promise error
					console.log(err);
					res.status(500).json({
						status: 'Fail',
						message: 'Server Error!'
					});
				});
		}

		if (achieveRes.Error) {
			res.status(500).json({
				status: 'Fail',
				message: 'Server Error!'
			});
		} else {
			if (callPg > achieveRes.GlastPg) {
				callPg = achieveRes.GlastPg;
			}
			res.render('achieve', {
				title: 'ACHIEVEMENT | IEEE SIESGST',
				lastPg: achieveRes.AlastPg,
				achieveRes: achieveRes.ARes,
				callPg: callPg
			});
			// res.send({
			// 	lastPg: achieveRes.AlastPg,
			// 	achieveRes: achieveRes.ARes,
			// 	callPg: callPg
			// });
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
