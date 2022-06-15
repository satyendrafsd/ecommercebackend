const db = require('../models/index');
const Product = db.product;
const op = db.Sequelize.Op;


// create product

exports.createProduct = (req, res, err) => {
    
    const product = req.body;

    Product.create(product)
    .then(result =>{
        res.status(200).json({
            success:true,
            product:result,
        });
    })
    .catch(error => {
        res.status(500).json({
            success:false,
            message:'Internal server error. Unable to create product'

        });
    });
}

// get all products

exports.getAllProduct = (req, res) => {

    Product.findAll()
    .then(products =>{
        res.status(200).json({
            success:true,
            products
        })
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            succees:false,
            message:"Internal Server Error"
        })
    })

}

//get product by id
exports.getProduct = (req, res)=>{
    const id = req.params.id;
    if(!id){
        return res.status(400).json({
            succees:false,
            message:'Please Provid Product id'
        });
    }

    Product.findByPk(id)
    .then(product => {
        if(!product){
            res.status(400).json({
                succees:false,
                message:'No product found with given id',
            })
        }
        res.status(200).json({
            succees:true,
            product
        })
    })
    .catch(error => {
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    })
}

// update product

exports.updateProduct = (req, res) =>{
    
    const product = req.body;
    const id = req.params.id;
    if(!id){
        return res.status(400).json({
            success:false,
            message:'Please Provide id to update product'
        })
    }

    Product.update(product, {
        where:{
            id:id,
        }
    }).then(result => {
        console.log(result);
        if(result[0] === 1){
            Product.findByPk(id)
            .then(product =>{
                res.status(200).json({
                    success:true,
                    product,
                    
                });
            })
            .catch(error =>{
                res.status(500).json({
                    succees:false,
                    message:'Unable to update product'
                })
            })
            
        }
        else{
            res.status(200).json({
                succees:false,
                message:'No product found with given id'
            })
        }
    })
    .catch(error =>{
        res.status(500).json({
            succees:false,
            message:'Unable to update product'
        })
    })
}


// Delete Product

exports.deleteProduct = (req, res) =>{
    const id = req.params.id;
    if(!id){
        return res.status(400).json({
            success:false,
            message:'Please provide product id to delete',
        });
    }
    Product.destroy({
        where:{
            id:id,
        }
    })
    .then(result => {
        res.status(200).json({
            success:true,
            message:'Product Delete successfully',
        })
    })
    .catch(error =>{
        res.status(500).json({
            succees:false,
            message:'Internal Server error',
        })
    })
}