# MentalWave – Mental Health Sentiment Dashboard

MentalWave is a modern, interactive analytics dashboard that visualizes mental‑health related sentiment from social media–style streams.  
It focuses on making complex emotional trends easy to understand through clean UI, smooth animations, and clear data storytelling.

---

## 🌍 Who Is This For?

MentalWave is designed for:

- **Students and Hackathon teams** building analytics or mental‑health themed projects and needing a polished UI + architecture to start from.
- **Researchers and analysts** who want to experiment with sentiment‑style dashboards before plugging in real data sources.
- **Developers** learning how to structure a small full‑stack app (React front‑end + Node/Express mock API) with charts, live feeds, and routing.
- **Product designers** looking for a reference implementation of a modern, dark, glassmorphism dashboard UI.

Right now the app uses mock/generated data, but the structure is ready for integration with real NLP / social media APIs later.

---

## 💡 Problem It Solves

Mental health is often discussed online, but:

- The **signal is buried in noise** (millions of posts scattered across platforms).
- It’s hard to **see trends over time**: are things getting better or worse this week?
- Teams need a **quick way to prototype dashboards** before investing in full data pipelines.

MentalWave solves this by:

- Providing a **ready-made sentiment dashboard** with:
  - KPI cards for positive / negative / neutral sentiment.
  - Charts showing **sentiment over time**.
  - A **live feed** of posts that “stream” in with metadata (region, platform, confidence).
- Simulating realistic data so you can **demo, test, and iterate** without waiting for backend/integration work.
- Offering a clean **React + Express** structure you can easily extend with real APIs.

---

## ✨ Features

### 1. Dashboard Screen

- **Sentiment KPIs**  
  - Positive, Negative, Neutral percentages with animated counters.  
  - Circular progress rings and daily/weekly deltas (e.g. `+5.2%`).
- **Sentiment Over Time Chart**  
  - Area chart (Recharts) showing positive, negative, and neutral sentiment across:
    - Last 24 hours  
    - Last 7 days  
    - Last 30 days  
  - Custom tooltip and gradients for a polished look.
- **Trending Keywords Panel**
  - Top emotional keywords (e.g. *Anxious, Grateful, Overwhelmed*).  
  - Filter by **All / Positive / Negative**.  
  - Nice hover effects with subtle shine and pulse animations.
- **Geographic Sentiment**
  - Region cards (e.g. North America, Europe, India).  
  - Tone badges (positive / neutral / negative) with intensity bars.

### 2. Live Feed Screen

- **Streaming-style feed** of mental‑health related “posts”:
  - Each post includes:
    - Platform (Twitter / Reddit).
    - Sentiment badge.
    - Region, model confidence, engagement.
    - Relative time (e.g. `5m ago`).
- **Live / Pause Control**
  - Toggle real‑time generation of posts on or off.
  - Shows an approximate **posts per minute** rate.
- **Filtering & Search**
  - Filter by platform: `All / Twitter / Reddit`.
  - Filter by sentiment: `All / Positive / Negative / Neutral`.
  - Search box to highlight matches inside the post text.
- **Loading State + Empty State**
  - Skeleton cards while data “loads”.
  - Friendly “No posts found” message when filters match nothing.
- **Load More Button**
  - Appends more generated posts to the feed for scrolling demos.

### 3. About Screen

- **High-level explanation** of what the tool is about and why it exists.
- **Stats cards** for:
  - Posts analyzed per day (animated).
  - Accuracy.
  - Countries covered.
- **Feature highlights** (privacy by design, real-time intelligence, human‑centered AI, global reach).
- **How it works steps**:
  - Collect → Analyze → Aggregate → Visualize  
  - Expandable accordion style cards.

### 4. Global Shell / Layout

- **Sticky header** with:
  - Route‑aware page title (`Dashboard`, `Live Feed`, `About`).
  - Live indicator pill with a pulsing green dot.
- **Slide-in sidebar** for navigation on smaller viewports.
- **React Router** based navigation:
  - `/` – Dashboard  
  - `/live-feed` – Live Feed  
  - `/about` – About

---

## 🧱 Tech Stack

### Frontend

- **React** (functional components + hooks)
  - `useState`, `useEffect`, `useMemo` for state and derived data.
- **React Router v6**
  - `BrowserRouter`, `Routes`, `Route`, `Link`, `useLocation`.
