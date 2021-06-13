const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('./../schema/userSchema');

module.exports = () => {
	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				callbackURL: process.env.GOOGLE_CALLBACK_URL,
				passReqToCallback: true
			},
			function (req, accessToken, refreshToken, profile, cb) {
				User.findOne({ email: profile._json.email }, (err, user) => {
					if (err) {
						console.log(err);
						return cb(err, null);
					} else if (user) {
						user.googleId = profile.id;
						user.profilePic = profile._json.picture;

						user.save((err) => {
							if (err) {
								console.log(err);
								return cb(err, null);
							} else {
								return cb(
									null,
									user,
									req.flash('info', 'Flash is back!')
								);
							}
						});
					} else {
						const newUser = new User();
						newUser.email = profile._json.email;
						newUser.googleId = profile.id;
						newUser.name = profile._json.name;
						newUser.profilePic = profile._json.picture;
						newUser.verified = true;
						newUser.save((error) => {
							if (error) {
								console.log(error);
								return cb(error, null);
							} else {
								return cb(null, newUser);
							}
						});
					}
				});
			}
		)
	);
};
