const db = require('../models/index'); 

const Category = db.category;

// Create Category
module.exports.createCategory = async(req, res) =>{
    
    const { name, description } = req.body;
    console.log(req.body)

    if(!name || !description){

        res.status(400).json({
            success:false,
            message: 'Please provide name and description for category'
        });
        return;

    }
    console.log('after validation');
    let category;
    try{
        category = await Category.create({name, description});
    }catch(err){
        console.log(err)
    }

    if(!category){
        res.status(500).json({
            success:false,
            message:'Unable to create category',

        });
    }

    res.status(200).json({
        success:true,
        message: 'Category created successfully', 
        category
    });

}

// get all category
module.exports.getAllCategory = async(req, res) =>{

    const categoryName = req.query.name;
    let categories;
    if(categoryName){
        categories = Category.findAll(
            {
                where:{
                    name:categoryName,
                }
            }
        )
    }
    else{
        categories = Category.findAll();
    }

    categories.then(result =>{
        res.status(200).json({
            result
        })

    }).catch(error=>{
        res.status(500).json({
            success:false,
            message:'Internal server error'
        });
    })
}
// get category by primary key
module.exports.getCategory = async (req, res, next) =>{
    const id = req.params.id
    console.log(id);
    if(!id){
        res.status(401).json({
            success:false,
            message:'Please provide id'
        })
    } 
    const category = await Category.findByPk(id)

    if(!category){
        return res.status(401).json({
            success:false,
            message:'Data not found'
        })
    }
    res.status(200).json({
        success:true,
        category
    })
}

// update category

module.exports.updateCategory = async(req, res, next) =>{
    const id = req.params.id;
    const name = req.body.name;
    const description = req.body.description

    Category.update({name, description},{where:{id:id}})
        .then(result =>{
            Category.findByPk(id)
            .then(category => {
                res.status(200).json({
                    success:true,
                    message:'Category updated',
                    category
                })
            })
            .catch(error =>{
                res.status(402).json({
                    success:false,
                    message:'Error in fetching updated category'
                }) 
            })
           
        }).catch(error =>{
            res.status(402).json({
                success:false,
                message:'Error in updating category'
            })
        })
}


// delete category

module.exports.deleteCategory = async(req, res, next) =>{

    Category.destroy({
        where : {
            id:req.params.id,
        }
    }).then(result =>{
        console.log(result);
        res.status(200).json({
            success:true,
            message:'Category deleted successfully'
        })
    }).catch(error =>{
        console.log(error)
        res.status(401).json({
            success:false,
            message:'unable to delete category'
        })
    }) 
}
