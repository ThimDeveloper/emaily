import passport from 'passport';

module.exports = app => {
  // The string "google" is an internal identifier used by passport to use GoogleStrategy
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  // The user has the code, passport exchange the code for user profile information
  app.get('/auth/google/callback', passport.authenticate('google'));
};
