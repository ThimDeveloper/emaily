import express from 'express';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';
// Import passport to tell passport to make use of cookie sessions
import passport from 'passport';
import toMilliSecond from './utils/timeConverter';
import './models/User';
import './models/Survey';
import './services/passport';
import { mongoURI, cookieKey } from './config/keys';
import withAuthRoutes from './routes/authRoutes';
import withBillingRoutes from './routes/billingRoutes';
import withSurveyRoutes from './routes/surveyRoutes';
import withProductionClient from './routes/withProductionClient';

try {
  mongoose.Promise = global.Promise;
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
} catch (error) {
  console.error('MONGOOSE CONNECTION ERROR IN INDEX');
  console.log(error);
}

const app = express();

const cookieAge = toMilliSecond('day', 30);

// MIDDLEWARE (adding functionality and process request to the application)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
withBillingRoutes(app);
withSurveyRoutes(app);
withProductionClient(app);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});

process.on('uncaughtException', e => {
  console.log('Uncaught Exception Detected!');
  console.error(e);
  server.close();
});
process.on('exit', e => {
  console.log('Exit Detected');
  console.error(e);
  server.close();
});

process.on('SIGTERM', e => {
  console.log('Signal Terminate Detected');
  console.error(e);
  server.close();
});
