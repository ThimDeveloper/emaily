import keys from './../config/keys';
import stripe from 'stripe';
import requireLogin from './../middlewares/requireLogin';

// Initialize Stripe
const Stripe = stripe(keys.stripeSecretKey);

module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    // Handle token from STRIPE
    try {
      const token = req.body.id;
      if (!token) {
        throw new Error('[STRIPE ERROR]: could not find token!');
      }
      // Create Charge
      const charge = await Stripe.charges.create({
        amount: 500,
        currency: 'usd',
        description: '$5 for 5 Credits.',
        source: token // obtained with Stripe.js
      });
      if (charge.status !== 'succeeded') {
        throw new Error('[STRIPE ERROR]: charging error!');
      } else {
        // Update the user model object (req.user -> reference to MongoDB user object)
        req.user.credits += 5;
        const user = await req.user.save();
        res.status(201).send(user);
      }
    } catch (e) {
      console.error(e);
      return res.status(500).send(e);
    }
  });
};
