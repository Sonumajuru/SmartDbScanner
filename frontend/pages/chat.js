import { useState } from 'react';

export default function Chat() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState(null);
  const [form, setForm] = useState({ host: '', port: '', user: '', password: '', database: '' });

  const askAgent = async () => {
    const res = await fetch('http://localhost:3001/api/agent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, dbConfig: form }),
    });
    const data = await res.json();
    setResponse(data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>AI DB Assistant</h1>
      <textarea rows={4} value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Ask me about your DB security..." /><br />
      <input name="host" placeholder="Host" onChange={(e) => setForm({ ...form, host: e.target.value })} /><br />
      <input name="port" placeholder="Port" onChange={(e) => setForm({ ...form, port: e.target.value })} /><br />
      <input name="user" placeholder="User" onChange={(e) => setForm({ ...form, user: e.target.value })} /><br />
      <input name="password" placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} /><br />
      <input name="database" placeholder="Database" onChange={(e) => setForm({ ...form, database: e.target.value })} /><br />
      <button onClick={askAgent}>Ask Agent</button>
      {response && (
        <div style={{ marginTop: 20 }}>
          <h2>Instruction:</h2>
          <p>{response.instruction}</p>
          <h2>Issues Found:</h2>
          {response.issues?.length ? (
            <ul>
              {response.issues.map((i, idx) => <li key={idx}>{i.table}.{i.column}: {i.issue}</li>)}
            </ul>
          ) : <p>No issues found.</p>}
        </div>
      )}
    </div>
  );
}
