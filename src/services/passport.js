import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { googleClientID, googleClientSecret } from '../config/keys';
import mongoose from 'mongoose';

const User = mongoose.model('users');

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
