const { DataTypes } = require("sequelize");
const sequelize = require("../config/config.js");

const User = sequelize.define("User", {
  googleId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize
  .sync()
  .then(() => console.log("Base de datos sincronizada"))
  .catch((err) => console.log("Error sincronizando la base de datos", err));

module.exports = User;
