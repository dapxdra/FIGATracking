/* const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.js");
const Conductor = require("./conductor.js"); // Importamos el modelo de Conductores
const Vehiculo = require("./vehiculo.js"); // Importamos el modelo de Vehiculos

const Ruta = sequelize.define(
  "Ruta",
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    origen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destino: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.DECIMAL(9, 6),
      allowNull: false,
    },
    longitude: {
      type: DataTypes.DECIMAL(9, 6),
      allowNull: false,
    },
    distancia_km: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    conductor_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Conductores",
        key: "id",
      },
      onDelete: "SET NULL",
    },
    vehiculo_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Vehiculos",
        key: "id",
      },
      onDelete: "SET NULL",
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "Rutas",
    timestamps: false,
  }
);

// Relacionamos con los modelos de Conductores y Vehiculos
Ruta.belongsTo(Conductor, { foreignKey: "conductor_id", as: "conductor" });
Ruta.belongsTo(Vehiculo, { foreignKey: "vehiculo_id", as: "vehiculo" });

module.exports = Ruta; */

const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.js");
const Conductor = require("./conductor.js");
const Vehiculo = require("./vehiculo.js");

const Ruta = sequelize.define(
  "Ruta",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    conductor_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Conductor",
        key: "id",
      },
      onDelete: "SET NULL",
    },
    vehiculo_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Vehiculo",
        key: "id",
      },
      onDelete: "SET NULL",
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    punto_inicio: {
      type: DataTypes.GEOGRAPHY,
      allowNull: false,
    },
    punto_destino: {
      type: DataTypes.GEOGRAPHY,
      allowNull: false,
    },
    duracion_estimada: {
      type: DataTypes.INTEGER, // Duración en minutos
      allowNull: false,
    },
    distancia: {
      type: DataTypes.DECIMAL(10, 2), // Distancia en km
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["completada", "en progreso", "cancelada"]],
      },
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "rutas",
    timestamps: false,
  }
);

// Relaciones
Ruta.belongsTo(Conductor, { foreignKey: "conductor_id", as: "conductor" });
Ruta.belongsTo(Vehiculo, { foreignKey: "vehiculo_id", as: "vehiculo" });

module.exports = Ruta;
