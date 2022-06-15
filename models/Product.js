/**
 * Product model field
 * id
 * name
 * description
 * cost
 * stock
 * images
 * 
 */


module.exports = (sequelize, DataTypes) =>{
    const Product = sequelize.define('product', {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        description:{
            type:DataTypes.STRING,
        },
        price:{
            type:DataTypes.DECIMAL(10,2),
            allowNull:false,
        },
        


    }, {
        tableName : 'products',
    })
    Product.sync();
    return Product;
}