const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const flash = require('connect-flash');
const path = require('path');

const mongoose = require('./db/mongoose');
const passport = require('./auth/passport');
const { limiter, authLimiter } = require('./utils/rateLimit');
const googleRouter = require('./routes/authRouters/googleRouter');
const microsoftRouter = require('./routes/authRouters/microsoftRouter');
const generalRouter = require('./routes/generalRouter');
const localSignUpRouter = require('./routes/authRouters/localSignUpRouter');
const localLoginRouter = require('./routes/authRouters/localLoginRouter');
const session = require('./utils/session');

const app = express();
app.use(express.static(path.join(__dirname, './public')));

session(app);
app.use(limiter);
app.use('/auth/', authLimiter);
app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

passport(app);

app.use('/auth', googleRouter);
app.use('/auth', microsoftRouter);
app.use('/auth', localSignUpRouter);
app.use('/auth', localLoginRouter);

app.get('/verifymail', (req, res) => {
	console.log(req.query, encodeURIComponent(req.query.v));
	res.send('done');
});

app.use('/', generalRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`app running on port ${port}...`);
});
