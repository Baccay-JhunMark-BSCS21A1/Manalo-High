// api/chat.js
// DeepSeek API handler for serverless deployment

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get API key from environment variable
    const API_KEY = process.env.DEEPSEEK_API_KEY;
    
    if (!API_KEY) {
      console.error('DEEPSEEK_API_KEY not found in environment variables');
      return res.status(500).json({ 
        error: 'Server configuration error. Please contact administrator.' 
      });
    }

    // Convert Gemini format to DeepSeek/OpenAI format
    const geminiRequest = req.body;
    const messages = [];
    
    // Extract the text from Gemini format and convert to DeepSeek format
    if (geminiRequest.contents && geminiRequest.contents[0] && geminiRequest.contents[0].parts) {
      const text = geminiRequest.contents[0].parts[0].text;
      messages.push({
        role: 'user',
        content: text
      });
    }

    // DeepSeek API request
    const deepseekRequest = {
      model: 'deepseek-chat',
      messages: messages,
      temperature: 0.7,
      max_tokens: 1000,
      stream: false
    };

    // Call DeepSeek API
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify(deepseekRequest)
    });

    const data = await response.json();
    
    // Check for errors
    if (data.error) {
      console.error('DeepSeek API error:', data.error);
      return res.status(response.status).json(data);
    }

    // Convert DeepSeek response to Gemini format for compatibility
    const geminiResponse = {
      candidates: [{
        content: {
          parts: [{
            text: data.choices[0].message.content
          }]
        },
        finishReason: data.choices[0].finish_reason,
        index: 0
      }],
      usageMetadata: {
        promptTokens: data.usage?.prompt_tokens || 0,
        candidatesTokens: data.usage?.completion_tokens || 0,
        totalTokens: data.usage?.total_tokens || 0
      }
    };
    
    // Return successful response in Gemini-compatible format
    res.status(200).json(geminiResponse);
    
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
};