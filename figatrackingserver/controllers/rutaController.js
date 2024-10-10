const Ruta = require("../models/ruta");
const Usuario = require("../models/usuario.js");
const Conductor = require("../models/conductor.js");
const Vehiculo = require("../models/vehiculo.js");

const getRutas = async (req, res) => {
  try {
    const rutas = await Ruta.findAll({
      include: [
        {
          model: Conductor,
          as: "conductor", // Asegúrate de que este alias coincida con tu asociación
          include: {
            model: Usuario, // Incluir el modelo Usuario para obtener el nombre
            attributes: ["nombre"], // Solo obtener el campo "nombre" del Usuario
          },
          attributes: ["id"], // También puedes obtener el id del conductor si lo necesitas
        },
        {
          model: Vehiculo,
          as: "vehiculo", // Asegúrate de que este alias coincida con tu asociación
          attributes: ["placa"], // Obtener el campo "placa" del Vehiculo
        },
      ],
    });

    res.json(rutas);
  } catch (error) {
    console.error(error); // Esto te ayudará a ver el error exacto en la consola
    res.status(500).json({ error: "Error al obtener las rutas" });
  }
};

const createRuta = async (req, res) => {
  try {
    const {
      conductor_id,
      vehiculo_id,
      punto_inicio,
      punto_destino,
      duracion_estimada,
      distancia,
      estado,
    } = req.body;
    const nuevaRuta = await Ruta.create({
      conductor_id,
      vehiculo_id,
      punto_inicio: { type: "Point", coordinates: punto_inicio },
      punto_destino: { type: "Point", coordinates: punto_destino },
      duracion_estimada,
      distancia,
      estado,
    });
    res.json(nuevaRuta);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la ruta" });
  }
};

const getConductoresYVehiculos = async (req, res) => {
  console.log("listo para dar los vehiculos y conductores");
  try {
    // Asegúrate de que 'Conductor' tenga una asociación con 'Usuario'
    const conductores = await Conductor.findAll({
      include: {
        model: Usuario,
        attributes: ["nombre"], // Obtén solo el campo "nombre" del usuario
      },
      attributes: ["id"], // Obtén solo el campo "id" del conductor
    });

    const vehiculos = await Vehiculo.findAll({
      attributes: ["id", "placa"], // Obtén los campos "id" y "placa" del vehículo
    });

    res.json({ conductores, vehiculos });
  } catch (error) {
    console.error(error); // Esto te ayudará a ver el error exacto en la consola
    res.status(500).json({ error: "Error al obtener conductores y vehículos" });
  }
};

module.exports = {
  getRutas,
  createRuta,
  getConductoresYVehiculos,
};