- **Recharts**
  - `AreaChart`, `Area`, `ResponsiveContainer`, `CartesianGrid`, `XAxis`, `YAxis`, custom tooltip.
- **lucide-react**
  - Icon set for UI: sentiment, actions, navigation, status.
- **Inline CSS-in-JS style objects**
  - Modern dark/glassmorphism dashboard styling:
    - Blur, gradients, subtle borders, hover transforms and transitions.
  - No external CSS framework required.

### Backend (Mock API)

- **Node.js + Express** (single-file backend)
  - Simple JSON endpoints like:
    - `/api/dashboard/overview`
    - `/api/livefeed/posts`
    - `/api/about/stats`
  - Currently returns **mock/generated data**:
    - Randomized sentiment percentages.
    - Fake posts, regions, keywords.
  - Designed so you can easily swap in real services later (social APIs, NLP, DB).

> If you haven’t wired the frontend to the backend yet, the frontend can run purely on the mock data baked into the React components, and you can connect to the API later.

---

## 📂 Project Structure (High-level)

mentalwave/
├─ sr
/ │ ├─ App.jsx # Routing + layout s
ell │ ├─ S
reen/ │ │ ├─ Dashboard.jsx # Main analytics d
shboard │ │ ├─ LiveFeed.jsx # Streaming
tyle feed │ │ └─ About.jsx # About &
ow it work
│ └─ ... ├─ mental_health_api.js # Node/Express mock backe
d (single file)


You can rearrange as needed (e.g. extract components, hooks, etc.), but this layout is enough for a small demo.

---

## ⚙️ Installation & Setup

### 1. Prerequisites

- **Node.js** (v18+ recommended)
- **npm** or **yarn**
- Git (optional but recommended)

### 2. Clone the Repository

git clone https://github.com/Rajdeepsingh49/MentalWave.git
cd MentalWave


### 3. Install Frontend Dependencies

From the project root (where `package.json` lives):

npm install

or
yarn install


### 4. Run the Frontend
npm run dev

or if using CRA:
npm start


By default this typically runs on:

- Vite: `http://localhost:5173`
- CRA: `http://localhost:3000`

Check your console output to see the exact URL.

### 5. (Optional) Run the Backend Mock API

If you’re using the single-file Node backend (`mental_health_api.js`):

1. Install backend dependencies (if not already done):


If you haven’t added real fetch calls yet, everything will still work using the front‑end mock data.

---

## 🚀 How to Use the App

1. Run the frontend (and backend if configured).
2. Open the app in your browser.
3. Use the sidebar / header to navigate:
- **Dashboard** – see summarized KPIs, sentiment over time, top keywords, and regional patterns.
- **Live Feed** – watch posts stream in, filter by platform/sentiment, and search for terms.
- **About** – understand what MentalWave is doing and how it works at a high level.
4. Tweak the mock data or API to match whatever mental‑health or sentiment scenario you want to demo.

---

## 🔧 Extending the Project

Here are some ideas for next steps:

- **Hook up real data**:
- Connect to Twitter/X, Reddit APIs, or any text source.
- Pipe content through a sentiment/emotion model (e.g. your own ML backend).
- **Persist data**:
- Add a database (PostgreSQL, MongoDB, etc.) and store historical sentiment.
- **More charts**:
- Add additional views: sentiment by topic, time of day, age group (if available), etc.
- **Authentication & roles**:
- Restrict certain views for researchers / admins only.

The code is intentionally kept straightforward so it’s easy to refactor and grow.

---

## 🧑‍💻 Scripts

Update this section based on your exact `package.json`, but common ones are:

Start frontend dev server
npm run dev

Build production bundle
npm run build

Preview built app (if using Vite)
npm run preview


---

## 🤝 Contributing

Contributions, ideas, and feedback are welcome.

- Fork the repo
- Create a feature branch
- Open a pull request with a clear description of what you changed

If you spot any issues or have suggestions for improving the UI/UX, file an issue and describe what you’d like to see.

---

## 📄 License

This project is licensed under the **MIT License**.  
You’re free to use, modify, and adapt it for your own projects, learning, or demos.

---

## 🙋‍♂️ Author

- **Rajdeep Singh** – developer & designer of MentalWave  
- GitHub: `@Rajdeepsingh49`  


