const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController.js");
const { isAuthenticated } = require("../middlewares/authMiddleware.js");

router.post("/crearusuarios", isAuthenticated, usuarioController.crearUsuario);
router.get("/verusuarios", isAuthenticated, usuarioController.listarUsuarios);
router.put(
  "/actusuarios/:id",
  isAuthenticated,
  usuarioController.actualizarUsuario
);
router.delete(
  "/elimusuarios/:id",
  isAuthenticated,
  usuarioController.eliminarUsuario
);

module.exports = router;
