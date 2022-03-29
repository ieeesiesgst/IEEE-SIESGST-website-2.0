// const mongoose = require('mongoose');
// const passportLocalMongoose = require('passport-local-mongoose');

// const userSchema = new mongoose.Schema({
// 	name: {
// 		type: String,
// 		required: true,
// 		trim: true
// 	},
// 	email: {
// 		type: String,
// 		required: true,
// 		unique: true
// 	},
// 	college: {
// 		type: String,
// 		trim: true
// 	},
// 	branch: {
// 		type: String,
// 		trim: true
// 	},
// 	contact: {
// 		type: String,
// 		trim: true
// 	},
// 	googleId: {
// 		type: String
// 	},
// 	microsoftId: {
// 		type: String
// 	},
// 	verified: {
// 		type: Boolean,
// 		default: false
// 	},
// 	profilePic: {
// 		type: String
// 	},
// 	password: {
// 		type: String
// 	},
// 	profileDetails: {
// 		type: Boolean,
// 		default: false
// 	}
// });

// const options = {
// 	usernameField: 'email',
// 	usernameLowerCase: true,
// 	limitAttempts: true,
// 	maxAttempts: 5,
// 	passwordValidator: (password, cb) => {
// 		if (password.length < 8) {
// 			return cb({
// 				message: 'Password should have minimum 8 characters.'
// 			});
// 		} else {
// 			return cb();
// 		}
// 	},
// 	errorMessages: { NoSaltValueStoredError: 'Some error occurred.' }
// };

// userSchema.plugin(passportLocalMongoose, options);

// const User = new mongoose.model('User', userSchema);

// module.exports = User;
