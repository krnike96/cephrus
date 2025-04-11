const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');

dotenv.config();
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are KYBot, a helpful assistant that only answers questions related to Aadhaar eKYC, DigiLocker, UPI, OCEN microloans. Reply in simple English or Hindi.',
        },
        {
          role: 'user',
          content: message,
        },
      ],
    });

    const reply = response.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('OpenAI API Error:', error.message);
    res.status(500).json({ reply: 'Sorry, something went wrong on the server.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});