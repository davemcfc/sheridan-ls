import crypto from 'crypto';

export default async function handler(req, res) {
  // Allow only secure POST requests to sign parameters
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, currency, description, clientPhone, clientEmail } = req.body;

    // Pull Sandbox or Production keys dynamically from Vercel's environment variables
    const publicKey = process.env.LIQPAY_PUBLIC_KEY;
    const privateKey = process.env.LIQPAY_PRIVATE_KEY;

    if (!publicKey || !privateKey) {
      throw new Error('LiqPay environment keys are missing on Vercel.');
    }

    // Generate a unique order tracking ID for each click
    const orderId = `SLS-${Date.now()}`;

    // Create the mandatory JSON schema expected by the LiqPay API
    const jsonParams = {
      public_key: publicKey,
      version: 3,
      action: 'pay',
      amount: parseFloat(amount),
      currency: currency || 'UAH', // Captures UAH, USD, or GBP dynamically from front-end
      description: description || 'Language Services Payment',
      order_id: orderId,
      result_url: 'https://sheridanls.com.ua/', // Redirect destination after successful checkout
    };

    // Step 1: Base64 encode the stringified JSON parameters payload
    const jsonString = JSON.stringify(jsonParams);
    const data = Buffer.from(jsonString).toString('base64');

    // Step 2: Use HMAC-like sequence string parsing to generate SHA1 hash
    const signString = privateKey + data + privateKey;
    const signature = crypto
      .createHash('sha1')
      .update(signString)
      .digest('base64');

    // Safely transmit signed payloads back to the client-side router
    return res.status(200).json({ data, signature });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
```
eof

### What to do now:
1. Open Notepad++ on your computer.
2. Open the file **`C:\sheridanls\api\create-liqpay.js`**.
3. Replace all existing text with the code above and save the file.

Once you have saved this backend file, let me know, and we will move to Step 2: updating your React frontend `App.jsx` to show the brand-new dropdown menu!