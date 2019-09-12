import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { googleClientID, googleClientSecret } from "../config/keys";

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    // Obtain the user information and save it to a database
    (accessToken, refreshToken, profile, done) => {
      const info = {
        accessToken,
        refreshToken,
        profile
      };
      console.log(info);
    }
  )
);
