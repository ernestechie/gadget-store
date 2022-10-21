import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [
          { shipping_rate: 'shr_1LvRMlGpGAMMclzjrl8idLUF' },
          { shipping_rate: 'shr_1LvROwGpGAMMclzjfMRl1XAI' },
          { shipping_rate: 'shr_1LvRPmGpGAMMclzjwpj4xi6o' },
        ],
        line_items: req.body.cartItems.map((item) => {
          const img = item.image[0].asset._ref;
          const newImg = img
            .replace(
              'image-',
              'https://cdn.sanity.io/images/defmd2mg/production/'
            )
            .replace('-webp', '.webp');

          return {
            price_data: {
              currency: 'USD',
              product_data: {
                name: item.name,
                images: [newImg],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      };

      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
      // res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
