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
