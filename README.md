# 🎓 Student Planner - Complete Full Stack Application

## ✅ 100% Windows Compatible - No Build Tools Needed!

A beautiful, fully functional student planner with React frontend and Express backend using **sql.js** (pure JavaScript SQLite - no compilation required).

---

## 🚀 Quick Start (3 Steps)

### Step 1: Install All Dependencies

```powershell
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
```

### Step 2: Initialize Database

```powershell
# Still in backend folder
npm run init-db
```

You'll see:
- ✅ Tables created successfully
- ✅ Demo data inserted successfully
- 💾 Database saved

### Step 3: Start Everything

**Terminal 1 - Start Backend:**
```powershell
# In backend folder
npm start
```

**Terminal 2 - Start Frontend:**
```powershell
# Go back to root folder
cd ..
npm run dev
```

**Open browser to:** http://localhost:5173

---

## 📧 Login Credentials

- **Email:** alex@example.com
- **Password:** demo123

---

## ✨ All Features Working

### 🏠 Landing Page
- Beautiful hero section
- Feature highlights
- Smooth animations
- Sign up / Login

### 📊 Dashboard
- Real-time stats (tasks, study hours, GPA, streak)
- Upcoming deadlines
- Quick actions
- Course progress
- Motivational tips

### ⏰ Deadline Tracker
- Add/edit/delete tasks
- Priority levels (High, Medium, Low)
- Due date management
- Task completion
- Filter by status

### 📚 Study Planner
- Pomodoro timer (25min focus / 5min break)
- Session tracking
- Progress visualization
- Auto-switching modes
- Session counter

### 📈 GPA Calculator
- Add courses with credits
- Letter grade input (A+, A, B+, etc.)
- Automatic GPA calculation
- Edit/delete courses
- Real-time updates

### 📝 Notes Organizer
- Create/edit/delete notes
- Subject categorization
- Tags system
- Rich text content
- Search functionality

### 📊 Progress Tracking
- Study time by subject
- Visual charts
- Recent sessions
- Performance analytics

### 🧘 Wellbeing
- Mood tracking
- Sleep hours logging
- Stress level monitoring
- Daily notes
- Trend visualization

### ⚙️ Settings
- Theme selection
- Notification preferences
- Study reminders
- Profile management

---

## 🛠️ Tech Stack

**Frontend:**
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Lucide React (icons)
- Recharts (data visualization)
- Vite (build tool)

**Backend:**
- Node.js
- Express.js
- sql.js (SQLite - pure JavaScript, no compilation!)
- UUID (ID generation)
- CORS enabled

---

## 📁 Project Structure

```
student-planner-complete/
├── src/                       # Frontend React app
│   ├── components/           # Reusable components
│   │   ├── Navigation.tsx    # Sidebar navigation
│   │   ├── StatCard.tsx      # Dashboard stat cards
│   │   └── ui/               # UI components
│   ├── pages/                # All page components
│   │   ├── Landing.tsx       # Landing page
│   │   ├── SignUp.tsx        # Registration
│   │   ├── Dashboard.tsx     # Main dashboard
│   │   ├── DeadlineTracker.tsx
│   │   ├── StudyPlanner.tsx
│   │   ├── GPACalculator.tsx
│   │   ├── NotesOrganizer.tsx
│   │   ├── Progress.tsx
│   │   ├── Wellbeing.tsx
│   │   └── Settings.tsx
│   └── App.tsx               # Main app component
├── backend/                   # Express server
│   ├── server.js             # API server
│   ├── initDb.js             # Database setup
│   ├── package.json          # Backend dependencies
│   └── planner.db            # SQLite database (auto-created)
├── package.json              # Frontend dependencies
└── README.md                 # This file
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration

### Tasks/Deadlines
- `GET /api/tasks/:userId` - Get all tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Courses
- `GET /api/courses/:userId` - Get all courses
- `POST /api/courses` - Create course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Study Sessions
- `GET /api/study-sessions/:userId` - Get all sessions
- `POST /api/study-sessions` - Create session
- `DELETE /api/study-sessions/:id` - Delete session

### Notes
- `GET /api/notes/:userId` - Get all notes
- `POST /api/notes` - Create note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

### Dashboard Stats
- `GET /api/dashboard/:userId` - Get dashboard data

### Progress
- `GET /api/progress/:userId` - Get progress analytics

### Wellbeing
- `GET /api/wellbeing/:userId` - Get wellbeing entries
- `POST /api/wellbeing` - Create wellbeing entry

### Settings
- `GET /api/settings/:userId` - Get user settings
- `PUT /api/settings/:userId` - Update settings

---

## 🎯 Available Scripts

### Frontend (Root Directory)
```powershell
npm run dev      # Start development server (http://localhost:5173)
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Check code quality
```

### Backend (backend/ directory)
```powershell
npm start        # Start server (http://localhost:3001)
npm run dev      # Start with auto-reload
npm run init-db  # Initialize/reset database
```

---

## 🐛 Troubleshooting

### Port Already in Use

**Backend (3001):**
```powershell
# PowerShell (as Administrator)
Stop-Process -Id (Get-NetTCPConnection -LocalPort 3001).OwningProcess -Force
```

**Frontend (5173):**
Vite will automatically use 5174, 5175, etc.

### Database Not Found
```powershell
cd backend
npm run init-db
```

### Module Not Found
```powershell
# Clean reinstall frontend
rm -r node_modules
npm install

