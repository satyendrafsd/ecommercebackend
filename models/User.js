
/*
* user model
* username
* email
* password
*/

module.exports = (sequelize, DataTypes) =>{
    const User = sequelize.define('user', {
        username : {
            type:DataTypes.STRING,
            allowNull:false,
        },
        email:{
            type:DataTypes.STRING,
            unique:true
        },
        password:{
            type:DataTypes.STRING,
        }
    }, {
        tableName:'user'
    })
    User.sync();
    return User;
}