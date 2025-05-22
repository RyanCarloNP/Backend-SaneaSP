'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tagReclamacao', 
      { 
        id: {
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          type: DataTypes.INTEGER,
        },
        id_tag: {
          allowNull: false,
          type: DataTypes.INTEGER,
          references : {model : 'tag', key : 'id'},
          onDelete : 'CASCADE'
        },
        id_reclamacao: {
          allowNull: false,
          type: DataTypes.INTEGER,
          references : {model : 'reclamacao', key : 'id'},
          onDelete : 'CASCADE'
        },
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('tagReclamacao');
  }
};
  