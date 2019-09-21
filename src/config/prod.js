// prod.js

const googleClientID = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const mongoURI = process.env.MONGO_URI;
const cookieKey = process.env.COOKIE_KEY;
const stripePushlishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

module.exports = {
  googleClientID,
  googleClientSecret,
  mongoURI,
  cookieKey,
  stripePushlishableKey,
  stripeSecretKey
};
