<div align="center">

# VYAVASTHA (व्यवस्था)
### AI-Powered Citizen Grievance Portal

</div>

---

##  The Problem

Every day, millions of citizens worldwide face:
-  Broken roads and dangerous potholes
-  Water supply failures and sewage leaks
-  Power outages with no resolution timeline
-  Overflowing garbage with zero accountability

**Civic complaint systems are broken everywhere.**
Paper forms, zero transparency, no follow-up, no accountability.

**VYAVASTHA changes that — for every citizen, in every city, across the world.**

---

##  Features

###  For Citizens
| Feature | Description |
|---|---|
|  Smart Complaint Submission | Upload photos with AI auto-classification |
|  Image Authenticity Gate | 3-layer system rejects AI-generated fake images |
|  Real-time Notifications | Instant Socket.io popups on every status change |
|  Location Detection | GPS-tagged complaints with auto-detected address |
|  Community Upvoting | Collective pressure for faster resolution |
|  Points & Rewards | Gamified civic participation system |
|  25 Languages | Full multilingual support for global accessibility |
|  Complaint Tracking | Submitted → Assigned → In Progress → Resolved |

### 🏛️ For Government Officials
| Feature | Description |
|---|---|
|  Smart Dashboard | Assign, escalate, resolve with full workflow |
|  AI ATR Generation | Featherless AI writes professional reports instantly |
|  Analytics Dashboard | Complaint trends by category, area, department |
|  Miro Planning Board | Embedded department coordination workspace |
|  Auto Escalation | SLA-based cron job escalates overdue complaints |

---

## 🛡️ Image Authenticity Verification (3 Layers)

No fake complaints. No AI-generated evidence. Real images only.
```
Upload Image
     │
     ▼
Layer 1: EXIF Metadata Check
     │  ✓ Camera make, model, GPS — real photo
     │  ✗ No metadata — suspicious
     ▼
Layer 2: Sightengine AI Detection
     │  ✓ Real photo confirmed
     │  ✗ AI-generated → REJECTED ❌
     ▼
Layer 3: Sanity Check
     │  ✓ 20KB–15MB, min 400x400px, JPG/PNG/WebP
     │  ✗ Invalid → REJECTED ❌
     ▼
 Verified — Complaint Accepted
```

---

##  AI Classification (Featherless AI)
```
Citizen types: "Large pothole on main road near school"
                          ↓
              Featherless AI LLM analyzes
                          ↓
┌─────────────────────────────────────────┐
│ Category:   Road                        │
│ Department: PWD                         │
│ Severity:   High                        │
│ Summary:    Pothole posing safety risk  │
│ ETA:        3 days resolution           │
└─────────────────────────────────────────┘
```

---

## ⚡ Real-Time Notifications (Socket.io)
```
Official marks complaint → Resolved
           ↓
    Socket.io event fired
           ↓
  Citizen portal receives event instantly
           ↓
   Popup: "Your complaint has been resolved!"
```

---

##  Auto-Escalation (node-cron)

No complaint is ever ignored. Runs every midnight automatically.

| Severity | Escalates After |
|---|---|
| 🔴 Urgent | 1 day |
| 🟠 High | 3 days |
| 🟡 Medium | 7 days |
| 🟢 Low | 14 days |

---

##  Multilingual Support

VYAVASTHA supports 25 languages including:
Hindi, Tamil, Kannada, Bengali, Marathi, Gujarati,
Spanish, French, German, Italian, Portuguese,
Japanese, Korean, Chinese, Arabic, and more.

---

## 🛠️ Tech Stack

### Sponsor Tools
| Tool | Usage |
|---|---|
| **Featherless AI** | LLM complaint classification, ATR generation, severity prediction |
| **Sightengine** | AI-image detection in complaint uploads |
| **Miro** | Embedded planning board in government admin dashboard |
| **DevSwarm** | Parallel AI-assisted development across features |

### Core Stack
```
Frontend:   React 18 + Vite + Tailwind CSS + Zustand
Backend:    Node.js + Express + MongoDB + Mongoose
Auth:       JWT + OTP + Role-based access control
Realtime:   Socket.io (user-room notifications)
Jobs:       node-cron (escalation automation)
Upload:     Multer + 3-layer image verification
AI:         FastAPI + CLIP + PyTorch + Featherless AI
Deploy:     Docker + Vercel + Render
i18n:       i18next + react-i18next (25 languages)
```

---

##  Quick Start

### With Docker (Recommended)
```bash
git clone https://github.com/RAMANABOYANA-UK/Vyavastha.git
cd Vyavastha
docker compose up --build -d
```

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:5001/api |
| AI Analyzer | http://localhost:8000 |
```bash
# Useful commands
docker compose ps        # check status
docker compose logs -f   # view logs
docker compose down      # stop all
```

### Without Docker
```bash
# Install all dependencies
npm install && npm run install:all

# Configure backend
cp backend/.env.example backend/.env
# Edit backend/.env with your values

# Run everything
npm run dev
```

### Environment Variables

**Backend `.env`:**
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/vyavastha
JWT_SECRET=your_super_secret
JWT_EXPIRE=30d
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
FEATHERLESS_API_KEY=your_featherless_key
SIGHTENGINE_API_USER=your_sightengine_user
SIGHTENGINE_API_SECRET=your_sightengine_secret
MIRO_BOARD_URL=your_miro_embed_url
```

**Frontend `.env`:**
```env
VITE_API_URL=http://localhost:5001/api
VITE_ANALYZE_URL=http://localhost:8000
VITE_MIRO_BOARD_URL=your_miro_embed_url
```

---

## 📁 Project Structure
```
Vyavastha/
├─ backend/
│  ├─ controllers/      # Route controllers
│  ├─ models/           # Mongoose models
│  ├─ routes/           # Express routes
│  ├─ services/         # AI, notification services
│  ├─ middleware/       # Auth, image verification
│  └─ jobs/             # Escalation cron jobs
├─ frontend/
│  ├─ src/
│  │  ├─ components/    # Reusable components
│  │  ├─ screens/       # Route pages
│  │  ├─ locales/       # 25 language translations
│  │  └─ store/         # Zustand state
├─ analyze_service/     # Python CLIP image analyzer
└─ docker-compose.yml
```

---

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Run frontend + backend together |
| `npm run build` | Build frontend for production |
| `npm run start` | Start backend in production mode |
| `npm run install:all` | Install all dependencies |


---

</div>
