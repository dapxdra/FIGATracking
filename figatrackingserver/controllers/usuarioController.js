const Usuario = require("../models/usuario.js");
const Conductor = require("../models/conductor.js");

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

/* exports.actualizarUsuarioOAuth = async (req, res) => {
  try {
    if (!req.user) {
      console.log("Usuario no autenticado");
      return res.status(401).json({ message: "Usuario no autenticado" });
    }

    const { oauth_id, nombre, email } = req.user; // Ahora req.user debería estar definido

    const usuario = await Usuario.findOne({ where: { email: email } });

    if (usuario) {
      usuario.oauth_id = oauth_id;
      usuario.nombre = nombre;
      await usuario.save();
      console.log("Usuario actualizado correctamente");
      return res.redirect("/dashboard");
    } else {
      console.log("Usuario no encontrado act");
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.log("Error al actualizar el usuario");
    return res
      .status(500)
      .json({ message: "Error al actualizar el usuario", error });
  }
};
 */
