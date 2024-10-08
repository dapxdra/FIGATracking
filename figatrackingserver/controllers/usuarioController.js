const Usuario = require("../models/usuario.js");
const Conductor = require("../models/conductor.js");

// Crear usuarios y conductores
exports.crearUsuario = async (req, res) => {
  const { email, cedula } = req.body;
  console.log(req.body);
  console.log(typeof cedula);

  try {
    const nuevoUsuario = await Usuario.create({
      email,
      rol: "conductor",
    });
    console.log("usuario");

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
    console.error(error);
    res.status(500).json({ error: "Error al crear el usuario" });
  }
};

// Listar Usuarios
exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      include: [{ model: Conductor }],
    });
    console.log(usuarios);
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al listar los usuarios" });
  }
};

// Actualizar Usuario
exports.actualizarUsuario = async (req, res) => {
  const { email, cedula } = req.body;
  const id = req.params.id; // Aquí obtienes el id de los parámetros de la ruta
  console.log(id); // Verificas que se está obteniendo correctamente
  console.log(req.body); // Verificas que los datos del cuerpo de la petición también son correctos

  try {
    // 1. Buscar al usuario por su id
    const usuario = await Usuario.findByPk(id); // Encuentra el usuario en la base de datos
    if (!usuario) {
      // Si el usuario no existe, devolvemos un 404
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // 2. Actualizar el email del usuario
    await usuario.update({
      email: email, // Se actualiza el email con el valor proporcionado en el req.body
    });

    // 3. Buscar al conductor relacionado con este usuario
    const conductor = await Conductor.findOne({
      where: { usuario_id: usuario.id }, // Buscamos el conductor con el usuario_id
    });

    // 4. Si existe un conductor asociado, actualizamos la cédula
    if (conductor) {
      await conductor.update({
        cedula: cedula, // Actualizamos la cédula con el valor proporcionado
      });
    }

    // 5. Enviar respuesta de éxito con el usuario y conductor actualizados
    res.status(200).json({
      message: "Usuario y Conductor actualizados exitosamente",
      usuario, // Incluimos el usuario actualizado en la respuesta
      conductor, // Incluimos el conductor actualizado en la respuesta
    });
  } catch (error) {
    // En caso de error, devolver un status 500 y un mensaje de error
    console.error(error); // Mostrar el error en la consola para depuración
    res.status(500).json({
      error: "Error al actualizar el usuario y conductor",
    });
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
