/*
    This file create connection with db 
    and also importing all tables
*/
const Sequelize = require('sequelize');
const dbconfig = require('../config/dbconfig');

// db connection
const sequelize = new Sequelize(
    dbconfig.DATABASE, 
    dbconfig.USER, 
    dbconfig.PASSWORD,
    {
        host: dbconfig.HOST,
        dialect : dbconfig.DIALECT
    }
);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.category = require('./Category')(sequelize, Sequelize.DataTypes);
db.product = require('./Product')(sequelize, Sequelize.DataTypes);
db.user = require('./User')(sequelize, Sequelize.DataTypes);
db.role = require('./Role')(sequelize, Sequelize.DataTypes);

db.role.belongsToMany(db.user, {
    through:"user_role",
    foreignKey: "roleId",
});

db.user.belongsToMany(db.role, {
    through: "user_role",
    foreignKey: "userId",
})
sequelize.sync();

module.exports = db;