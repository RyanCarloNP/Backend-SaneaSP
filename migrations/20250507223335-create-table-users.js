'use strict';

const { DataTypes } = require('sequelize');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Usuarios',
      {
        id_usuario:{
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
          type: DataTypes.INTEGER
        },
        nome_usuario:{
          allowNull: false,
          type: DataTypes.STRING(50)
        },
        telefone:{
          allowNull: true,
          type: DataTypes.STRING(14)
        },
        email:{
          allowNull: false,
          type: DataTypes.STRING(40),
          unique: true
        },
        senha:{
          allowNull: false,
          type: DataTypes.STRING(100)
        },
        cpf:{
          allowNull: true,
          type: DataTypes.CHAR(11),
          unique: true
        },
        cep:{
          allowNull: true,
          type: DataTypes.CHAR(8)
        },
        cidade:{
          allowNull: true,
          type: DataTypes.STRING(30)
        },
        bairro:{
          allowNull: true,
          type: DataTypes.STRING(30)
        },
        rua:{
          allowNull: true,
          type: DataTypes.STRING(30)
        },
        numero:{
          allowNull: true,
          type: DataTypes.STRING(30)
        },
        complemento:{
          allowNull: true,
          type: DataTypes.STRING(30)
        }
      });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Usuarios');
  }
};
