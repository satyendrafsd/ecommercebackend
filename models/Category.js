




module.exports = (sequelize, Sequelize) => { 
    const Category = sequelize.define('category',
    {

     id:{
         type: Sequelize.INTEGER,
         primaryKey: true,
         autoIncrement : true,
     },

     name:{
        type:Sequelize.STRING,
        allowNull : false,
        unique : true,
     },
     

     description:{
         type : Sequelize.STRING,
         allowNull : false,
     },

    },
    {
        tableName:'category'
    });
  
    return Category;
}

