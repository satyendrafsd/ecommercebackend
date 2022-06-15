const express = require('express');
const { validateProductRequest } = require('../middlewares/requestValidator');

const { 
    createProduct, 
    getAllProduct, 
    getProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');



const router = express.Router();


router.post('/product',validateProductRequest, createProduct);
router.get('/products',getAllProduct);
router.get('/product/:id/', getProduct);
router.put('/product/:id/', validateProductRequest, updateProduct);
router.delete('/product/:id/', deleteProduct)




module.exports = router;