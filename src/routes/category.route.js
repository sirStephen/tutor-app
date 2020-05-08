const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/category.controller');

router.get('/category', userController.allCategory);
router.post('/category/create', categoryController.createCategory);
// router.delete('/users/:id', userController.deleteUser);

module.exports = router;