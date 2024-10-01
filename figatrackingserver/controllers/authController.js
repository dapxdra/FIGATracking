const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Usuario = require("../models/usuario.js");
const Conductor = require("../models/conductor.js");
const UsuarioController = require("../controllers/usuarioController.js");
const { where } = require("sequelize");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (token, tokenSecret, profile, done) => {
      try {
        console.log(profile);
        const email = profile.emails[0].value;

        let usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
          console.log("Creando nuevo usuario");
          usuario = await Usuario.create({
            oauth_id: profile.id,
            nombre: profile.displayName,
            email: email,
            rol: "conductor",
          });
        } else if (usuario.oauth_id == null || usuario.nombre == null) {
          console.log("Usuario encontrado listo para actualizar");
          //UsuarioController.actualizarUsuarioOAuth(req, res);
          usuario.oauth_id = profile.id;
          usuario.nombre = profile.displayName;
          await usuario.save();
        } else {
          console.log("Usuario encontrado en la base de datos");
        }

        return done(null, usuario);
      } catch (error) {
        console.log("Error en la autenticación strat", error);
        return done(error, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Usuario.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

const googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
});

// Verificar estado de sesión
const checkAuthStatus = (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ loggedIn: true });
  } else {
    return res.json({ loggedIn: false });
  }
};

const logout = (req, res) => {
  console.log("método logout");
  console.log("Sesión antes del logout:", req.session);
  console.log("Cookie de sesión antes del logout:", req.cookies); // Verifica que la cookie esté presente
  console.log("ID de sesión antes del logout:", req.sessionID); // Verifica que la sesión esté activa

  res.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  // Passport's logout method
  req.logout(function (err) {
    console.log(req.session);
    if (err) {
      console.log("Error al cerrar sesión:", err);
      return res.status(500).json({ message: "Error al cerrar sesión" });
    }

    // Opción adicional para destruir la sesión en el servidor
    req.session.destroy((err) => {
      if (err) {
        console.log("Error al destruir la sesión:", err);
        return res.status(500).json({ message: "Error al destruir la sesión" });
      }

      // Limpiar la cookie de sesión (connect.sid)
      res.clearCookie("connect.sid", {
        path: "/",
        httpOnly: true,
        secure: false, // Si usas HTTPS, asegúrate de que sea true
      });

      // Redirigir a la página de inicio o enviar una respuesta de éxito
      return res.redirect("/");
      //return res.status(200).json({ message: "Sesión cerrada exitosamente" });
    });
  });
};

module.exports = {
  passport,
  googleLogin,
  //googleCallback,
  checkAuthStatus,
  logout,
};
