const express = require('express');
const router = express.Router();

const courseController = require('../controllers/course.controller');

router.get('/courses', courseController.allCourses);
// router.post('/courses', courseController.createCourse);
router.post('/courses/create/:id', courseController.createCourse);
router.get('/courses/tutor/:id', courseController.userByCourse);
router.get('/courses/course/:name', courseController.getCourseByName)
router.put('/courses/course/:id', courseController.updateCourse);

module.exports = router;