const isAuthenticated = (req, res, next) => {
  // Verifica si el usuario tiene una sesión activa
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next(); // Si está autenticado, pasa al siguiente middleware/controlador
  } else {
    return res.status(401).json({ error: "No estás autenticado" });
  }
};

module.exports = { isAuthenticated };
