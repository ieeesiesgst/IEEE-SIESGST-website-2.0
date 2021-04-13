const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const ejs = require('ejs');

const mongoose = require('./db/mongoose');
const passport = require('./auth/passport');
const authRouter = require('./routes/authRouter');
const generalRouter = require('./routes/generalRouter');

const app = express();

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

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

passport(app);

app.use('/auth', authRouter);
app.use('/', generalRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`app running on port ${port}...`);
});
