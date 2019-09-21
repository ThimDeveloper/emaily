import { Schema } from 'mongoose';

const recipientSchema = new Schema({
  email: {
    type: String,
    required
  },
  responded: { type: Boolean, default: false }
});

export default recipientSchema;
