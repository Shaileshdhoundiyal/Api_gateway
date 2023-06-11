const {UserServices} = require('../services')
const {StatusCodes} = require('http-status-codes');
const {AppError,error_resonse,Sucess_response} = require('../utils')
const {CityServices} = require('../services')



async function signup(req,res){
    try {
        user = await UserServices.signup({
            username : req.body.username,
            password : req.body.password,
            email : req.body.email,
            phone_number : req.body.phone_number

        });
        Sucess_response.data = user;
        Sucess_response.message = "the user is created"
        res.status(StatusCodes.CREATED).json(Sucess_response);


    } catch (error) {
        error_resonse.error = error;
        return res.status(error.statusCode).json(error_resonse);
    }
}

async function signin(req,res){
    try {
        const response = await UserServices.signin({
            email : req.body.email,
            password : req.body.password,

        });
        Sucess_response.data = response;
        Sucess_response.message = "the user is created"
        res.status(StatusCodes.CREATED).json(Sucess_response);


    } catch (error) {
        error_resonse.error = error;
        return res.status(error.statusCode).json(error_resonse);
    }
}

async function addRoletoUser(req,res){
    try {
        const response = await UserServices.addRoletoUser({
            role: req.body.role,
            id: req.body.id

        });
        Sucess_response.data = response;
        Sucess_response.message = "the user is created"
        res.status(StatusCodes.CREATED).json(Sucess_response);


    } catch (error) {
        error_resonse.error = error;
        return res.status(error.statusCode).json(error_resonse);
    }
}

module.exports = {
    signup,
    signin,
    addRoletoUser
}