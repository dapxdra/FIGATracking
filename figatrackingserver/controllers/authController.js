const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Usuario = require("../models/user.js");
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
        // Buscar usuario en el esquema FIGA
        let user = await Usuario.findOne({ where: { oauth_id: profile.id } });

        if (!user) {
          // Si no existe el usuario, crearlo en el esquema FIGA
          user = await Usuario.create({
            oauth_id: profile.id,
            nombre: profile.displayName,
            email: profile.emails[0].value,
            rol: "conductor", // Rol por defecto
            estado: true, // Activo
          });
          if (user.rol === "conductor") {
            await Conductor.create({
              usuario_id: user.id,
              cedula: "207760791", // Si tienes la cédula disponible la puedes agregar aquí
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

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Usuario.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});

module.exports = passport;
