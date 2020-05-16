const express = require('express');
const router = express.Router();

const bookController = require('../controllers/book.controller');

// crate lesson
router.post('/book/:id', bookController.bookLesson);

module.exports = router;