// Final cache bust to force Vercel overwrite - June 18
import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body || {};
    const { amount, currency, description, clientPhone, clientEmail } = body;

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({ error: 'Invalid or missing payment amount' });
    }

    const publicKey = process.env.LIQPAY_PUBLIC_KEY;
    const privateKey = process.env.LIQPAY_PRIVATE_KEY;

    if (!publicKey || !privateKey) {
      console.error('CRITICAL: LiqPay Public or Private keys are not set up in Vercel environment variables.');
      return res.status(500).json({
        error: 'Payment Gateway Error: Merchant credentials are missing in the Vercel Settings panel.'
      });
    }

    const orderId = `SLS-${Date.now()}`;

    const jsonParams = {
      public_key: publicKey,
      version: 3,
      action: 'pay',
      amount: parsedAmount,
      currency: currency || 'UAH',
      description: description || 'Language Services Payment',
      order_id: orderId,
      result_url: 'https://www.sheridanls.com.ua/',
    };

    const jsonString = JSON.stringify(jsonParams);
    const data = Buffer.from(jsonString).toString('base64');

    const signString = privateKey + data + privateKey;
    const signature = crypto
      .createHash('sha1')
      .update(signString)
      .digest('base64');

    return res.status(200).json({ data, signature });

  } catch (error) {
    console.error('Unhandled runtime exception:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}