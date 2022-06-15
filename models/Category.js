




module.exports = (sequelize, DataTypes) => { 
    const Category = sequelize.define('category',
    {

     id:{
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement : true,
     },

     name:{
        type:DataTypes.STRING,
        allowNull : false,
        unique : true,
     },
     

     description:{
         type : DataTypes.STRING,
         allowNull : false,
     },

    },
    {
        tableName:'category'
    });
  
    return Category;
}

