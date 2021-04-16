const { Router } = require('express');
const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get(
	'/microsoft',
	passport.authenticate('azuread-openidconnect', {
		failureRedirect: '/',
		tenantIdOrName: process.env.MICROSOFT_TENANT_ID
	}),
	function (req, res) {
		res.redirect('/');
	}
);

function regenerateSessionAfterAuthentication(req, res, next) {
	var passportInstance = req.session.passport;
	return req.session.regenerate(function (err) {
		if (err) {
			return next(err);
		}
		req.session.passport = passportInstance;
		return req.session.save(next);
	});
}

router.post(
	'/microsoft/callback',
	passport.authenticate('azuread-openidconnect', {
		failureRedirect: '/'
	}),
	regenerateSessionAfterAuthentication,
	function (req, res) {
		res.redirect('/');
	}
);

module.exports = router;
