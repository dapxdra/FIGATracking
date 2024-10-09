const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.js");

const Vehiculo = sequelize.define(
  "Vehiculo",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    placa: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    capacidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "vehiculos",
    timestamps: false,
  }
);

module.exports = Vehiculo;
