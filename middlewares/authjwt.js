const jwt = require('jsonwebtoken');
const db = require('../models/index');
const User = db.user;


exports.verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token']

    if(!token){
        return res.status(401).json({
            success:false,
            message:'No token provided'
        })
    }

    jwt.verify(token, process.env.JWTSECRET, (err, decode)=>{
        if(err){
            return res.status(401).json({
                success:false,
                message:'Invalid Token'
            });
        }
        req.userId = decode.id;
        next();
        return;
    })
}




exports.isAdmin = (req, res, next) =>{
    User.findByPk(req.userId)
    .then(user =>{
        user.getRoles()
        .then(roles=> {
            for(let i=0;i<roles.length;i++){
                if(roles[i].role === 'admin'){
                    next();
                    return;
                }
            }
            return res.status(401).json({
                success:false,
                message:'Requried admin role'
            });
        });
        
    });
}