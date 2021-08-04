const express = require('express');
const getData = require('../functions/getData');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const domainData = {
			domain: 'teams'
		};
		const teamRes = await getData(domainData);
		let memberRes;

		if (req.query.team == 'core') {
			memberRes = teamRes.data.core;
		} else if (req.query.team == 'faculty') {
			memberRes = teamRes.data.faculty;
		} else if (req.query.team == 'wie') {
			memberRes = teamRes.data.wie;
		} else if (req.query.team == 'cs') {
			memberRes = teamRes.data.cs;
		} else if (req.query.team == 'mtts') {
			memberRes = teamRes.data.mtts;
		} else if (req.query.team == 'isv') {
			memberRes = teamRes.data.isv;
		} else if (req.query.team == 'jsec') {
			memberRes = teamRes.data.jsec;
		} else if (req.query.team == 'tech') {
			memberRes = teamRes.data.tech;
		} else if (req.query.team == 'admin') {
			memberRes = teamRes.data.admin;
		} else if (req.query.team == 'pr') {
			memberRes = teamRes.data.pr;
		} else if (req.query.team == 'media') {
			memberRes = teamRes.data.media;
		} else if (req.query.team == 'publicity') {
			memberRes = teamRes.data.publicity;
		} else if (req.query.team == 'design') {
			memberRes = teamRes.data.design;
		} else if (req.query.team == 'creative') {
			memberRes = teamRes.data.creative;
		} else if (req.query.team == 'mdo') {
			memberRes = teamRes.data.mdo;
		} else if (req.query.team == 'treasurer') {
			memberRes = teamRes.data.treasurer;
		} else {
			memberRes = teamRes.data.core;
		}
		res.render('members', {
			title: 'TEAM | IEEE SIESGST',
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
