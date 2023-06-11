const CrudRepository = require('./crud-repository');
const {user} = require("../models");
const { AppError } = require('../utils');

class UserRepository extends CrudRepository {
    constructor(){
        super(user)
    }
    async getUserByEmail(Email){
        const response = await user.findOne({
            where : {
                email : Email
            }
        })
        return response;
    }

    async getRoleByName(role){
        const response = await user.findOne({
            where : {
                name :  role
            }
        })
        return response;
    }
}
module.exports = UserRepository