const express = require('express');
const serverConfig = require('./config/server.config');


const PORT = serverConfig.PORT || 4000;

const app = express();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// importing  routes
const category = require('./routes/category');

// using routing
app.use('/api/v1', category);


app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`));



