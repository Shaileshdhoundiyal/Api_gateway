const {UserRepository,RoleRepository} = require('../repositories');
const {StatusCodes} = require('http-status-codes')
const {AppError,ENUMS} = require('../utils')
const {Auth} = require('../utils')


const userRepository = new UserRepository();
const roleRepository = new RoleRepository();


async function signup(data){
    try {
        const user = await userRepository.create(data);
        const role = await roleRepository.findRoleByName(ENUMS.USER_ROLE_ENUMS.CUSTOMER);
        user.addRole(role);
        return user;
    } catch (error){
        console.log(error);
        if(error.name == 'SequelizeUniqueConstraintError' || error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach(element => {
                explanation.push(element);
            });
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError("there is some server problem user is not creates",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function signin(data){
    try {
        
        const user = await userRepository.getUserByEmail(data.email);
        if(!user){
            throw new AppError("the user didnt exist",StatusCodes.NOT_FOUND);
        }
        authResponse = Auth.comparePassword(data.password,user.password);
        if(!authResponse){
            throw new AppError("the password you entered is incorrect",StatusCodes.BAD_REQUEST);
        }
        const jwt = Auth.generateToken({id : user.id , email : user.email})
        return jwt;
    } catch (error) {
        console.log(error);
        if(error instanceof AppError)
            throw error;
        throw new AppError("some thing went wrong",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function isAuthenticated(token) {
    try {
        if(!token) {
            throw new AppError('Missing JWT token', StatusCodes.BAD_REQUEST);
        }
        const response = Auth.verifyToken(token);
        //console.log(response);
        const user = await userRepository.get(response.id);
        //console.log(user);
        if(!user) {
            throw new AppError('No user found', StatusCodes.NOT_FOUND);
        }
        return user.id;
    } catch(error) {
        if(error instanceof AppError) throw error;
        if(error.name == 'JsonWebTokenError') {
            throw new AppError('Invalid JWT token', StatusCodes.BAD_REQUEST);
        }
        if(error.name == 'TokenExpiredError') {
            throw new AppError('JWT token expired', StatusCodes.BAD_REQUEST);
        }
        console.log(error);
        throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}



async function addRoletoUser(data) {
    try {
        const user = await userRepository.get(data.id);
        if(!user) {
            throw new AppError('No user found for the given id', StatusCodes.NOT_FOUND);
        }
        const role = await roleRepository.getRoleByName(data.role);
        if(!role) {
            throw new AppError('No user found for the given role', StatusCodes.NOT_FOUND);
        }
        user.addRole(role);
        return user;
    } catch(error) {
        if(error instanceof AppError) throw error;
        console.log(error);
        throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function isAdmin(id){
    try {
        const user = await userRepository.get(id);
        if(!user) {
            throw new AppError('No user found for the given id', StatusCodes.NOT_FOUND);
        }
        const adminrole = await roleRepository.findRoleByName(ENUMS.USER_ROLE_ENUMS.ADMIN);
        if(!adminrole) {
            throw new AppError('No user found for the given role', StatusCodes.NOT_FOUND);
        }
        return user.hasRole(adminrole);
    } catch (error) {
        if(error instanceof AppError) throw error;
        console.log(error);
        throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function isAdminOrCompany(id){
    try {
        const user = await userRepository.get(id);
        if(!user) {
            throw new AppError('No user found for the given id', StatusCodes.NOT_FOUND);
        }
        const adminrole1 = await roleRepository.findRoleByName(ENUMS.USER_ROLE_ENUMS.ADMIN);
        const adminrole2 = await roleRepository.findRoleByName(ENUMS.USER_ROLE_ENUMS.FLIGHT_COMPANY);
        if(!adminrole1 || !adminrole2) {
            throw new AppError('No user found for the given role', StatusCodes.NOT_FOUND);
        }
        return user.hasRole(adminrole1) || user.hasRole(adminrole2);
    } catch (error) {
        if(error instanceof AppError) throw error;
        console.log(error);
        throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    signup,
    signin,
    isAuthenticated,
    addRoletoUser,
    isAdmin,
    isAdminOrCompany
}