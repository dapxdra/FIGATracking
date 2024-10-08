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
      type: DataTypes.STRING(255),
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(100),
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
    tableName: "usuarios",
    timestamps: false,
  }
);

module.exports = Usuario;
