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
              cedula: "207760791", // Cedula por defecto o la que obtengas de otro lado
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
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});

module.exports = passport;
