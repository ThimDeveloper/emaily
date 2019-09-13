import express from 'express';
import mongoose from 'mongoose';

import cookieSession from 'cookie-session';
// Import passport to tell passport to make use of cookie sessions
import passport from 'passport';
import toMilliSecond from './utils/timeConverter';
import './models/User';
import './services/passport';
import { mongoURI, cookieKey } from './config/keys';
import withAuthRoutes from './routes/authRoutes';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

const cookieAge = toMilliSecond('d', 30);

// MIDDLEWARE (adding functionality and process request to the application)
// Cookie session options object
app.use(
  cookieSession({
    maxAge: cookieAge,
    keys: [cookieKey]
  })
);

// Initialize passport and session management
app.use(passport.initialize());
app.use(passport.session());

withAuthRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
