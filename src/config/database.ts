import { Sequelize } from "sequelize";


//logging -> Exibição no terminal das ações  
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false
});

export default sequelize