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
db.category = require('./Category')(sequelize, Sequelize);

module.exports = db;