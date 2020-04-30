const express = require('express');
const router = express.Router();

const courseController = require('../controllers/course.controller');

router.post('/courses/create', courseController.createCourse);

module.exports = router;