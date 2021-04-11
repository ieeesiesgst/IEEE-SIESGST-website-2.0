const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');

router.post('/signup', authController.signUp);
// router.post('/login', authController.login);

// router
//     .route('/')
//     .get(userController.getAllUsers)
//     .post(userController.createUser);

module.exports = router;