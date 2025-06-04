const express = require('express');
const cors = require('cors');
const { scan } = require('./crawler');
const { handleAgentQuery } = require('./agent');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/scan', async (req, res) => {
  try {
    const issues = await scan(req.body);
    res.json({ success: true, issues });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/agent', async (req, res) => {
  try {
    const { prompt, dbConfig } = req.body;
    const result = await handleAgentQuery(prompt, dbConfig);
    res.json({ success: true, ...result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3001, () => console.log('Backend listening on port 3001'));
