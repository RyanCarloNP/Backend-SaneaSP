'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tag', 
      { 
        id: {
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
          type: DataTypes.INTEGER,
        },
        nome : {
          allowNull: false,
          type: DataTypes.STRING(50)
        }
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('tag');
  }
};
	