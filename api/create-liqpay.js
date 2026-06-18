import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  // Safely extract amount and description from the incoming request body
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

  // 🔥 CORRECT SANDBOX KEYS (Matched default test credentials)
  const publicKey = 'sandbox_i89035654316';
  const privateKey = 'sandbox_p1482811833075677';

  const params = {
    public_key: publicKey,
    version: 3,
    action: 'pay',
    amount: parsedAmount,
    currency: 'UAH',
    description: description || 'Service Payment',
    order_id: 'SLS-' + Date.now(),
    result_url: 'https://www.sheridanls.com.ua/'
  };

  const data = Buffer.from(JSON.stringify(params)).toString('base64');
  const signature = crypto
    .createHash('sha1')
    .update(privateKey + data + privateKey)
    .digest('base64');

  res.status(200).json({ data, signature });
}