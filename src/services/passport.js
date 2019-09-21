import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { googleClientID, googleClientSecret } from '../config/keys';
import mongoose from 'mongoose';

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  // user.id is here is the internal object id of the user assigned to the user object in MongoDB.
  // here we take the internal user.id and serialize it (hash it) for client to use when sending request to the server.
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // Id here is the serialized id of a user
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    // Obtain the user information and save it to a database
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleID: profile.id });
      if (existingUser) {
        //console.log('User already exists.');
        return done(null, existingUser);
      }
      // profile.id is the google user id
      const user = await new User({ googleID: profile.id }).save();
      done(null, user);
    }
  )
);
