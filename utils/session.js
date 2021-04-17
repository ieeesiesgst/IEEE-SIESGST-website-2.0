const session = require('express-session');
const MongoStore = require('connect-mongo');

module.exports = (app) => {
	if (process.env.NODE_ENV === 'development') {
		app.use(
			session({
				secret: process.env.SESSION_SECRET,
				resave: false,
				saveUninitialized: false
			})
		);
	} else {
		app.use(
			session({
				secret: process.env.SESSION_SECRET,
				resave: false,
				saveUninitialized: false,
				store: MongoStore.create({
					mongoUrl: process.env.DATABASE,
					crypto: {
						secret: process.env.MONGO_STORE_SECRET
					}
				})
			})
		);
	}
};
