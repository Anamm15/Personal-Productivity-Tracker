# 🚀 Productivity & Goal Tracker

**Ascend** is not just another to-do list app. It is a holistic productivity platform designed to help users bridge the gap between daily tasks and long-term life goals.
Built entirely on the **Next.js** ecosystem, it combines granular task management with high-level goal tracking, visualization, and customizable aesthetics to keep users motivated.

---

## 🌟 Key Features

### 🎯 Goal & Milestone Tracking
- **Structured Goals:** Define long-term goals with specific time ranges.
- **Milestone System:** Break down big goals into achievable milestones.
- **Visual Progress:** Real-time percentage (%) bars to track how close you are to completion.
- **Reward System:** Set specific rewards for yourself upon reaching a goal to maintain motivation.

### ✅ Daily Task Management
- **Smart Logging:** Quickly capture daily to-dos.
- **Browser Push Notifications:** Custom reminder settings to ensure you never miss a deadline, even when the tab is closed.

### 🎨 Visuals & Customization
- **Real-time Timeline:** A dynamic timeline view to visualize your schedule and deadlines.
- **Theme Customization:** Personalize the look and feel of specific goals or tasks (color coding, icons) to match your mental model.

---

## 🛠️ Tech Stack

This project utilizes a modern, type-safe stack for maximum performance and developer experience.

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Fullstack Framework** | ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white) | Handles both Frontend UI and Backend API routes |
| **Database** | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white) | Robust relational database for structured data |
| **ORM** | ![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=flat&logo=drizzle&logoColor=black) | Lightweight, type-safe TypeScript ORM |
| **Notifications** | **Service Workers** | Native browser Push API implementation |

---

## 💡 Future Roadmap

I have an ambitious roadmap to transform Ascend into an AI-powered productivity assistant.

### 🧠 AI Integration
- **Smart Performance Reports:** AI-generated weekly/monthly summaries analyzing productivity trends.
- **AI Goal Planner:** A chatbot assistant that helps break down vague goals into actionable steps.
- **Procrastination Insights:** Intelligent analysis to identify *why* certain tasks are repeatedly delayed.

### ⚡ Productivity Tools
- **Pomodoro Focus Mode:** Built-in timer with ambient soundscapes for deep work sessions.
- **Recurring Tasks:** Support for scheduled repetitions (daily, weekly, custom).

### 📱 Expansion
- **Mobile Application:** Native experience for iOS and Android (via React Native or PWA).

---

## 📦 How to Run

Follow these steps to set up the project locally.

### Prerequisites
- Node.js & npm/pnpm
- PostgreSQL database URL

### 1️⃣ Clone the Repository
```bash
git clone [https://github.com/yourusername/ascend-tracker.git](https://github.com/yourusername/ascend-tracker.git)
```

### 2️⃣ Program Setup
```bash
# Create a .env file based on example
cp .env.example .env

# Install dependencies
npm install

# Push schema to database using Drizzle
npm run db:push

# Run program
npm run dev
```

---

## 🧑‍💻 Author
Choirul Anam
Computer Science student exploring full-stack development, backend architecture, and distributed systems.

---

## 📄 License
This project is open source and free to use for learning and educational purposes.
