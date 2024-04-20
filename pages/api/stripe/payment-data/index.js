const SECRET_KEY = "sk_test_51Oorb2IzJ30ojTomXAva2sw6OjRP65O81yIxHsq6yPQBmOfxQx0AM3N5upllMQmgNU6nyZyDsYpfvC3UCWtTowpS00MlCk6wQr"
const stripe = require("stripe")(SECRET_KEY)
const host = process.env.NEXT_PUBLIC_HOST
const appFee = process.env.STRIPE_APP_FEE

/**
 * Generates a checkout session based on the Connected Account Id and other
 * data provided. Handles cases for both the flutter app and the web.
 */
const paymentData = async (req, res) => {
  
  const { payment_id } = req.query; // Extract the payment ID from the query parameters
  
  // Retrieve payment details from Stripe using the payment ID
  try {
    const session = await stripe.checkout.sessions.retrieve(payment_id);

    // const payment = await stripe.paymentIntents.retrieve(payment_id);
    // Process payment details as needed (e.g., save to database, update order status, etc.)
    res.status(200).json({ session })
} catch (error) {
    console.error('Error retrieving payment details:', error);
    res.status(500).json({ error })
  }
  
}

export default paymentData
