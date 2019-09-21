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
  },
  // Reference to a unique user id owning the survey record (underscore indicates that this is a relationship field)
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  dateSent: {
    type: Date
  },
  lastResponded: {
    type: Date
  }
});

model('surveys', surveySchema);
