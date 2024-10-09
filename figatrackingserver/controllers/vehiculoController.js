const Vehiculo = require("../models/vehiculo.js");

// Obtener todos los vehículos
exports.listarVehiculos = async (req, res) => {
  try {
    const vehiculos = await Vehiculo.findAll();
    res.json(vehiculos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los vehículos" });
  }
};

// Crear un nuevo vehículo
exports.crearVehiculo = async (req, res) => {
  if (req.user.rol !== "administrador") {
    return res.status(403).json({ error: "Acceso denegado" });
  }
  const { placa, modelo, capacidad } = req.body;
  try {
    const nuevoVehiculo = await Vehiculo.create({ placa, modelo, capacidad });
    res.status(201).json(nuevoVehiculo);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el vehículo b" });
  }
};

// Actualizar un vehículo
exports.actualizarVehiculo = async (req, res) => {
  if (req.user.rol !== "administrador") {
    return res.status(403).json({ error: "Acceso denegado" });
  }
  const { id } = req.params;
  const { placa, modelo, capacidad } = req.body;
  try {
    const vehiculo = await Vehiculo.findByPk(id);
    if (vehiculo) {
      vehiculo.placa = placa;
      vehiculo.modelo = modelo;
      vehiculo.capacidad = capacidad;
      await vehiculo.save();
      res.json(vehiculo);
    } else {
      res.status(404).json({ error: "Vehículo no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el vehículo" });
  }
};

// Eliminar un vehículo
exports.eliminarVehiculo = async (req, res) => {
  if (req.user.rol !== "administrador") {
    return res.status(403).json({ error: "Acceso denegado" });
  }
  const { id } = req.params;
  try {
    const vehiculo = await Vehiculo.findByPk(id);
    if (vehiculo) {
      await vehiculo.destroy();
      res.json({ message: "Vehículo eliminado" });
    } else {
      res.status(404).json({ error: "Vehículo no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el vehículo" });
  }
};
