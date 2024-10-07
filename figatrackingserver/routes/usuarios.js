const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController.js");

router.post("/crearusuarios", usuarioController.crearUsuario);
router.get("/verusuarios", usuarioController.listarUsuarios);
router.put("/actusuarios/:id", usuarioController.actualizarUsuario);
router.delete("/elimusuarios/:id", usuarioController.eliminarUsuario);

module.exports = router;
