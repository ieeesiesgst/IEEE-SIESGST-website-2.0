const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreatIndex:true,
    useFindAndModify: false
}).then(() =>{
    console.log('DB connection successful');
});


//console.log(process.env);
const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`app running on port ${port}...`);
});
