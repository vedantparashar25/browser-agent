# PATHFINDER — "Your Destination, Our Path"

> Autonomous Voice & Text AI Browser Shopping & Booking Agent. "Your Destination, Our Path". Interprets real natural language intents, plans sub-tasks, navigates live websites with Playwright, streams real-time execution steps and browser screenshots, tracks historical price curves with upcoming sale predictions, enforces safe checkout checkpoints, and outputs clean structured recommendations with speech synthesis.

---

## 🌟 Key Features

1. **Voice-and-Text Input**:
   - Web Speech API integration (`SpeechRecognition`) with visual audio wave indicator and auto-submission on speech end.
   - Natural language queries like *"Find me the cheapest wireless earbuds under 2000 rupees with good reviews"* or *"Book a 7 PM table for 2 at an Italian restaurant near Indore this Saturday"*.
2. **Autonomous Browser Automation (Playwright)**:
   - Real Chromium engine executing browser primitives: `navigate`, `search`, `extractListings`, `readPageText`, and screenshot capture.
   - Anti-bot headers, custom User-Agents, and fast timeouts preventing hung demos.
3. **Live Transparency Panel (Judging Highlights)**:
   - Real-time step progress streamed over WebSocket (`ws://localhost:5000`).
   - Live Playwright browser viewport preview streaming base64 JPEG screenshots as pages load.
   - Collapsible raw event log with exact timestamps.
4. **Safety Guardrails & Checkpoint Handoff**:
   - The agent strictly halts before payment/credential submission.
   - Hands off control with a pre-filled, verified direct link for the user to safely complete checkout or confirm reservation.
5. **Clean Structured Result Cards & Speech Readback**:
   - Top-ranked pick with verified rating, reviews count, discount badge, why-this-one rationale, specs bullet points, and source attribution.
   - Comparison cards for verified runner-up alternatives.
   - Web Speech API (`SpeechSynthesis`) audio narration reading aloud the recommendation.
6. **Multi-Model & Zero-Hitch Hackathon Resilience**:
   - Supports **Anthropic Claude 3.5** (`ANTHROPIC_API_KEY`) and **Google Gemini** (`GEMINI_API_KEY`).
   - Includes a built-in intelligent fallback engine so that even if venue Wi-Fi drops or external APIs rate-limit on stage, the live browser execution and demo will never crash.

---

## 📁 Project Structure

```
browser agent/
├── server/                     # Node.js + Express + Playwright + WebSocket
│   ├── browser.js              # Playwright browser controller & action primitives
│   ├── agent.js                # LLM planning, tool loop & structured synthesizer
│   ├── server.js               # Express API & real-time WebSocket server
│   ├── package.json
│   └── .env                    # Environment configuration
├── client/                     # React 18 + Vite + Tailwind CSS Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx      # Header, voice toggle, WS status indicator
│   │   │   ├── QueryInput.jsx  # Mic button, speech recognition & demo presets
│   │   │   ├── Timeline.jsx    # Live step progress, browser preview, event logs
│   │   │   └── ResultCard.jsx  # Winner card, safe checkpoint, alternatives, speech
│   │   ├── App.jsx             # Main dashboard container
│   │   ├── index.css           # Tailwind base & custom glowing scrollbars
│   │   └── main.jsx
│   ├── package.json
│   └── tailwind.config.js
├── package.json                # Root project configuration
├── start-all.bat               # 1-Click launcher for Windows
└── README.md
```

---

## 🚀 Quick Start

### 1. Launch with One Click (Windows)
Double-click `start-all.bat` in the project root. This opens both the backend server and frontend client in separate terminal windows.

### 2. Or Launch Manually in 2 Terminals

**Terminal 1 — Backend:**
```bash
cd server
npm start
# Server running on http://localhost:5000 (WS on ws://localhost:5000)
```

**Terminal 2 — Frontend:**
```bash
cd client
npm run dev
# Vite dev server running on http://localhost:5173
```

Open **`http://localhost:5173`** in Google Chrome or Microsoft Edge (recommended for Web Speech API support).

---

## ⚙️ Environment Variables (`server/.env`)

Edit `server/.env` to configure your API keys (optional):

```env
PORT=5000
HEADLESS=true

# Optional: Add your Anthropic or Gemini keys for dynamic LLM extraction
ANTHROPIC_API_KEY=your_claude_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
```

*Note: If no API keys are provided, the agent runs in high-performance autonomous demo mode with live Playwright browsing and instant zero-latency ranking.*

---

## 🎤 Stage Demo Script (5-Minute Winning Pitch)

1. **Opening Hook**:
   - Click the **Mic** button and say:  
     *"Find me the cheapest wireless earbuds under 2000 rupees with good reviews"*  
     *(Or click the preset chip)*.
2. **Highlight the Autonomous Browser Action**:
   - Point the judges to the **Autonomous Agent Timeline** on the left.
   - Show how the agent autonomously initialized Chromium, navigated to search indexes, and extracted live pricing.
   - Show the **Live Playwright Viewport Preview** streaming live screenshots of the pages as the agent works.
3. **Showcase the Result Card**:
   - Show the structured recommendation card: product title, verified rating (4.3+), price, and the **"Why this one"** reasoning.
   - Notice the speech synthesis reading aloud the top pick.
4. **Demonstrate Refinement (Agent Refinement Test)**:
   - Click or speak: *"Refine: Actually make it under 1500 rupees"*.
   - Watch the agent filter constraints and select the boAt Airdopes 141 ANC at ₹1,299 without restarting from scratch.
5. **Showcase Safety & Source Verification**:
   - Highlight the **Safe Handoff Boundary Enforced** badge.
   - Click **"View & Continue on Amazon"** to prove the link goes directly to the live verified item.
