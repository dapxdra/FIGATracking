const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/usuario.js");
const Conductor = require("../models/conductor.js");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ where: { oauth_id: profile.id } });

        if (!user) {
          user = await User.create({
            oauth_id: profile.id,
            email: profile.emails[0].value,
            nombre: profile.displayName,
          });
          if (user.rol === "conductor") {
            await Conductor.create({
              usuario_id: user.id,
              cedula: "207760793", // Cedula por defecto o la que obtengas de otro lado
            });
          }
        }

        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

const googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
});

const googleCallback = (req, res) => {
  passport.authenticate(
    "google",
    { failureRedirect: "/auth/failure", successRedirect: "/auth/success" },
    (err, user) => {
      if (err || !user) {
        //res.send("Error en el login");
        return res.redirect("/");
      }
      // Iniciar la sesión
      req.login(user, (err) => {
        if (err) {
          return res.redirect("/auth/failure");
        }
        //res.send("Login existoso");
        //return res.redirect("/success");
        return res.redirect("/dashboard"); // Redirigir al frontend
      });
    }
  )(req, res);
};

// Verificar estado de sesión
const checkAuthStatus = (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ loggedIn: true });
  } else {
    return res.json({ loggedIn: false });
  }
};
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});

// Cerrar sesión
const logout = (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
};

module.exports = {
  passport,
  googleLogin,
  googleCallback,
  checkAuthStatus,
  logout,
};
