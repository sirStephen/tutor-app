const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.post('/users/login', userController.loginUser);
router.post('/users/create', userController.createUser);

module.exports = router;