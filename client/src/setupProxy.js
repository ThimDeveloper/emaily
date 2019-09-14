import proxy from 'http-proxy-middleware';

module.exports = function(app) {
  app.use(proxy(['/api', '/auth/google'], { target: 'http://localhost:5000' }));
};
