const express = require('express');
const router = express.Router();

const lessonController = require('../controllers/lesson.controller');
const checkAuth = require('../middleware/auth');

// create lesson
router.post('/lessons/create/:id', checkAuth.isTutor, lessonController.createLesson);
// get lesson by id
router.get('/lessons/:id', lessonController.getLessonByID);
// get all lesson
router.get('/lessons', lessonController.getAllLesson);
// update lesson by id
router.put('/lessons/lesson/:id', checkAuth.isTutor, lessonController.updateLessonByID);
// delete lesson by id
router.delete('/lessons/:id', checkAuth.isTutor, lessonController.deleteLesson);

module.exports = router;