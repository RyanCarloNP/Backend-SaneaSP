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
          type: DataType.INTEGER,
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
        },
        status:{
          allowNull:true,
          type:DataType.CHAR(8)
        },
        cep:{
          allowNull:true,
          type:DataType.STRING(30)
        },
        cidade:{
          allowNull:true,
          type:DataType.STRING(30)
        },
        bairro:{
          allowNull:true,
          type:DataType.STRING(30) 
        },
        rua:{
          allowNull:true,
          type:DataType.STRING(30)
        },
        numero:{
          allowNull:true,
          type:DataType.STRING(30)
        },
        complemento:{
          allowNull:true,
          type:DataType.STRING(30)
        },
        pontuacao:{
          allowNull:false,
          type:DataType.DECIMAL(5,2)
        },
        id_usuario:{
          allowNull:false,
          type:DataType.INTEGER
        }
        
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('reclamacao');
  }
};
