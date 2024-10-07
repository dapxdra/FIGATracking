const Usuario = require("../models/usuario.js");
const Conductor = require("../models/conductor.js");

// Crear usuarios y conductores
exports.crearUsuario = async (req, res) => {
  const { email, cedula } = req.body;

  try {
    const nuevoUsuario = await Usuario.create({
      email,
      rol: "conductor",
    });

    const nuevoConductor = await Conductor.create({
      usuario_id: nuevoUsuario.id,
      cedula,
    });

    res.status(201).json({
      message: "Usuario creado exitosamente",
      nuevoUsuario,
      nuevoConductor,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el usuario" });
  }
};

// Listar Usuarios
exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      include: [{ model: Conductor }],
    });
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al listar los usuarios" });
  }
};

// Actualizar Usuario
exports.actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { email, cedula } = req.body;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Actualizar usuario
    usuario.email = email;
    await usuario.save();

    // Actualizar conductor
    const conductor = await Conductor.findOne({ where: { usuario_id: id } });
    if (conductor) {
      conductor.cedula = cedula;
      await conductor.save();
    }

    res.status(200).json({
      message: "Usuario y Conductor actualizados exitosamente",
      usuario,
      conductor,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al actualizar el usuario y conductor" });
  }
};

// Eliminar Usuario
exports.eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Eliminar conductor primero
    await Conductor.destroy({ where: { usuario_id: id } });
    // Eliminar usuario
    await usuario.destroy();

    res.status(204).send(); // Sin contenido, pero indica éxito.
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el usuario y conductor" });
  }
};
