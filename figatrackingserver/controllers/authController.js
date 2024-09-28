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
        } else {
          console.log("Usuario encontrado en la base de datos");
        }
        if (usuario.oauth_id === "" || usuario.nombre === "") {
          usuario.oauth_id = profile.id;
          usuario.nombre = profile.displayName;
          await usuario.save();
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

/* const googleCallback = (req, res) => {
  passport.authenticate(
    "google",
    { failureRedirect: "/auth/failure", successRedirect: "/auth/success" },
    (err, user, req, res) => {
      UsuarioController.actualizarUsuarioOAuth(req, res);
      console.log(req.user);
      if (err || !user) {
        //res.send("Error en el login");
        return res.redirect("/");
      } else {
        return res.redirect("/dashboard");
      }
    }
  );
}; */

// Verificar estado de sesión
const checkAuthStatus = (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ loggedIn: true });
  } else {
    return res.json({ loggedIn: false });
  }
};

// Cerrar sesión
const logout = (req, res) => {
  // Passport provee el método logout para destruir la sesión
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Error al cerrar sesión" });
    }
    // Opcionalmente, puedes destruir la sesión en el servidor
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Error al destruir la sesión" });
      }
      // Redirige a la página de inicio de sesión o un mensaje de confirmación
      res.clearCookie("connect.sid"); // Limpia la cookie de la sesión
      return res.status(200).json({ message: "Sesión cerrada exitosamente" });
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
