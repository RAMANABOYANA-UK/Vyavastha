# PRAJA - प्रजा | Project Requirements

## System Requirements

### Development Environment
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB**: v6.0 or higher (local) OR MongoDB Atlas (cloud)
- **OS**: Windows 10+, macOS 10.15+, or Linux

### External APIs Required
- **Google Gemini Vision API** (Free tier - 1500 requests/day)
  - Get API key at: https://aistudio.google.com/app/apikey
  - Model: `gemini-1.5-flash`

### Recommended IDE
- Visual Studio Code with extensions:
  - Tailwind CSS IntelliSense
  - ES7+ React/Redux/React-Native snippets
  - Prettier - Code formatter
  - ESLint

---

## Backend Dependencies

### Production Dependencies
| Package | Version | Description |
|---------|---------|-------------|
| express | ^4.18.2 | Web framework for Node.js |
| mongoose | ^8.0.0 | MongoDB object modeling |
| cors | ^2.8.5 | Cross-Origin Resource Sharing |
| dotenv | ^16.3.1 | Environment variables |
| bcryptjs | ^2.4.3 | Password hashing |
| jsonwebtoken | ^9.0.2 | JWT authentication |
| multer | ^1.4.5-lts.1 | File upload handling |
| express-validator | ^7.0.1 | Input validation |
| helmet | ^7.1.0 | Security headers |
| morgan | ^1.10.0 | HTTP request logger |
| express-rate-limit | ^7.1.5 | Rate limiting |
| nodemailer | ^6.9.0 | Email sending for OTP |

---

## Frontend Dependencies

### Production Dependencies
| Package | Version | Description |
|---------|---------|-------------|
| react | ^18.2.0 | UI library |
| react-dom | ^18.2.0 | React DOM renderer |
| react-router-dom | ^6.20.0 | Client-side routing |
| axios | ^1.6.2 | HTTP client |
| zustand | ^4.4.7 | State management |
| react-hot-toast | ^2.4.1 | Toast notifications |
| lucide-react | ^0.294.0 | Icon library |
| framer-motion | ^10.16.16 | Animations |
| html5-qrcode | ^2.3.8 | QR code scanner |

### Dev Dependencies
| Package | Version | Description |
|---------|---------|-------------|
| vite | ^5.0.8 | Build tool |
| @vitejs/plugin-react | ^4.2.1 | React plugin for Vite |
| tailwindcss | ^3.3.6 | Utility-first CSS framework |
| postcss | ^8.4.32 | CSS transformations |
| autoprefixer | ^10.4.16 | CSS vendor prefixes |

---

## Environment Variables

### Backend (.env)
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/praja
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=30d
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=/api
VITE_GEMINI_API_KEY=AIzaSy...your_gemini_api_key
```

---

## Installation Commands

```bash
# Clone repository
git clone https://github.com/Shendu09/Praja.git
cd Praja

# Install all dependencies (root, backend, frontend)
npm install

# Start MongoDB (Windows example)
mongod --dbpath "C:\data\db"

# Start development servers
npm run dev

# Or start individually:
cd backend && node server.js    # Backend on port 5001
cd frontend && npm run dev      # Frontend on port 5173
```

---

## Database Requirements

### MongoDB Collections
1. **users** - User accounts and profiles
   - Roles: citizen, official, admin
   - OTP verification support
   - Points/XP tracking

2. **complaints** - Complaint records
   - AI verification data
   - Geospatial location
   - Status timeline
   - ATR (Action Taken Report) history

3. **notifications** - User notifications

### Indexes Required
- `users.email` (unique)
- `users.phone` (unique)
- `complaints.complaintId` (unique)
- `complaints.location` (2dsphere - geospatial)
- `complaints.user` + `complaints.createdAt`
- `complaints.status` + `complaints.createdAt`
- `notifications.user` + `notifications.createdAt`

---

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/login` | User login |
| GET | `/api/auth/me` | Get current user |
| POST | `/api/otp/send` | Send OTP |
| POST | `/api/otp/verify` | Verify OTP |
| POST | `/api/auth/otp-login` | Login via OTP |

