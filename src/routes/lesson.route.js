const express = require('express');
const router = express.Router();

const lessonController = require('../controllers/lesson.controller');

// crate lesson
router.post('/lessons/create/:id', lessonController.createLesson);
// get lesson by id
router.get('/lessons/:id', lessonController.getLessonByID);
// get all lesson
router.get('/lessons', lessonController.getAllLesson);
// update lesson by id
router.get('/lessons/lesson/:id', lessonController.updateLessonByID);
// delete lesson by id
router.delete('/lessons/:id', lessonController.deleteLesson);

module.exports = router;