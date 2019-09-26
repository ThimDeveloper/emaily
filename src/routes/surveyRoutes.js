import requireLogin from './../middlewares/requireLogin';
import requireCredits from './../middlewares/requireCredits';
import mongoose from 'mongoose';
import Mailer from './../services/Mailer';
import surveyTemplate from './../services/emailTemplates/surveyTemplate';

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.status(200).send('<h1>Thanks for voting!</h1>');
  });
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({
        email: email.trim()
      })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    // Great place to place new mailer
    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.status(201).send(user);
    } catch (err) {
      res.status(422).send(err);
    }

    //Send back new value of credits
  });
};
