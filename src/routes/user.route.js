const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.get('/users', userController.allUsers);
router.post('/users/login', userController.loginUser);
router.post('/users/create', userController.createUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;