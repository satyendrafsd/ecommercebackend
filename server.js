const express = require('express');
const serverConfig = require('./config/server.config');


const PORT = serverConfig.PORT || 4000;

const app = express();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// importing  routes
const category = require('./routes/category');
const product = require('./routes/product');
const auth = require('./routes/auth');

// using routing
app.use('/api/v1', category);
app.use('/api/v1', product);
app.use('/api/v1', auth);



app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`));



