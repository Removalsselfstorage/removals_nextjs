import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        // payment_method_types: ["card", "paypal"],
        line_items: req?.body?.items ?? [],
        success_url: `${req.headers.origin}/book/checkout?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/book/checkout`,
      });
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
