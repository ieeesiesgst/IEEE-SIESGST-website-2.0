const express = require('express');
const morgan = require('morgan');
const app = express();
const userRoute = require('./routes/userRoutes')

//1) Middle-wares
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use(express.json());    
app.use(express.static(`${__dirname}/public`));

app.use((req,res,next) =>{
    req.requestTime = new Date().toISOString();
    next();
});



//3) Routes
app.use('/api/v1/users', userRoute);


module.exports = app;
