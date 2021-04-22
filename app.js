const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const flash = require('connect-flash');

const mongoose = require('./db/mongoose');
const passport = require('./auth/passport');
const { limiter, authLimiter } = require('./utils/rateLimit');
const googleRouter = require('./routes/authRouters/googleRouter');
const microsoftRouter = require('./routes/authRouters/microsoftRouter');
const generalRouter = require('./routes/generalRouter');
const signUpRouter = require('./routes/authRouters/signUpRouter');
const session = require('./utils/session');

const app = express();

session(app);
app.use(limiter);
app.use('/auth/', authLimiter);
app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');

passport(app);

app.use('/auth', googleRouter);
app.use('/auth', microsoftRouter);
app.use('/auth', signUpRouter);

app.use('/', generalRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`app running on port ${port}...`);
});
