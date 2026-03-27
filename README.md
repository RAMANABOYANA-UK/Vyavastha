<div align="center">

# VYAVASTHA (व्यवस्था)
### AI-Powered Citizen Grievance Portal




</div>

---

##  The Problem

Every day, millions of citizens across India face:
-  Broken roads and dangerous potholes
-  Water supply failures and sewage leaks  
-  Power outages with no timeline for resolution
-  Overflowing garbage with no accountability

**Traditional complaint systems are broken.** Paper forms, zero transparency, no follow-up, no accountability.

**VYAVASTHA changes that.**

---

## ✨ What We Built

A full-stack, production-grade civic accountability platform with AI, 
real-time updates, and government workflow automation — built in 7 days.

###  For Citizens
| Feature | Description |
|---|---|
|  Smart Complaint Submission | Upload photos with AI auto-classification |
|  Image Authenticity Gate | 3-layer system rejects screenshots & AI-generated images |
|  Real-time Notifications | Instant Socket.io popups on status change |
|  Location Tracking | GPS-tagged complaints on interactive map |
|  Community Upvoting | Collective pressure for faster resolution |
|  Points & Rewards | Gamified civic participation |

###  For Government Officials
| Feature | Description |
|---|---|
|  Smart Dashboard | Assign, escalate, resolve with full ATR support |
|  AI Report Generation | Featherless AI writes professional ATR reports instantly |
|  Analytics Dashboard | Complaint trends by category, area, and department |
|  Miro Planning Board | Embedded department coordination workspace |
|  Auto Escalation | SLA-based cron job escalates overdue complaints automatically |

---

##  AI Features (Powered by Featherless AI)

```
Citizen types complaint
	   ↓
Featherless AI LLM analyzes text
	   ↓
┌─────────────────────────────────────┐
│ Category:   Road / Water / Electric │
│ Department: PWD / Water Board / BBMP│  
│ Severity:   Low / Medium / High / Urgent
│ Summary:    1-line professional summary
│ ATR:        Full resolution report  │
└─────────────────────────────────────┘
```

---

##  Image Authenticity Verification (3 Layers)

No fake complaints. No AI-generated evidence. Real photos only.

```
Upload Image
	│
	▼
Layer 1: EXIF Metadata Check
	│  ✓ Camera make, model, GPS coordinates
	│  ✗ No camera data = screenshot/AI image
	▼
Layer 2: Sightengine AI Detection  
	│  ✓ Real photo confirmed
	│  ✗ Screenshot / AI-generated = REJECTED
	▼
Layer 3: Sanity Check
	│  ✓ Size 20KB-15MB, min 400x400px
	│  ✗ Invalid format/size = REJECTED
	▼
✅ Verified Real Photo — Complaint Accepted
```

---

## ⚡ Real-time Architecture

```
Official updates complaint status
		 ↓
    Socket.io event fired
		 ↓
  Citizen's portal receives event
		 ↓
  Popup notification appears instantly
   "Your complaint has been resolved!"
```

---

##  Auto-Escalation System

No complaint falls through the cracks. Ever.

| Severity | Escalates After |
|---|---|
| 🔴 Urgent | 1 day |
| 🟠 High | 3 days |
| 🟡 Medium | 7 days |
| 🟢 Low | 14 days |

Runs automatically every midnight via `node-cron`. 
Citizens notified instantly when complaint is escalated.

---

## 🛠️ Tech Stack

### Sponsor Tools Used
| Tool | How We Used It |
|---|---|
| **Featherless AI** | LLM complaint classification, ATR generation, severity prediction |
| **Sightengine** | Screenshot and AI-image detection in complaint uploads |
| **Miro** | Embedded planning board in government admin dashboard |
| **DevSwarm** | Parallel AI-assisted development across features |

### Core Stack
```
Frontend:  React 18 + Vite + Tailwind CSS + Zustand
Backend:   Node.js + Express + MongoDB + Mongoose
Auth:      JWT + OTP + Role-based access control
Realtime:  Socket.io (user-room based notifications)
Jobs:      node-cron (escalation automation)
Upload:    Multer + 3-layer image verification
Deploy:    Docker + Vercel + Render
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

### Without Docker
```bash
# Install dependencies
npm install && npm run install:all

# Configure environment
cp backend/.env.example backend/.env
# Edit backend/.env with your values

# Run
npm run dev
```

### Environment Variables
```env
# Backend
PORT=5001
MONGODB_URI=mongodb://localhost:27017/vyavastha
JWT_SECRET=your_secret
FEATHERLESS_API_KEY=your_key
SIGHTENGINE_API_USER=your_user
SIGHTENGINE_API_SECRET=your_secret
MIRO_BOARD_URL=your_miro_embed_url

# Frontend
VITE_API_URL=http://localhost:5001/api
VITE_MIRO_BOARD_URL=your_miro_embed_url
```

---



⭐ Star this repo if you believe citizens deserve better governance

</div>





