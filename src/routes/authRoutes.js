import passport from 'passport';

module.exports = app => {
  app.get('/', (req, res) => {
    res.send({ Message: 'Hello from heroku' });
  });

  // The string "google" is an internal identifier used by passport to use GoogleStrategy
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  // The user has the code, passport exchange the code for user profile information
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      console.log(req);
      res.send('Authenticated user');
    }
  );

  // End point for extracting the current user data if cookie is properly set. (Passport automatically sets the user to the request object)
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.get('/api/logout', (req, res) => {
    // req.logout is a function added by passport. It erases the information from the request object that identifies a user as known.
    req.logout();

    // This should be undefined now.
    res.send(req.user);
  });
};
