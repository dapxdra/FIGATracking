import { DataTypes } from "sequelize";
import { define, sync } from "../config/config.js";

const User = define("User", {
  oauth_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sync()
  .then(() => console.log("Base de datos sincronizada"))
  .catch((err) => console.log("Error sincronizando la base de datos", err));

export default User;
