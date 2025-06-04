import { useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({ host: '', user: '', password: '', database: '' });
  const [issues, setIssues] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleScan = async () => {
    setLoading(true);
    const res = await fetch('http://localhost:3001/api/scan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setIssues(data.issues || []);
    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Database Leak Scanner</h1>
      <input name="host" placeholder="Host" onChange={handleChange} /><br />
      <input name="user" placeholder="User" onChange={handleChange} /><br />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} /><br />
      <input name="database" placeholder="Database" onChange={handleChange} /><br />
      <button onClick={handleScan} disabled={loading}>{loading ? 'Scanning...' : 'Scan Database'}</button>
      {issues && (
        <div style={{ marginTop: 20 }}>
          <h2>Scan Results</h2>
          {issues.length === 0 ? <p>No issues found 🎉</p> : (
            <ul>
              {issues.map((issue, idx) => (
                <li key={idx}>{issue.table}.{issue.column}: {issue.issue}</li>
              ))}
            </ul>
          )}
        </div>
      )}
      <a href="/chat">Go to AI Assistant →</a>
    </div>
  );
}
