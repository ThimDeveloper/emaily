import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  googleID: String,
  credits: { type: Number, default: 0 }
});

model('users', userSchema);
