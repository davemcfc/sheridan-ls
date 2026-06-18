const crypto = require('crypto');

module.exports = async function handler(req, res) {
  // CORS & Method Guard
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 1. Safe Body Parser Guard
    const body = req.body || {};
    const { amount, currency, description, clientPhone, clientEmail } = body;

    // 2. Validate payment amount
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({ error: 'Invalid or missing payment amount' });
    }

    // 3. Load secure API keys from Vercel dashboard
    const publicKey = process.env.LIQPAY_PUBLIC_KEY;
    const privateKey = process.env.LIQPAY_PRIVATE_KEY;

    // Guard: If keys are missing, return a clean JSON error
    if (!publicKey || !privateKey) {
      console.error('CRITICAL: LiqPay Public or Private keys are not set up in Vercel environment variables.');
      return res.status(500).json({
        error: 'Payment Gateway Error: Merchant credentials are missing in the Vercel Settings panel.'
      });
    }

    // 4. Generate a unique order tracking ID
    const orderId = `SLS-${Date.now()}`;

    // 5. Define required checkout arguments
    const jsonParams = {
      public_key: publicKey,
      version: 3,
      action: 'pay',
      amount: parsedAmount,
      currency: currency || 'UAH', // Defaults safely to UAH
      description: description || 'Language Services Payment',
      order_id: orderId,
      result_url: 'https://sheridanls.com.ua/', // Safe return domain
    };

    // 6. Base64 encode the JSON payload string
    const jsonString = JSON.stringify(jsonParams);
    const data = Buffer.from(jsonString).toString('base64');

    // 7. Create the cryptographic digital signature verification string
    const signString = privateKey + data + privateKey;
    const signature = crypto
      .createHash('sha1')
      .update(signString)
      .digest('base64');

    // Return safely to your frontend checkout form
    return res.status(200).json({ data, signature });

  } catch (error) {
    console.error('Unhandled runtime exception in backend serverless function:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};