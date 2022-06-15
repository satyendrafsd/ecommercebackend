
const db = require('../models/index');
const User = db.user;
const ROLES = ['customer', 'admin']


exports.checkDuplicateUsernameOrEmail = (req, res, next) =>{

    User.findOne({
        where : {
            username:req.body.username
        }
    })
    .then(user =>{
        if(user){
            return res.status(400).json({
                success:false,
                message:'Username is already in use'
            })
        }
        User.findOne({
            where:{
                email:req.body.email
            }
        }).then(user =>{
            if(user){
                return res.status(400).json({
                    success:false,
                    message:"Email is already in use",
                });
            }
        });
    });
    next();

}

exports.checkRoleExisted = (req, res, next) =>{
    if(req.body.roles){
        for(let i=0;i<req.body.roles.length;i++){
            if(!ROLES.includes(req.body.roles[i])){
                return res.status(400).json({
                    success:false,
                    message: 'Please provides a valid role'
                })
            }
        }
    }
    next();
}

