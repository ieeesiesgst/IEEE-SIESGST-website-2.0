// const passport = require('passport');

// const User = require('./../schema/userSchema');
// const GoogleStrategy = require('./googleAuth');
// const OIDCStrategy = require('./microsoftAuth');

// module.exports = (app) => {
// 	app.use(passport.initialize());
// 	app.use(passport.session());

// 	passport.use(User.createStrategy());

// 	passport.serializeUser((user, done) => {
// 		done(null, user.id);
// 	});

// 	passport.deserializeUser((id, done) => {
// 		User.findById(id, (err, user) => {
// 			done(err, user);
// 		});
// 	});

// 	GoogleStrategy();
// 	OIDCStrategy();
// };
