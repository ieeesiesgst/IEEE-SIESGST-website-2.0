const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	college: {
		type: String,
		trim: true
	},
	branch: {
		type: String,
		trim: true
	},
	yearOfStudy: {
		type: String,
		trim: true
	},
	contact: {
		type: String,
		trim: true
	},
	googleId: {
		type: String
	},
	profilePic: {
		type: String
	}
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model('User', userSchema);

module.exports = User;
