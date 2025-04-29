'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('reclamacao','status',{type:DataTypes.INTEGER,allowNull:true})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('reclamacao','status',{type:DataTypes.CHAR(8),allowNull:true})
  }
};
