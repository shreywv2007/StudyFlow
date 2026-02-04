import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import initSqlJs from 'sql.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Database setup
let db;
const dbPath = join(__dirname, 'planner.db');

async function initDatabase() {
  const SQL = await initSqlJs();
  
  if (existsSync(dbPath)) {
    const buffer = readFileSync(dbPath);
    db = new SQL.Database(buffer);
    console.log('✅ Database loaded from file');
  } else {
    db = new SQL.Database();
    console.log('⚠️  No database found. Run: npm run init-db');
  }
}

function saveDatabase() {
  const data = db.export();
  const buffer = Buffer.from(data);
  writeFileSync(dbPath, buffer);
}

function runQuery(sql, params = []) {
  try {
    db.run(sql, params);
    saveDatabase();
  } catch (error) {
    throw error;
  }
}

function getOne(sql, params = []) {
  try {
    const stmt = db.prepare(sql);
    stmt.bind(params);
    if (stmt.step()) {
      const row = stmt.getAsObject();
      stmt.free();
      return row;
    }
    stmt.free();
    return null;
  } catch (error) {
    throw error;
  }
}

function getAll(sql, params = []) {
  try {
    const stmt = db.prepare(sql);
    stmt.bind(params);
    const results = [];
    while (stmt.step()) {
      results.push(stmt.getAsObject());
    }
    stmt.free();
    return results;
  } catch (error) {
    throw error;
  }
}

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ==================== AUTH ROUTES ====================

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = getOne('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
    
    if (user) {
      res.json({ 
        success: true, 
        user: { id: user.id, name: user.name, email: user.email }
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/auth/signup', (req, res) => {
  const { name, email, password } = req.body;
  const userId = uuidv4();
  
  try {
    runQuery('INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)', 
      [userId, name, email, password]);
    
    res.json({ 
      success: true, 
      user: { id: userId, name, email }
    });
  } catch (error) {
    res.status(400).json({ success: false, message: 'User already exists' });
  }
});

// ==================== TASKS/DEADLINES ====================

app.get('/api/tasks/:userId', (req, res) => {
  const { userId } = req.params;
  
  try {
    const tasks = getAll('SELECT * FROM tasks WHERE user_id = ? ORDER BY due_date ASC', [userId]);
    res.json(tasks.map(t => ({ ...t, completed: Boolean(t.completed) })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/tasks', (req, res) => {
  const { userId, title, dueDate, priority, type } = req.body;
  const taskId = uuidv4();
  
  try {
    runQuery(
      'INSERT INTO tasks (id, user_id, title, due_date, priority, type, completed) VALUES (?, ?, ?, ?, ?, ?, 0)',
      [taskId, userId, title, dueDate, priority || 'medium', type || 'task']
    );
    
    const task = getOne('SELECT * FROM tasks WHERE id = ?', [taskId]);
    res.json({ ...task, completed: Boolean(task.completed) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, dueDate, priority, completed } = req.body;
  
  try {
    const updates = [];
    const values = [];
    
    if (title !== undefined) { updates.push('title = ?'); values.push(title); }
    if (dueDate !== undefined) { updates.push('due_date = ?'); values.push(dueDate); }
    if (priority !== undefined) { updates.push('priority = ?'); values.push(priority); }
    if (completed !== undefined) { updates.push('completed = ?'); values.push(completed ? 1 : 0); }
    
    values.push(id);
    runQuery(`UPDATE tasks SET ${updates.join(', ')} WHERE id = ?`, values);
    
    const task = getOne('SELECT * FROM tasks WHERE id = ?', [id]);
    res.json({ ...task, completed: Boolean(task.completed) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/tasks/:id', (req, res) => {
  try {
    runQuery('DELETE FROM tasks WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== COURSES/GPA ====================

app.get('/api/courses/:userId', (req, res) => {
  try {
    const courses = getAll('SELECT * FROM courses WHERE user_id = ? ORDER BY created_at DESC', [req.params.userId]);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/courses', (req, res) => {
  const { userId, name, code, credits, grade } = req.body;
  const courseId = uuidv4();
  
  try {
    runQuery(
      'INSERT INTO courses (id, user_id, name, code, credits, grade) VALUES (?, ?, ?, ?, ?, ?)',
      [courseId, userId, name, code, credits, grade]
    );
    
    const course = getOne('SELECT * FROM courses WHERE id = ?', [courseId]);
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/courses/:id', (req, res) => {
  const { id } = req.params;
  const { name, code, credits, grade } = req.body;
  
  try {
    const updates = [];
    const values = [];
    
    if (name !== undefined) { updates.push('name = ?'); values.push(name); }
    if (code !== undefined) { updates.push('code = ?'); values.push(code); }
    if (credits !== undefined) { updates.push('credits = ?'); values.push(credits); }
    if (grade !== undefined) { updates.push('grade = ?'); values.push(grade); }
    
    values.push(id);
    runQuery(`UPDATE courses SET ${updates.join(', ')} WHERE id = ?`, values);
    
    const course = getOne('SELECT * FROM courses WHERE id = ?', [id]);
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/courses/:id', (req, res) => {
  try {
    runQuery('DELETE FROM courses WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== STUDY SESSIONS ====================

app.get('/api/study-sessions/:userId', (req, res) => {
  try {
    const sessions = getAll('SELECT * FROM study_sessions WHERE user_id = ? ORDER BY date DESC', [req.params.userId]);
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/study-sessions', (req, res) => {
  const { userId, subject, duration, date, notes } = req.body;
  const sessionId = uuidv4();
  
  try {
    runQuery(
      'INSERT INTO study_sessions (id, user_id, subject, duration, date, notes) VALUES (?, ?, ?, ?, ?, ?)',
      [sessionId, userId, subject, duration || 25, date || new Date().toISOString().split('T')[0], notes || '']
    );
    
    const session = getOne('SELECT * FROM study_sessions WHERE id = ?', [sessionId]);
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/study-sessions/:id', (req, res) => {
  try {
    runQuery('DELETE FROM study_sessions WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== NOTES ====================

app.get('/api/notes/:userId', (req, res) => {
  try {
    const notes = getAll('SELECT * FROM notes WHERE user_id = ? ORDER BY updated_at DESC', [req.params.userId]);
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/notes', (req, res) => {
  const { userId, subject, title, content, tags } = req.body;
  const noteId = uuidv4();
  const now = new Date().toISOString();
  
  try {
    runQuery(
      'INSERT INTO notes (id, user_id, subject, title, content, tags, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [noteId, userId, subject, title, content || '', tags || '', now, now]
    );
    
    const note = getOne('SELECT * FROM notes WHERE id = ?', [noteId]);
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  const { subject, title, content, tags } = req.body;
  const now = new Date().toISOString();
  
  try {
    const updates = ['updated_at = ?'];
    const values = [now];
    
    if (subject !== undefined) { updates.push('subject = ?'); values.push(subject); }
    if (title !== undefined) { updates.push('title = ?'); values.push(title); }
    if (content !== undefined) { updates.push('content = ?'); values.push(content); }
    if (tags !== undefined) { updates.push('tags = ?'); values.push(tags); }
    
    values.push(id);
    runQuery(`UPDATE notes SET ${updates.join(', ')} WHERE id = ?`, values);
    
    const note = getOne('SELECT * FROM notes WHERE id = ?', [id]);
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/notes/:id', (req, res) => {
  try {
    runQuery('DELETE FROM notes WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== PROGRESS/STATS ====================

app.get('/api/dashboard/:userId', (req, res) => {
  const { userId } = req.params;
  
  try {
    // Total tasks
    const totalTasks = getOne('SELECT COUNT(*) as count FROM tasks WHERE user_id = ?', [userId]);
    const completedTasks = getOne('SELECT COUNT(*) as count FROM tasks WHERE user_id = ? AND completed = 1', [userId]);
    
    // Study hours this week
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekAgoStr = weekAgo.toISOString().split('T')[0];
    
    const weeklyHours = getOne(
      'SELECT SUM(duration) as total FROM study_sessions WHERE user_id = ? AND date >= ?',
      [userId, weekAgoStr]
    );
    
    // Current GPA
    const courses = getAll('SELECT credits, grade FROM courses WHERE user_id = ?', [userId]);
    let totalPoints = 0;
    let totalCredits = 0;
    
    const gradePoints = {
      'A+': 4.0, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'F': 0.0
    };
    
    courses.forEach(course => {
      const points = gradePoints[course.grade] || 0;
      totalPoints += points * course.credits;
      totalCredits += course.credits;
    });
    
    const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
    
    // Upcoming tasks
    const today = new Date().toISOString().split('T')[0];
    const upcomingTasks = getAll(
      'SELECT * FROM tasks WHERE user_id = ? AND due_date >= ? AND completed = 0 ORDER BY due_date ASC LIMIT 5',
      [userId, today]
    );
    
    res.json({
      tasksDone: completedTasks.count,
      totalTasks: totalTasks.count,
      studyHours: ((weeklyHours.total || 0) / 60).toFixed(1),
      gpa: parseFloat(gpa),
      streak: 7,
      upcomingTasks: upcomingTasks.map(t => ({ ...t, completed: Boolean(t.completed) }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/progress/:userId', (req, res) => {
  const { userId } = req.params;
  
  try {
    const studyTimeBySubject = getAll(
      'SELECT subject, SUM(duration) as total FROM study_sessions WHERE user_id = ? GROUP BY subject',
      [userId]
    );
    
    const recentSessions = getAll(
      'SELECT * FROM study_sessions WHERE user_id = ? ORDER BY date DESC LIMIT 10',
      [userId]
    );
    
    res.json({
      studyTimeBySubject,
      recentSessions
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== WELLBEING ====================

app.get('/api/wellbeing/:userId', (req, res) => {
  try {
    const entries = getAll(
      'SELECT * FROM wellbeing WHERE user_id = ? ORDER BY date DESC LIMIT 30',
      [req.params.userId]
    );
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/wellbeing', (req, res) => {
  const { userId, mood, sleepHours, stressLevel, notes } = req.body;
  const entryId = uuidv4();
  const date = new Date().toISOString().split('T')[0];
  
  try {
    runQuery(
      'INSERT INTO wellbeing (id, user_id, date, mood, sleep_hours, stress_level, notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [entryId, userId, date, mood, sleepHours || 7, stressLevel || 5, notes || '']
    );
    
    const entry = getOne('SELECT * FROM wellbeing WHERE id = ?', [entryId]);
    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== SETTINGS ====================

app.get('/api/settings/:userId', (req, res) => {
  try {
    const settings = getOne('SELECT * FROM settings WHERE user_id = ?', [req.params.userId]);
    res.json(settings || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/settings/:userId', (req, res) => {
  const { userId } = req.params;
  const { theme, notifications, studyReminder, breakReminder } = req.body;
  
  try {
    const existing = getOne('SELECT * FROM settings WHERE user_id = ?', [userId]);
    
    if (existing) {
      const updates = [];
      const values = [];
      
      if (theme !== undefined) { updates.push('theme = ?'); values.push(theme); }
      if (notifications !== undefined) { updates.push('notifications = ?'); values.push(notifications ? 1 : 0); }
      if (studyReminder !== undefined) { updates.push('study_reminder = ?'); values.push(studyReminder ? 1 : 0); }
      if (breakReminder !== undefined) { updates.push('break_reminder = ?'); values.push(breakReminder ? 1 : 0); }
      
      values.push(userId);
      runQuery(`UPDATE settings SET ${updates.join(', ')} WHERE user_id = ?`, values);
    } else {
      runQuery(
        'INSERT INTO settings (user_id, theme, notifications, study_reminder, break_reminder) VALUES (?, ?, ?, ?, ?)',
        [userId, theme || 'light', notifications ? 1 : 0, studyReminder ? 1 : 0, breakReminder ? 1 : 0]
      );
    }
    
    const settings = getOne('SELECT * FROM settings WHERE user_id = ?', [userId]);
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== START SERVER ====================

initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════╗
║   🎓 Student Planner API Server           ║
╠════════════════════════════════════════════╣
║   📡 Port: ${PORT}                         
║   🗄️  Database: SQLite (sql.js)           
║   ✅ Status: Ready                         
║   🌐 CORS: Enabled                         
╚════════════════════════════════════════════╝

📧 Demo Account:
   Email: alex@example.com
   Password: demo123

💡 Access at: http://localhost:${PORT}
    `);
  });
}).catch(err => {
  console.error('❌ Failed to initialize database:', err);
  console.log('\n⚠️  Please run: npm run init-db\n');
  process.exit(1);
});
