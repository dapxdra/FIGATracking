const express = require("express");
const passport = require("passport");
const router = express.Router();
const authController = require("../controllers/authController.js");
const path = require("path");

// Iniciar autenticación con Google
router.get("/auth/google", authController.googleLogin);

// Callback de Google OAuth
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

// Verificar estado de autenticación
router.get("/auth/status", authController.checkAuthStatus);

router.get("/logout", authController.logout);

module.exports = router;
