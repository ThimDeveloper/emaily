import { Schema } from 'mongoose';

const recipientSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  responded: { type: Boolean, default: false }
});

export default recipientSchema;
