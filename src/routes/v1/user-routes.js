const express = require('express')
const {UserController} = require('../../controllers')
const router = express.Router();
const {ValidateUserMiddleware} = require('../../middlewares')

router.post('/signup',ValidateUserMiddleware.validateSignUpRequest,UserController.signup);

router.post('/signin',ValidateUserMiddleware.validateSignInRequest,UserController.signin);

router.post('/role',ValidateUserMiddleware.validateUserLogin,ValidateUserMiddleware.validateIsAdmin,UserController.addRoletoUser);



module.exports = router;