import requireLogin from './../middlewares/requireLogin';
import requireCredits from './../middlewares/requireCredits';
import _ from 'lodash';
import Path from 'path-parser';
import { URL } from 'url';
import mongoose from 'mongoose';
import Mailer from './../services/Mailer';
import surveyTemplate from './../services/emailTemplates/surveyTemplate';

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    try {
      const userId = req.user.id;
      const surveys = await Survey.find({ _user: userId }).select({
        recipients: false
      });
      res.status(200).send(surveys);
    } catch (err) {
      res.status(404).send(err);
    }
  });
  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.status(200).send('<h1>Thanks for voting!</h1>');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');
    _.chain(req.body)
      .map(({ url, email }) => {
        // Match will be null or a variable
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();
    res.send({});
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