### Complaints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/complaints` | List all complaints |
| GET | `/api/complaints/my` | Get user's complaints |
| GET | `/api/complaints/nearby` | Get nearby complaints |
| GET | `/api/complaints/stats` | Get statistics |
| POST | `/api/complaints` | Create complaint (with AI) |
| GET | `/api/complaints/:id` | Get complaint details |
| PATCH | `/api/complaints/:id/status` | Update status |
| POST | `/api/complaints/:id/upvote` | Upvote complaint |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/notifications` | Get notifications |
| PUT | `/api/users/notifications/:id/read` | Mark as read |
| PUT | `/api/users/notifications/read-all` | Mark all as read |
| GET | `/api/users/leaderboard` | Get leaderboard |
| GET | `/api/users/stats` | Get user stats |

---

## AI Integration Requirements

### Google Gemini Vision API
- **Model**: `gemini-1.5-flash`
- **Endpoint**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`
- **Free Tier**: 1500 requests/day (no credit card required)
- **Get API Key**: https://aistudio.google.com/app/apikey

### AI Analysis Response Structure
```json
{
  "isCivicIssue": true,
  "category": "Road & Infrastructure",
  "severity": "High",
  "title": "Pothole on main road",
  "description": "Large pothole visible on road surface",
  "department": "PWD",
  "suggestedAction": "Immediate repair needed",
  "confidence": 89,
  "tags": ["road", "pothole", "damage"]
}
```

---

## User Roles & Permissions

### Citizen
- Register/Login with OTP
- Submit complaints with photos
- Track complaint status
- View community complaints
- Upvote issues
- Earn XP points
- Take civic quizzes
- Rate public services

### Government Official
- View assigned complaints
- Update complaint status
- Submit ATR (Action Taken Report)
- View complaint map locations
- Filter by priority/status

### Administrator
- Full system access
- View all complaints
- User management
- Analytics dashboard
- System configuration

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (responsive design)

---

## File Upload Requirements

- **Supported formats**: JPEG, JPG, PNG, WebP
- **Max file size**: 5MB per image (10MB for AI analysis)
- **Max files per request**: 5
- **Base64 encoding**: Required for AI analysis

---

## Security Requirements

- JWT token-based authentication
- Password hashing with bcryptjs
- Rate limiting (100 requests/15 min)
- CORS configuration
- Helmet security headers
- Input validation
- XSS protection

---

## Complaint Categories

1. 🗑️ Cleanliness Target Unit (Dirty Spot)
2. 🏔️ Garbage Dump
3. 🚛 Garbage Vehicle Not Arrived
4. 🔥 Burning of Garbage in Open Space
5. 🧹 Sweeping Not Done
6. 🗑️ Dustbins Not Cleaned
7. 🚽 Open Defecation
8. 💧 Overflow of Sewerage or Storm Water
9. 🌊 Stagnant Water on Road
10. 🏚️ Slum Area Not Clean
11. 🌿 Overgrown Vegetation on Road
12. 🐄 Stray Animals
13. 📋 Other

---

## Complaint Status Flow

```
PENDING → ACKNOWLEDGED → IN_PROGRESS → UNDER_INSPECTION → WORK_SCHEDULED → RESOLVED
                                                                      ↓
                                                                  REJECTED
```

---

## Testing

### Test Image Types
| Image | Expected Result |
|-------|-----------------|
| Pothole photo | Road & Infrastructure, High/Critical |
| Garbage dump | Waste Management, High |
| Broken streetlight | Electricity, Medium |
| Flooded road | Road & Infrastructure, Critical |
| Random selfie | isCivicIssue: false |
| Blank/dark image | isCivicIssue: false |

---

## Performance Requirements

- API response time: < 500ms
- AI analysis time: < 3 seconds
- Page load time: < 2 seconds
- Mobile-responsive design
- Offline demo mode support

---

Made with ❤️ for Smart India Hackathon 🇮🇳
- Password hashing (bcrypt with 12 rounds)
- Rate limiting (100 requests per 15 minutes)
- CORS whitelist configuration
- Helmet security headers
- Input validation and sanitization
