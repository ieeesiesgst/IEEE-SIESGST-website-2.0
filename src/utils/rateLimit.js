const rateLimit = require('express-rate-limit');
const rateLimitMongo = require('rate-limit-mongo');

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 500,
	skip: () => {
		if (process.env.NODE_ENV == 'development') {
			true;
		} else {
			false;
		}
	},
	store: new rateLimitMongo({
		uri: process.env.DATABASE,
		expireTimeMs: 15 * 60 * 1000,
		errorHandler: console.error.bind(null, 'rate-limit-mongo')
	})
});

const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 20,
	skip: () => {
		if (process.env.NODE_ENV == 'development') {
			return true;
		} else {
			return false;
		}
	},
	store: new rateLimitMongo({
		uri: process.env.DATABASE,
		expireTimeMs: 15 * 60 * 1000,
		errorHandler: console.error.bind(null, 'rate-limit-mongo')
	})
});

module.exports = { limiter, authLimiter };
// module.exports = authLimiter;
