const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.js");
const Usuario = require("./user.js"); // Importa el modelo Usuario

const Conductor = sequelize.define("Conductor", {
  cedula: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario, // Referencia el modelo Usuario
      key: "id",
    },
    onDelete: "CASCADE", // Elimina el conductor si se borra el usuario
  },
});

/* // Relación uno a uno con Usuarios
Conductor.belongsTo(Usuario, {
  foreignKey: "id",
  as: "usuario",
}); */

module.exports = Conductor;
