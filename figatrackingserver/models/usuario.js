const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.js");

const Usuario = sequelize.define(
  "Usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    oauth_id: {
      type: DataTypes.STRING,
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
    fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "Usuarios",
    timestamps: false,
  }
);

module.exports = Usuario;
