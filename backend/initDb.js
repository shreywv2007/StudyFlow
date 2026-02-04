import initSqlJs from 'sql.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { writeFileSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function initializeDatabase() {
  console.log('🔧 Initializing Student Planner Database...\n');
  
  try {
    const SQL = await initSqlJs();
    const db = new SQL.Database();
    
    // Create tables
    console.log('📋 Creating tables...');
    
    db.run(`
      CREATE TABLE users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    db.run(`
      CREATE TABLE tasks (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        title TEXT NOT NULL,
        due_date TEXT NOT NULL,
        priority TEXT DEFAULT 'medium',
        type TEXT DEFAULT 'task',
        completed INTEGER DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);
    
    db.run(`
      CREATE TABLE courses (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        name TEXT NOT NULL,
        code TEXT,
        credits INTEGER DEFAULT 3,
        grade TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);
    
    db.run(`
      CREATE TABLE study_sessions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        subject TEXT NOT NULL,
        duration INTEGER DEFAULT 25,
        date TEXT NOT NULL,
        notes TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);
    
    db.run(`
      CREATE TABLE notes (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        subject TEXT NOT NULL,
        title TEXT NOT NULL,
        content TEXT,
        tags TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);
    
    db.run(`
      CREATE TABLE wellbeing (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        date TEXT NOT NULL,
        mood TEXT,
        sleep_hours INTEGER DEFAULT 7,
        stress_level INTEGER DEFAULT 5,
        notes TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);
    
    db.run(`
      CREATE TABLE settings (
        user_id TEXT PRIMARY KEY,
        theme TEXT DEFAULT 'light',
        notifications INTEGER DEFAULT 1,
        study_reminder INTEGER DEFAULT 1,
        break_reminder INTEGER DEFAULT 1,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);
    
    console.log('✅ Tables created successfully\n');
    
    // Insert demo data
    console.log('📝 Inserting demo data...');
    
    const demoUserId = uuidv4();
    
    // Demo user - Alex
    db.run(
      'INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)',
      [demoUserId, 'Alex Johnson', 'alex@example.com', 'demo123']
    );
    
    // Demo tasks
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    const friday = new Date(today);
    friday.setDate(today.getDate() + (5 - today.getDay()));
    
    const tasks = [
      {
        id: uuidv4(),
        title: 'Calculus Midterm Prep',
        dueDate: today.toISOString().split('T')[0],
        priority: 'high',
        type: 'exam'
      },
      {
        id: uuidv4(),
        title: 'History Essay Draft',
        dueDate: tomorrow.toISOString().split('T')[0],
        priority: 'high',
        type: 'assignment'
      },
      {
        id: uuidv4(),
        title: 'Physics Lab Report',
        dueDate: friday.toISOString().split('T')[0],
        priority: 'medium',
        type: 'assignment'
      },
      {
        id: uuidv4(),
        title: 'Read Chapter 5 - Biology',
        dueDate: nextWeek.toISOString().split('T')[0],
        priority: 'low',
        type: 'reading'
      }
    ];
    
    tasks.forEach(task => {
      db.run(
        'INSERT INTO tasks (id, user_id, title, due_date, priority, type, completed) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [task.id, demoUserId, task.title, task.dueDate, task.priority, task.type, 0]
      );
    });
    
    // Demo courses
    const courses = [
      { id: uuidv4(), name: 'Calculus II', code: 'MATH 201', credits: 4, grade: 'A' },
      { id: uuidv4(), name: 'Art History', code: 'ART 105', credits: 3, grade: 'B+' },
      { id: uuidv4(), name: 'Comp Sci', code: 'CS 150', credits: 3, grade: 'A' },
      { id: uuidv4(), name: 'Physics I', code: 'PHYS 101', credits: 4, grade: 'B' }
    ];
    
    courses.forEach(course => {
      db.run(
        'INSERT INTO courses (id, user_id, name, code, credits, grade) VALUES (?, ?, ?, ?, ?, ?)',
        [course.id, demoUserId, course.name, course.code, course.credits, course.grade]
      );
    });
    
    // Demo study sessions
    const sessions = [
      {
        id: uuidv4(),
        subject: 'Mathematics',
        duration: 90,
        date: today.toISOString().split('T')[0],
        notes: 'Worked on integration techniques'
      },
      {
        id: uuidv4(),
        subject: 'Physics',
        duration: 60,
        date: yesterday().toISOString().split('T')[0],
        notes: 'Lab report writing'
      },
      {
        id: uuidv4(),
        subject: 'Art History',
        duration: 45,
        date: yesterday().toISOString().split('T')[0],
        notes: 'Renaissance period notes'
      },
      {
        id: uuidv4(),
        subject: 'Computer Science',
        duration: 120,
        date: twoDaysAgo().toISOString().split('T')[0],
        notes: 'Algorithm practice'
      }
    ];
    
    sessions.forEach(session => {
      db.run(
        'INSERT INTO study_sessions (id, user_id, subject, duration, date, notes) VALUES (?, ?, ?, ?, ?, ?)',
        [session.id, demoUserId, session.subject, session.duration, session.date, session.notes]
      );
    });
    
    // Demo notes
    const notes = [
      {
        id: uuidv4(),
        subject: 'Mathematics',
        title: 'Integration Techniques',
        content: 'Key methods:\n1. U-Substitution\n2. Integration by parts\n3. Partial fractions\n4. Trigonometric substitution',
        tags: 'calculus,integration,formulas'
      },
      {
        id: uuidv4(),
        subject: 'Physics',
        title: 'Newton\'s Laws Summary',
        content: '1st Law: Inertia - objects resist changes\n2nd Law: F = ma\n3rd Law: Action-reaction pairs',
        tags: 'physics,mechanics,laws'
      },
      {
        id: uuidv4(),
        subject: 'Art History',
        title: 'Renaissance Key Artists',
        content: 'Leonardo da Vinci - Mona Lisa, Last Supper\nMichelangelo - David, Sistine Chapel\nRaphael - School of Athens',
        tags: 'art,renaissance,artists'
      }
    ];
    
    const now = new Date().toISOString();
    notes.forEach(note => {
      db.run(
        'INSERT INTO notes (id, user_id, subject, title, content, tags, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [note.id, demoUserId, note.subject, note.title, note.content, note.tags, now, now]
      );
    });
    
    // Demo wellbeing entries
    const wellbeingEntries = [
      {
        id: uuidv4(),
        date: today.toISOString().split('T')[0],
        mood: 'great',
        sleepHours: 8,
        stressLevel: 3,
        notes: 'Feeling energized and productive!'
      },
      {
        id: uuidv4(),
        date: yesterday().toISOString().split('T')[0],
        mood: 'good',
        sleepHours: 7,
        stressLevel: 4,
        notes: 'Good day, slight stress about upcoming exam'
      },
      {
        id: uuidv4(),
        date: twoDaysAgo().toISOString().split('T')[0],
        mood: 'okay',
        sleepHours: 6,
        stressLevel: 6,
        notes: 'Stayed up late studying'
      }
    ];
    
    wellbeingEntries.forEach(entry => {
      db.run(
        'INSERT INTO wellbeing (id, user_id, date, mood, sleep_hours, stress_level, notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [entry.id, demoUserId, entry.date, entry.mood, entry.sleepHours, entry.stressLevel, entry.notes]
      );
    });
    
    // Demo settings
    db.run(
      'INSERT INTO settings (user_id, theme, notifications, study_reminder, break_reminder) VALUES (?, ?, ?, ?, ?)',
      [demoUserId, 'light', 1, 1, 1]
    );
    
    console.log('✅ Demo data inserted successfully\n');
    
    // Save database to file
    const data = db.export();
    const buffer = Buffer.from(data);
    const dbPath = join(__dirname, 'planner.db');
    writeFileSync(dbPath, buffer);
    
    console.log('💾 Database saved to:', dbPath);
    console.log('\n✨ Database initialization complete!\n');
    console.log('📧 Demo account created:');
    console.log('   Email: alex@example.com');
    console.log('   Password: demo123\n');
    console.log('🚀 You can now start the server with: npm start\n');
    
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  }
}

function yesterday() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date;
}

function twoDaysAgo() {
  const date = new Date();
  date.setDate(date.getDate() - 2);
  return date;
}

initializeDatabase();
