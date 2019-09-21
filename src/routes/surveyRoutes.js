import requireLogin from './../middlewares/requireLogin';
import requireCredits from './../middlewares/requireCredits';
import mongoose from 'mongoose';

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(recipient => ({
        email: email.trim()
      })),
      _user: req.user.id,
      dateSent: Date.now()
    });
  });
};
