const express = require('express');
const router = express.Router();

const tutorController = require('../controllers/tutor.controller');

router.post('/tutors', tutorController.createTutor);
router.get('/tutors', tutorController.allTutors);

module.exports = router;