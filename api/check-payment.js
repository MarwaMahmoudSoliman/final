const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  const sessionId = req.query.sessionId;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    res.status(200).json({
      success: session.payment_status === "paid",
      paymentStatus: session.payment_status,
      amount: session.amount_total,
      currency: session.currency,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