# Clean reinstall backend
cd backend
rm -r node_modules
npm install
```

### CORS Errors
Make sure backend is running on port 3001. The frontend is configured to connect to this port.

---

## 💻 Development Workflow

### Daily Development:
1. Open project in VS Code
2. Open terminal (Ctrl + `)
3. Start backend: `cd backend && npm start`
4. Open new terminal (Ctrl + Shift + `)
5. Start frontend: `npm run dev`
6. Open http://localhost:5173
7. Code and save (auto-reloads!)

### Adding New Features:

**Frontend:**
1. Create component in `src/components/` or page in `src/pages/`
2. Add to App.tsx routing if needed
3. Update Navigation.tsx if adding new page

**Backend:**
1. Add route in `server.js`
2. Add database table in `initDb.js` if needed
3. Run `npm run init-db` to recreate database

---

## 🎨 Customization

### Change Theme Colors

Edit `tailwind.config.js`:
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#8B5CF6',  // Purple
        secondary: '#EC4899', // Pink
      }
    }
  }
}
```

### Change Backend Port

Create `backend/.env`:
```env
PORT=3002
```

Then update frontend API calls to match.

---

## 🔒 Security Notes

**⚠️ This is a demo/learning application:**
- Passwords stored in plain text
- No encryption
- Single-user local database
- CORS fully open
- No rate limiting

**For production, add:**
- Password hashing (bcrypt)
- JWT authentication
- HTTPS/SSL
- Environment variables
- Input validation
- Rate limiting
- Proper error handling

---

## 📊 Database Schema

### users
- id (PRIMARY KEY)
- name
- email (UNIQUE)
- password
- created_at

### tasks
- id (PRIMARY KEY)
- user_id (FOREIGN KEY)
- title
- due_date
- priority (high, medium, low)
- type (task, exam, assignment, reading)
- completed (0 or 1)

### courses
- id (PRIMARY KEY)
- user_id (FOREIGN KEY)
- name
- code
- credits
- grade (A+, A, B+, etc.)

### study_sessions
- id (PRIMARY KEY)
- user_id (FOREIGN KEY)
- subject
- duration (minutes)
- date
- notes

### notes
- id (PRIMARY KEY)
- user_id (FOREIGN KEY)
- subject
- title
- content
- tags
- created_at
- updated_at

### wellbeing
- id (PRIMARY KEY)
- user_id (FOREIGN KEY)
- date
- mood
- sleep_hours
- stress_level
- notes

### settings
- user_id (PRIMARY KEY)
- theme
- notifications
- study_reminder
- break_reminder

---

## 🆘 Need Help?

### Common Issues:

1. **"Cannot find module"**
   - Run `npm install` in both root and backend folders

2. **"Database not found"**
   - Run `npm run init-db` in backend folder

3. **"Port already in use"**
   - Kill the process or change the port

4. **Frontend can't connect to backend**
   - Make sure backend is running on port 3001
   - Check browser console for errors

### Still Stuck?

1. Check Node.js version: `node --version` (should be 18+)
2. Clear npm cache: `npm cache clean --force`
3. Delete node_modules and reinstall
4. Restart VS Code

---

## 🎓 Learning Resources

- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

---

## 📄 License

MIT License - Free to use for learning and personal projects!

---

## 🎉 Features Checklist

After setup, verify everything works:

- ✅ Landing page loads
- ✅ Can sign up / log in
- ✅ Dashboard shows stats
- ✅ Can add/edit/delete tasks
- ✅ Pomodoro timer works
- ✅ Can calculate GPA
- ✅ Can create notes
- ✅ Progress charts display
- ✅ Wellbeing tracking works
- ✅ Settings can be changed
- ✅ Navigation works smoothly
- ✅ Data persists after refresh

---

**Happy Studying! 📚✨**

*Built with ❤️ for students who want to stay organized*
