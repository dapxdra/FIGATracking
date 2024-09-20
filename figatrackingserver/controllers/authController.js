import passport, { use, serializeUser, deserializeUser } from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { findOne, create, findByPk } from "../models";

use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await findOne({ where: { googleId: profile.id } });

        if (!user) {
          user = await create({
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

serializeUser((user, done) => {
  done(null, user.id);
});

deserializeUser(async (id, done) => {
  try {
    const user = await findByPk(id);
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});

export default passport;
