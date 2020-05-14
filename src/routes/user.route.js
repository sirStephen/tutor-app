const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

// get all users
router.get('/users', userController.allUsers);
// get tutors by firstname
router.get('/users/tutor/:firstName', userController.getTutorByName);
// login
router.post('/users/login', userController.loginUser);
// create user
router.post('/users/create', userController.createUser);
// delete user
router.delete('/users/:id', userController.deleteUser);
// get user by id
router.get('/users/tutors/:id', userController.getTutorById);

module.exports = router;