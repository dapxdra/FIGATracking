const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController.js");

// Ruta para crear un usuario (CRUD - Crear)
router.post("/crear", usuarioController.crearUsuario);

// Ruta para actualizar datos después del OAuth login
router.put("/actualizar-oauth", usuarioController.actualizarUsuarioOAuth);

module.exports = router;
