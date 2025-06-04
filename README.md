# 🛡️ AI-Powered MySQL Leak Scanner & Chat Assistant

A security-oriented tool to **scan MySQL databases** for potential leaks (e.g., plain-text passwords), and query an **AI assistant** (powered by OpenAI) for custom database audit instructions.

Built with:
- 🧠 OpenAI GPT-4 (as audit agent)
- ⚙️ Node.js + Express backend
- 🌐 React + Next.js frontend
- 🐳 Docker for full-stack containerization

---

## 🚀 Features

- 🔍 Scan any MySQL DB for insecure patterns (e.g., unencrypted sensitive columns)
- 🤖 Use AI Assistant to analyze, audit, and explain database issues
- 🖥️ Clean web UI for scanning and chatting
- 🧱 Easy Docker & local setup

---

## 📸 Screenshots

### 📄 Leak Scanner UI

---

## 🧩 Folder Structure

```text
├── backend/
│   ├── crawler.js       # Scans database for leaks
│   ├── server.js        # Express backend
│   └── agent.js         # OpenAI integration
├── frontend/
│   └── pages/
│       ├── index.js     # Main scan UI
│       └── chat.js      # AI agent UI
├── Dockerfile
├── docker-compose.yml
└── package.json
```
---

## 🔧 Local Setup (No Docker)

### 1. Clone & Install
```bash
git clone https://github.com/your-repo/db-leak-scanner.git
cd db-leak-scanner
npm install
```

### 2. Run Backend
```bash
node backend/server.js
```


### 3. Run Frontend
```bash
cd frontend
npx next dev -p 3000
```
---

## 🔧 Local Setup (With Docker)


### 1. Add OpenAI key
```bash
export OPENAI_API_KEY=your-key-here
```

### 2. Build & Run
```bash
docker-compose up --build
```

### 3. Access App
```bash
Scanner UI: http://localhost:3000
AI Assistant: http://localhost:3000/chat
```

## Contributing

Feel free to use, modify, and contribute to this project! If you'd like to suggest changes, fix bugs, or add new features:

1. **Fork** the repository
2. **Create** a new branch (`git checkout -b feature-name`)
3. **Commit** your changes (`git commit -am 'Add some feature'`)
4. **Push** to the branch (`git push origin feature-name`)
5. **Create a Pull Request**

Your contributions are welcome and appreciated!
