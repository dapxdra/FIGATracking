// models/Conductor.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.js");
const Usuario = require("./usuario.js");

const Conductor = sequelize.define(
  "Conductor",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Usuario,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    cedula: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "Conductores",
    timestamps: false,
  }
);

Usuario.hasOne(Conductor, { foreignKey: "usuario_id" });
Conductor.belongsTo(Usuario, { foreignKey: "usuario_id" });

module.exports = Conductor;
