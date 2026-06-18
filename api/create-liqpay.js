import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, currency, description, clientPhone, clientEmail } = req.body;

    // Direct sandboxed keys bypass Vercel environment variable configuration
    const publicKey = 'sandbox_i2964871258'; 
    
    // REPLACE THIS PLACEHOLDER with the private key you revealed with the eye-icon in image_e06b01.png
    const privateKey = 'sandbox_cxfBXJLLn2k4hOqBNCCjg3JVRUlXU1VplpJCLxzW';

    // Generate a unique order tracking ID
    const orderId = `SLS-${Date.now()}`;

    // Define required checkout arguments
    const jsonParams = {
      public_key: publicKey,
      version: 3,
      action: 'pay',
      amount: parseFloat(amount),
      currency: currency || 'UAH', 
      description: description || 'Language Services Payment',
      order_id: orderId,
      result_url: 'https://sheridanls.com.ua/', 
      sandbox: 1 // Forces sandboxed checkout flow
    };

    // Base64 encode the JSON payload string
    const jsonString = JSON.stringify(jsonParams);
    const data = Buffer.from(jsonString).toString('base64');

    // Create the cryptographic digital signature verification string
    const signString = privateKey + data + privateKey;
    const signature = crypto
      .createHash('sha1')
      .update(signString)
      .digest('base64');

    return res.status(200).json({ data, signature });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }