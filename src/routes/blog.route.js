const express = require('express');
const checkJwt = require('../services/checkJwt');
const router = express.Router();

const blogController = require('../controllers/blog.controller');

router.get('/', blogController.blogList);
router.post('/create', checkJwt, blogController.blogCreate);
router.get('/:id', blogController.blogDetail);
router.put('/:id/update', checkJwt, blogController.blogUpdate);
router.delete('/:id/delete', blogController.blogDelete);

module.exports = router;
