import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  googleID: String
});

model('users', userSchema);
