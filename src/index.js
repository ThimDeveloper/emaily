import express from "express";
import "./services/passport";
import withAuthRoutes from "./routes/authRoutes";
import { mongoUri } from "../config/keys";
import mongoose from "mongoose";

mongoose.connect(mongoUri);

const app = express();

withAuthRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
