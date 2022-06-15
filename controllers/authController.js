const db = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { user } = require('../models/index');

const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

//creating new user
exports.signup = (req, res) =>{
    User.create({
        username:req.body.username,
        email : req.body.email,
        password: bcrypt.hashSync(req.body.password, 10) // encrypting the password
    })
    .then(user => {
        console.log('user created');
        // setting role to the user
        if(req.body.roles){
            Role.findAll({
                where : {
                    name : {
                        [Op.or] : req.body.roles
                    }
                }
            })
            .then(roles =>{
                user.setRoles(roles)
                .then(() => {
                    res.status(200).json({
                        success:true,
                        message:'User Created Successfully',
                    })
                })
            })
        }
        // if no role is provided then setting default customer role
        else{
            user.setRoles([1]).then(() =>{
                res.status(200).json({
                    success:true,
                    message:'User Created Successfully',
                });
            }).catch(error=>{
                res.status(500).json({
                    success:false,
                    message:'Unable to set the default role'
                })
            })
        }
    })
    .catch(error =>{
        res.status(500).json({
            success:false,
            message: error.message,
        });
    });
}

// login the user
exports.signIn = (req, res) =>{
    User.findOne({
        where : {
            username : req.body.username
        }
    })
    .then(user => {
        if(!user){
            return res.status(404).json({
                success:false,
                message: 'Email/Password does not match'
            });
        }
        // comparing the password
        const isValidPassword = bcrypt.compareSync(req.body.password, user.password); 
        if(!isValidPassword){
            return res.status(404).json({
                success:false,
                message:'Email/Password does not match'
            });
        }
        // setting jwt access token
        const token = jwt.sign({id:user.id}, process.env.JWTSECRET)
        res.status(200).json({
            success:true,
            message:'Login successfully',
            id:user.id,
            username:user.username,
            email:user.email,
            accessToken:token,
        });
    }).catch(error => {
        res.status(500).json({
            success:false,
            messasge : 'Internal Server Error'
        })
    })
}
