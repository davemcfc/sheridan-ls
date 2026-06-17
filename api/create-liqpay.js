import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, description, clientPhone, clientEmail } = req.body;

    const publicKey = process.env.LIQPAY_PUBLIC_KEY;
    const privateKey = process.env.LIQPAY_PRIVATE_KEY;

    // Generate a unique order tracking ID
    const orderId = `SLS-${Date.now()}`;

    // 1. Define required checkout arguments
    const jsonParams = {
      public_key: publicKey,
      version: 3,
      action: 'pay',
      amount: parseFloat(amount),
      currency: 'UAH',
      description: description || 'Language Services Payment',
      order_id: orderId,
      result_url: 'https://sheridanls.com.ua/', // Where buyer returns after paying
    };

    // 2. Base64 encode the JSON payload string
    const jsonString = JSON.stringify(jsonParams);
    const data = Buffer.from(jsonString).toString('base64');

    // 3. Create the cryptographic digital signature verification string
    const signString = privateKey + data + privateKey;
    const signature = crypto
      .createHash('sha1')
      .update(signString)
      .digest('base64');

    // Return the strings safely back to your front end
    return res.status(200).json({ data, signature });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}