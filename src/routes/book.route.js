const express = require('express');
const router = express.Router();

const bookController = require('../controllers/book.controller');
const checkAuth = require('../middleware/auth');

// crate book
router.post('/book/:id', checkAuth.isStudent, bookController.bookLesson);

module.exports = router;