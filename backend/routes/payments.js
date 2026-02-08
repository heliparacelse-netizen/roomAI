import express from 'express';
import Stripe from 'stripe';
import { body, validationResult } from 'express-validator';

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16'
});

router.post(
  '/checkout',
  [body('plan').isString().isLength({ min: 3 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        line_items: [
          {
            price: process.env.STRIPE_PRICE_ID,
            quantity: 1
          }
        ],
        success_url: `${process.env.FRONTEND_ORIGIN}/?success=1`,
        cancel_url: `${process.env.FRONTEND_ORIGIN}/?canceled=1`
      });
      return res.json({ url: session.url });
    } catch (error) {
      return res.status(500).json({ error: 'Stripe error.' });
    }
  }
);

export default router;
