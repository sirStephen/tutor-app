const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.get('/users', userController.allUsers);
router.post('/users', userController.loginUser);
router.post('/users', userController.createUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;