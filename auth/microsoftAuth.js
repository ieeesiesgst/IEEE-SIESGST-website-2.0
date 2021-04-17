const passport = require('passport');
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy;

const User = require('../schema/userSchema');

let allowHttp = false;

if (process.env.NODE_ENV == 'development') {
	allowHttp = true;
}
module.exports = () => {
	passport.use(
		new OIDCStrategy(
			{
				identityMetadata: process.env.MICROSOFT_IDENTITY_METADATA,
				clientID: process.env.MICROSOFT_CLIENT_ID,
				responseType: 'code',
				responseMode: 'form_post',

				redirectUrl: process.env.MICROSOFT_REDIRECT_URL,
				passReqToCallback: true,
				allowHttpForRedirectUrl: allowHttp,
				clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
				validateIssuer: true,
				scope: ['email', 'profile']
			},
			function (req, iss, sub, profile, accessToken, refreshToken, done) {
				User.findOne({ email: profile._json.email }, (err, user) => {
					if (err) {
						console.log(err);
						return done(err, null);
					} else if (user) {
						user.microsoftId = profile.oid;

						user.save((err) => {
							if (err) {
								console.log(err);
								return done(err, null);
							} else {
								return done(null, user);
							}
						});
					} else {
						const newUser = new User();
						newUser.microsoftId = profile.oid;
						newUser.email = profile._json.email;
						newUser.name = profile._json.name;
						newUser.verified = true;
						newUser.save((error) => {
							if (error) {
								console.log(error);
								return done(error, null);
							} else {
								return done(null, newUser);
							}
						});
					}
				});
			}
		)
	);
};
