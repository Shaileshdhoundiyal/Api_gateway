const CrudRepository = require('./crud-repository');
const {role} = require('../models')

class RoleRepository extends CrudRepository {
    constructor(){
        super(role)
    }

    async findRoleByName(Name){
        const response = await role.findOne({
            where : {
                name : Name
            }
        })
        return response;
    }
}


module.exports = RoleRepository