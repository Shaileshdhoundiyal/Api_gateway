const express = require('express');

const { InfoController} = require('../../controllers');

const {ValidateUserMiddleware} = require('../../middlewares')

const userRoutes = require('./user-routes')

const router = express.Router();

router.get('/info',ValidateUserMiddleware.validateUserLogin,InfoController.info);

router.use('/user',userRoutes);

module.exports = router;

