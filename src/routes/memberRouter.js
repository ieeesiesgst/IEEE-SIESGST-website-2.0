const express = require('express');
const cachedata = require('../cache/cacheData');

const router = express.Router();

router.get('/:teamname', (req, res) => {
	try {
		const teamRes = cachedata('teams');
		let memberRes;

		if (teamRes.Error) {
			res.status(500).json({
				status: 'Fail',
				message: 'Server Error!'
			});
		} else {
			if (req.params.teamname == 'core') {
				memberRes = teamRes.core;
			} else if (req.params.teamname == 'faculty') {
				memberRes = teamRes.faculty;
			} else if (req.params.teamname == 'wie') {
				memberRes = teamRes.wie;
			} else if (req.params.teamname == 'cs') {
				memberRes = teamRes.cs;
			} else if (req.params.teamname == 'mtts') {
				memberRes = teamRes.mtts;
			} else if (req.params.teamname == 'isv') {
				memberRes = teamRes.isv;
			} else if (req.params.teamname == 'jsec') {
				memberRes = teamRes.jsec;
			} else if (req.params.teamname == 'tech') {
				memberRes = teamRes.tech;
			} else if (req.params.teamname == 'admin') {
				memberRes = teamRes.admin;
			} else if (req.params.teamname == 'pr') {
				memberRes = teamRes.pr;
			} else if (req.params.teamname == 'media') {
				memberRes = teamRes.media;
			} else if (req.params.teamname == 'publicity') {
				memberRes = teamRes.publicity;
			} else if (req.params.teamname == 'design') {
				memberRes = teamRes.design;
			} else if (req.params.teamname == 'creative') {
				memberRes = teamRes.creative;
			} else if (req.params.teamname == 'mdo') {
				memberRes = teamRes.mdo;
			} else if (req.params.teamname == 'treasurer') {
				memberRes = teamRes.treasurer;
			} else {
				res.redirect('/teams');
			}
			res.render('members', {
				title: 'TEAM MEMBERS | IEEE SIESGST',
				memberRes: memberRes
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
