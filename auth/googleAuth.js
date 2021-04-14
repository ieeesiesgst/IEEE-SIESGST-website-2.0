const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('./../schema/userSchema');

module.exports = () => {
	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				callbackURL: process.env.GOOGLE_CALLBACK_URL
			},
			function (accessToken, refreshToken, profile, cb) {
				User.findOne({ googleId: profile.id }, (err, user) => {
					if (err) {
						console.log(err);
						return cb(err, null);
					} else if (user) {
						return cb(null, user);
					} else {
						const newUser = new User();
						newUser.email = profile._json.email;
						newUser.googleId = profile.id;
						newUser.name = profile._json.name;
						newUser.profilePic = profile._json.picture;
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
