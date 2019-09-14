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
      console.log('User is authenticated');
      res.send('Authenticated user');
    }
  );

  // End point for extracting the current user data if cookie is properly set. (Passport automatically sets the user to the request object)
  app.get('/api/current_user', (req, res) => {
    if (req.user) {
      console.log('Showing current user info.');
      res.send(req.user);
    } else {
      console.log('User is not logged in.');
      res.send('User is not logged in.');
    }
  });

  app.get('/api/logout', (req, res) => {
    // req.logout is a function added by passport. It erases the information from the request object that identifies a user as known.
    req.logout();
    console.log('User logged out.');
    res.send('User logged out.');
  });
};
