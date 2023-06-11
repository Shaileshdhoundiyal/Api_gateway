const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {ServerConfig} = require('../../config')

function comparePassword(givenPassword,databasePassword){
    try {
       return bcrypt.compareSync(givenPassword,databasePassword); 
    } catch (error) {
        console.log(error);
        throw error;
    }
}

function generateToken(data){
    try {
        const token =  jwt.sign(data,ServerConfig.JWT_PRIVATE_KEY,{expiresIn :ServerConfig.JWT_EXPIRY});
        console.log(token);
        return token;
    } catch (error) {
        console.log(error);
        throw error;
    }
   
}

function verifyToken(token){
    try {
        const response = jwt.verify(token,ServerConfig.JWT_PRIVATE_KEY);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
    
}

module.exports = {
    comparePassword,
    generateToken,
    verifyToken
}