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
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  // End point for extracting the current user data if cookie is properly set. (Passport automatically sets the user to the request object)
  app.get('/api/current_user', (req, res) => {
    if (req.user) {
      console.log('Showing current user info.');
      return res.send(req.user);
    } else {
      console.log('User is not logged in.');
      return res.send(req.user);
    }
  });

  app.get('/api/logout', (req, res) => {
    // req.logout is a function added by passport. It erases the information from the request object that identifies a user as known.
    console.log('User logged out.');
    req.logout();
    res.redirect('/');
  });
};
