const express = require("express");
const router = express.Router();
const RutaController = require("../controllers/rutaController.js");

router.get("/verrutas", RutaController.getRutas);
router.post("/crearrutas", RutaController.createRuta);
router.get("/opcrutas", RutaController.getConductoresYVehiculos);

module.exports = router;
