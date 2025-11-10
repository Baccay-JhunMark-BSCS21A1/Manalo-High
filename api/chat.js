// api/chat.js
module.exports = async function handler(req, res) {
  const allowedOrigin = 'https://manalo-high.vercel.app';

  // Set CORS headers for all requests
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests immediately
  if (req.method === 'OPTIONS') {
    return res.status(204).end(); // 204 No Content is safest
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const API_KEY = process.env.DEEPSEEK_API_KEY;
    if (!API_KEY) throw new Error('DEEPSEEK_API_KEY not set');

    const geminiRequest = req.body;
    const messages = [];

    if (geminiRequest.contents?.[0]?.parts?.[0]?.text) {
      messages.push({
        role: 'user',
        content: geminiRequest.contents[0].parts[0].text
      });
    }

    const deepseekResponse = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages,
        temperature: 0.7,
        max_tokens: 1000,
        stream: false
      })
    });

    const data = await deepseekResponse.json();

    if (data.error) return res.status(deepseekResponse.status).json(data);

    res.status(200).json({
      candidates: [{
        content: { parts: [{ text: data.choices[0].message.content }] },
        finishReason: data.choices[0].finish_reason,
        index: 0
      }],
      usageMetadata: {
        promptTokens: data.usage?.prompt_tokens || 0,
        candidatesTokens: data.usage?.completion_tokens || 0,
        totalTokens: data.usage?.total_tokens || 0
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error', message: err.message });
  }
};
