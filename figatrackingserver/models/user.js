const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.js");
const Conductor = require("./conductor.js"); //Importa el modelo de Conductor

const Usuario = sequelize.define("Usuario", {
  oauth_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  rol: {
    type: DataTypes.ENUM("administrador", "conductor"),
    defaultValue: "conductor",
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

//Relacion uno a uno con Conductores
/* Usuario.hasMany(Conductor, {
  foreignKey: "usuario_id",
  as: "conductor",
}); */
sequelize
  .sync()
  .then(() => console.log("Base de datos sincronizada"))
  .catch((err) => console.log("Error sincronizando la base de datos", err));

module.exports = Usuario;
