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
      callbackURL: 'http://localhost:5000/auth/google/callback'
    },
    // Obtain the user information and save it to a database
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleID: profile.id }).then(existingUser => {
        if (existingUser) {
          //console.log('User already exists.');
          done(null, existingUser);
        } else {
          // profile.id is the google user id
          new User({
            googleID: profile.id
          })
            .save()
            .then(user => {
              done(null, user);
            });
        }
      });
    }
  )
);
