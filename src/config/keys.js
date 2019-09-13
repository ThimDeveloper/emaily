// PROD OOrRJAtTSL1a9Bfr

// PROD URI: mongodb+srv://emailyProd:OrRJAtTSL1a9Bfr@cluster0-2clps.mongodb.net/test?retryWrites=true&w=majority

// PROD gUser: 1003344373059-vo279ceibph5ufosg67bdciemvacrkft.apps.googleusercontent.com
// PROD gSec: kADEDcHb1hey3CApowOf7M58

if (process.env.NODE_ENV === 'production') {
  // in production environment, return production keys
  module.exports = require('./prod');
} else {
  // in development environment, return development keys
  module.exports = require('./dev');
}
