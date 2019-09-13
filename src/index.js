import express from 'express';
import mongoose from 'mongoose';
import './models/User';
import './services/passport';
import { mongoURI } from './config/keys';
import withAuthRoutes from './routes/authRoutes';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
withAuthRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
