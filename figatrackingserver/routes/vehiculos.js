const express = require("express");
const router = express.Router();
const vehiculosController = require("../controllers/vehiculoController.js");
const { isAuthenticated } = require("../middlewares/authMiddleware.js"); // Middleware de autenticación

router.get(
  "/vervehiculos",
  isAuthenticated,
  vehiculosController.listarVehiculos
);
router.post(
  "/crearvehiculos",
  isAuthenticated,
  vehiculosController.crearVehiculo
);
router.put(
  "/actvehiculos/:id",
  isAuthenticated,
  vehiculosController.actualizarVehiculo
);
router.delete(
  "/eliminarvehiculos/:id",
  isAuthenticated,
  vehiculosController.eliminarVehiculo
);

module.exports = router;
