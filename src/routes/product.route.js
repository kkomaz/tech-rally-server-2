const express = require('express');

const router = express.Router();

const productController = require('../controllers/product.controller');

router.get('/', productController.productList);
router.post('/create', productController.productCreate);
router.get('/:id', productController.productDetail);
router.put('/:id/update', productController.productUpdate);
router.delete('/:id/delete', productController.productDelete);

module.exports = router;
