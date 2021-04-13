const mongoose = require('mongoose');

mongoose
	.connect(process.env.DATABASE, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log('Connected to Database..');
	})
	.catch((err) => console.log('Error connecting to databse', err));

module.exports = mongoose;
