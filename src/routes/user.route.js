const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const checkAuth = require('../middleware/auth');

// get all users
router.get('/users', userController.allUsers);
// get tutors by firstname
router.get('/users/tutor/:firstName', userController.getTutorByName);
// login
router.post('/users/login', userController.loginUser);
// create user
router.post('/users/create', userController.createUser);
// delete user
router.delete('/users/:id', checkAuth.isAdmin, userController.deleteUser);
// get user by id
router.get('/users/tutors/:id', checkAuth.isAdmin, userController.getTutorById);
// get all tutors
router.get('/users/tutors', checkAuth.isAdmin, userController.getAllTutors);
// update tutor flag
router.put('/users/tutor/:id', checkAuth.isAdmin, userController.updateTutorFlag);

module.exports = router;