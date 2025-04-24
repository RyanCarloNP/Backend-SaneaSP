'use strict';

const { DataType } = require('sequelize-typescript');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('reclamacao', 
      { 
        id:{
          primaryKey:true,
          autoIncrement:true,
          allowNull:false,
          type: DataType.NUMBER,
        },
        titulo:{
          allowNull:false,
          type:DataType.STRING(50),
        },
        descricao:{
          allowNull:false,
          type:DataType.STRING(500),
        },
        data:{
          allowNull:false,
          type:DataType.DATE()
        }
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('reclamacao');
  }
};
