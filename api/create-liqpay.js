import crypto from 'crypto';

export default async function handler(req, res) {
  // Enforce POST method to protect endpoint integrity
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, description, clientPhone, clientEmail } = req.body;

    // Reading variables securely from Vercel's encrypted environment variables
    const publicKey = process.env.LIQPAY_PUBLIC_KEY;
    const privateKey = process.env.LIQPAY_PRIVATE_KEY;

    // Safety validation block: Prevent runtime crashes if Vercel configuration is incomplete
    if (!publicKey || !privateKey) {
      return res.status(500).json({ 
        error: 'Payment Gateway Configuration Error: LIQPAY_PUBLIC_KEY or LIQPAY_PRIVATE_KEY is not defined in Vercel settings.' 
      });
    }

    // Generate a unique order tracking ID
    const orderId = `SLS-${Date.now()}`;

    const jsonParams = {
      public_key: publicKey,
      version: 3,
      action: 'pay',
      amount: parseFloat(amount),
      currency: 'UAH', 
      description: description || 'Language Services Payment',
      order_id: orderId,
      result_url: 'https://sheridanls.com.ua/', 
      sandbox: 1 // Forces sandboxed checkout flow
    };

    // Base64 encode the JSON payload string
    const jsonString = JSON.stringify(jsonParams);
    const data = Buffer.from(jsonString).toString('base64');

    const signString = privateKey + data + privateKey;
    const signature = crypto
      .createHash('sha1')
      .update(signString)
      .digest('base64');

    return res.status(200).json({ data, signature });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}