// prod.js

const googleClientID = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const mongoURI = process.env.MONGO_URI;
const cookieKey = process.env.COOKIE_KEY;

module.exports = {
  googleClientID,
  googleClientSecret,
  mongoURI,
  cookieKey
};