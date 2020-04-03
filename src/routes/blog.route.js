const express = require('express');

const router = express.Router();

const blogController = require('../controllers/blog.controller');

router.get('/', blogController.blogList);
router.post('/create', blogController.blogCreate);
router.get('/:id', blogController.blogDetail);
router.put('/:id/update', blogController.blogUpdate);
router.delete('/:id/delete', blogController.blogDelete);

module.exports = router;
