const express = require("express");
const passport = require("passport");
const router = express.Router();
const authController = require("../controllers/authController");
const path = require("path");

// Ruta para iniciar sesión con Google
/* router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
); */

// Ruta de callback después de la autenticación
/* router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/failure",
    successRedirect: "/auth/success",
  })
); */

/* router.get("/success", (req, res) => {
  res.send("Login exitoso");
});

router.get("/failure", (req, res) => {
  res.send("Error en el login");
}); */

// Iniciar autenticación con Google
router.get("/auth/google", authController.googleLogin);

// Callback de Google OAuth
router.get("/auth/google/callback", authController.googleCallback);

// Verificar estado de autenticación
router.get("/auth/status", authController.checkAuthStatus);

module.exports = router;
