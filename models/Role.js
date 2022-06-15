

module.exports = (sequelize, DataTypes) =>{
    const Role = sequelize.define('role', {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
        },
        role:{
            type:DataTypes.STRING,
            unique : true,
        }

        
    }, {
        tableName:'role'
    });
    Role.sync()
    return Role;
}