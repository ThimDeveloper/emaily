const proxy = require('http-proxy-middleware');

module.exports = async function(app) {
  await app.use(
    proxy(['/api', '/auth/google'], { target: 'http://[::1]:5000' })
  );
};
