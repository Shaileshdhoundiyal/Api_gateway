'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        allowNull : false
      },
      password: {
        type: Sequelize.STRING,
        allowNull : false,
        validate : {
          len : [6,15],
          msg: "Password  must be between 6 and 15 characters in length"
        }
      },
      email: {
        type: Sequelize.STRING,
        unique : true,
        allowNull : false,
        validate : {
          isEmail : true,
          mesg : "email should be a valid email address",
          len : [6,30]

      }
      },
      phone_number: {
        type: Sequelize.STRING,
        unique : true,
        allowNull : false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};