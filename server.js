const express = require('express');
const serverConfig = require('./config/server.config');
const dbconfig = require('./config/dbconfig');
const mysql2 = require('mysql2');

const PORT = serverConfig.PORT || 4000;

const app = express();

const dbConnection = mysql2.createConnection(dbconfig);
dbConnection.connect((err)=>{
    console.log(err);
})

app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`));



