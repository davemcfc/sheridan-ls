import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let body = req.body || {};
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        body = {};
      }
    }

    const { amount, description } = body;
    const parsedAmount = parseFloat(amount);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({ error: 'Invalid or missing payment amount' });
    }

    // Default Sandbox Credentials (Strictly Aligned)
    const publicKey = 'sandbox_i89035654316';
    const privateKey = 'sandbox_p1482811833075677';

    const orderId = `SLS-${Date.now()}`;

    // Construct request parameters including explicit sandbox routing flag
    const jsonParams = {
      public_key: publicKey,
      version: 3,
      action: 'pay',
      amount: parsedAmount,
      currency: 'UAH', 
      description: description || 'Language Services Payment',
      order_id: orderId,
      result_url: 'https://www.sheridanls.com.ua/', 
      sandbox: 1 // 🔥 CRITICAL: Directs LiqPay to process this request inside the Sandbox database
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
    return res.status(500).json({ error: error.message });
  }
}