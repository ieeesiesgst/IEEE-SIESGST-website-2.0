exports.signUp = async (req, res, next) =>{
    try{
        res.status(201).json({
            status:'success',
            message:'routes connected'
        });
    }catch(err){
        res.status(404).json({
            status:'fail',
            message: 'routes not connected'
        });
    }  
};
