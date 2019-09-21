import { Schema, model } from 'mongoose';
import RecipientSchema from './Recipient';

const surveySchema = new Schema({
  title: {
    type: String,
    required
  },
  body: {
    type: String,
    required
  },
  subject: {
    type: String,
    required
  },
  recipients: {
    type: [RecipientSchema],
    required
  },
  yes: {
    type: Number,
    default: 0
  },
  no: {
    type: Number,
    default: 0
  }
});

model('surveys', surveySchema);
