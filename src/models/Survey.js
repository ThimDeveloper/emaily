import { Schema, model } from 'mongoose';
import RecipientSchema from './Recipient';

const surveySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  recipients: {
    type: [RecipientSchema],
    required: true
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
