const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/category.controller');
const checkAuth = require('../middleware/auth');

// get all category
router.get('/category', categoryController.allCategory);
// create category
router.post('/category/create', checkAuth.isAdmin, categoryController.createCategory);
// get course by category
router.get('/category/:id/courses', categoryController.retrieveCourseByCat);

module.exports = router;