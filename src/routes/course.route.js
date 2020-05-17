const express = require('express');
const router = express.Router();

const courseController = require('../controllers/course.controller');
const checkAuth = require('../middleware/auth');

// get all courses
router.get('/courses', courseController.allCourses);
// create cousrse by id
router.post('/courses/create/:id', checkAuth.isAdmin, courseController.createCourse);
// get user by course
// router.get('/courses/tutor/:id', courseController.userByCourse);
// get course by name
router.get('/courses/course/:name', courseController.getCourseByName);
// update course
router.put('/courses/course/:id', checkAuth.isAdmin, courseController.updateCourse);
// delete course
router.delete('/courses/course/:id', checkAuth.isAdmin, courseController.deleteCourse);

module.exports = router;