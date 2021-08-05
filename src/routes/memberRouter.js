const express = require('express');
const getData = require('../functions/getData');
const cachedata = require('../cache/cacheData');

const router = express.Router();

router.get('/', (req, res) => {
	try {
		const teamRes = cachedata('teams');
		let memberRes;

		if (req.query.team == 'core') {
			memberRes = teamRes.core;
		} else if (req.query.team == 'faculty') {
			memberRes = teamRes.faculty;
		} else if (req.query.team == 'wie') {
			memberRes = teamRes.wie;
		} else if (req.query.team == 'cs') {
			memberRes = teamRes.cs;
		} else if (req.query.team == 'mtts') {
			memberRes = teamRes.mtts;
		} else if (req.query.team == 'isv') {
			memberRes = teamRes.isv;
		} else if (req.query.team == 'jsec') {
			memberRes = teamRes.jsec;
		} else if (req.query.team == 'tech') {
			memberRes = teamRes.tech;
		} else if (req.query.team == 'admin') {
			memberRes = teamRes.admin;
		} else if (req.query.team == 'pr') {
			memberRes = teamRes.pr;
		} else if (req.query.team == 'media') {
			memberRes = teamRes.media;
		} else if (req.query.team == 'publicity') {
			memberRes = teamRes.publicity;
		} else if (req.query.team == 'design') {
			memberRes = teamRes.design;
		} else if (req.query.team == 'creative') {
			memberRes = teamRes.creative;
		} else if (req.query.team == 'mdo') {
			memberRes = teamRes.mdo;
		} else if (req.query.team == 'treasurer') {
			memberRes = teamRes.treasurer;
		} else {
			memberRes = teamRes.core;
		}
		res.render('members', {
			title: 'TEAM MEMBERS | IEEE SIESGST',
			memberRes: memberRes
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
