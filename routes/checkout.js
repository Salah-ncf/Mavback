const express = require("express");
const router = express.Router();
const stripe = require("stripe")("sk_test_YOUR_SECRET_KEY"); // Remplace par ta clé secrète Stripe

router.post("/checkout", async (req, res) => {
  const { cartItems } = req.body;

  try {
    const line_items = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image], // optionnel
        },
        unit_amount: item.price * 100, // en centimes
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Erreur Stripe Checkout :", error.message);
    res.status(500).json({ error: "Échec de création de session Stripe." });
  }
});

module.exports = router;
