const { scan } = require('./crawler');
require("dotenv").config();
const OpenAI = require('openai');
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'sk-your-api-key-here',
});

async function handleAgentQuery(prompt, dbConfig) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are a database audit assistant. You help scan MySQL databases for potential security risks.' },
      { role: 'user', content: prompt }
    ]
  });

  const instruction = response.choices[0].message.content;
  const issues = await scan(dbConfig);
  return { instruction, issues };
}

module.exports = { handleAgentQuery };