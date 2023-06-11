const {StatusCodes} = require('http-status-codes')
const {AppError,error_resonse} = require('../utils')
const {UserServices} = require('../services')

function validateSignUpRequest(req, res, next) {
    if(!req.body.email) {
        error_resonse.message = 'Something went wrong while authenticating user';
        error_resonse.error = new AppError(['Email not found in the incoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(error_resonse);
    }
    if(!req.body.password) {
        error_resonse.message = 'Something went wrong while authenticating user';
        error_resonse.error = new AppError(['password not found in the incoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(error_resonse);
    }
    if(!req.body.username) {
        error_resonse.message = 'Something went wrong while authenticating user';
        error_resonse.error = new AppError(['username  not found in the incoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(error_resonse);
    }
    if(!req.body.phone_number) {
        error_resonse.message = 'Something went wrong while authenticating user';
        error_resonse.error = new AppError(['phone number not found in the incoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(error_resonse);
    }
    next();
}
function validateSignInRequest(req, res, next) {
    if(!req.body.email) {
        error_resonse.message = 'Something went wrong while authenticating user';
        error_resonse.error = new AppError(['Email not found in the incoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(error_resonse);
    }
    if(!req.body.password) {
        error_resonse.message = 'Something went wrong while authenticating user';
        error_resonse.error = new AppError(['password not found in the incoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(error_resonse);
    }
    next()
}
async function validateUserLogin(req,res,next){
    try{
        const response = await UserServices.isAuthenticated(req.headers['x-access-token']);
        req.user = response;
        next();
    } catch (error) {
        error_resonse.error = error
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(error_resonse);
    }
}

async function validateIsAdmin(req,res,next){
    try {
         console.log(req.user);
        const response = await UserServices.isAdmin(req.user)
        console.log(response);
        if(!response) {
             return res
                    .status(StatusCodes.UNAUTHORIZED)
                    .json({message: 'User not authorized for this action'});
        }
        next();
    } catch (error) {
        error_resonse.error = error
        return res
                .status(StatusCodes.BAD_REQUEST)
                 .json(error_resonse);
            }
        
}

async function validateIsAdminOrCompany(req,res,next){
    try {
         console.log(req.user);
        const response = await UserServices.isAdminOrCompany(req.user)
        console.log(response);
        if(!response) {
             return res
                    .status(StatusCodes.UNAUTHORIZED)
                    .json({message: 'User not authorized for this action'});
        }
        next();
    } catch (error) {
        error_resonse.error = error
        return res
                .status(StatusCodes.BAD_REQUEST)
                 .json(error_resonse);
            }
        
}

module.exports = {
    validateSignInRequest,
    validateSignUpRequest,
    validateUserLogin,
    validateIsAdmin,
    validateIsAdminOrCompany
}