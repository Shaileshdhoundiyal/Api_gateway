'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
const {ServerConfig} = require('../config')
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.role,{through : 'user_role', as : 'role'})
    }
  }
  user.init({
    username: {
      type:DataTypes.STRING,
      allowNull : false
    },
    password: {
      type:DataTypes.STRING,
      allowNull : false,
      validate : {
        len : [6,15],

      }
    },
    email: {
      type:DataTypes.STRING,
      unique : true,
      allowNull : false,
      validate : {
          isEmail : true,

      }
    },
    phone_number: {
      type:DataTypes.STRING,
      allowNull : false
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  user.beforeCreate(function encrpyt(User){
    const encrpytedPassword = bcrypt.hashSync(User.password,+ServerConfig.SET_ROUNDS);
    User.password = encrpytedPassword;
  })
  // user.beforeCreate(function encrypt(user) {
  //   const encryptedPassword = bcrypt.hashSync(user.password, +ServerConfig.SET_ROUNDS);
  //   user.password = encryptedPassword;
  // });
  return user;
};