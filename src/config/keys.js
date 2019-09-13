if (process.env.NODE_ENV === 'production') {
  // in production environment, return production keys
  module.exports = require('./prod');
} else {
  // in development environment, return development keys
  module.exports = require('./dev');
}
