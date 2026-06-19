import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 1. Securely pull your LIVE keys from Vercel's Environment Variables
    const public_key = process.env.LIQPAY_PUBLIC_KEY;
    const private_key = process.env.LIQPAY_PRIVATE_KEY;

    if (!public_key || !private_key) {
      return res.status(500).json({ 
        error: 'Payment Gateway Error: Live Merchant credentials are missing in the Vercel Settings panel.' 
      });
    }

    const { amount, description, clientPhone, clientEmail } = req.body;

    // 2. Build the live transaction payload
    const jsonParams = {
      public_key: public_key,
      version: 3,
      action: 'pay',
      amount: amount,
      currency: 'UAH',
      description: description || 'Payment for Language Services',
      order_id: `SLS_${Date.now()}`,
      // CRITICAL: Sandbox is turned off (0) so real money is processed
      sandbox: 0 
    };

    // 3. Encrypt the payload with your Live Private Key
    const dataString = Buffer.from(JSON.stringify(jsonParams)).toString('base64');
    const signatureString = private_key + dataString + private_key;
    const signature = crypto.createHash('sha1').update(signatureString).digest('base64');

    return res.status(200).json({
      data: dataString,
      signature: signature
    });
  } catch (error) {
    console.error("Encryption error:", error);
    return res.status(500).json({ error: 'Internal Server Error during encryption' });
  }
}