const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/category.controller');

router.get('/category', categoryController.allCategory);
router.post('/category/create', categoryController.createCategory);
router.get('/category/:id/courses', categoryController.retrieveCourseByCat);

module.exports = router;