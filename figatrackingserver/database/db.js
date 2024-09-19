import { Sequelize } from "sequelize";

const db = new Sequelize("figa_travel", "postgres", "1230", {
  host: "localhost",
  dialect: "postgres",
});

export default db;
