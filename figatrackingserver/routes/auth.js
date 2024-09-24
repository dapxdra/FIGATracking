const express = require("express");
const passport = require("passport");
const router = express.Router();

// Ruta para iniciar sesión con Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Ruta de callback después de la autenticación
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/failure",
    successRedirect: "/auth/success",
  })
);

router.get("/success", (req, res) => {
  res.send("Login exitoso");
});

router.get("/failure", (req, res) => {
  res.send("Error en el login");
});

module.exports = router;
