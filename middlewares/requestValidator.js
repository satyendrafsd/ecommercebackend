

exports.validateProductRequest = (req, res, next) =>{
    const {name, price} = req.body;

    if(!name){
        return res.status(400).json({
            success:false,
            message:'Please provide product name',
        })
    }

    if(!price || price <=0){
        return res.status(400).json({
            success:false,
            message:'Please provide price of the product'
        });
    }
    next();
}