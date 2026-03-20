import Database from 'better-sqlite3';
import path from 'path';

const dbPath = process.env.DB_PATH || path.resolve(process.cwd(), 'affiliates.db');
const db = new Database(dbPath);

// Initialize the database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS affiliates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT NOT NULL,
    password TEXT,
    access_code TEXT UNIQUE,
    method TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    promo_code TEXT UNIQUE,
    total_leads INTEGER DEFAULT 0,
    conversions INTEGER DEFAULT 0,
    revenue REAL DEFAULT 0,
    avatar_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Add columns if they don't exist (for existing databases)
try {
  db.exec("ALTER TABLE affiliates ADD COLUMN password TEXT");
} catch (e) {}

try {
  db.exec("ALTER TABLE affiliates ADD COLUMN has_completed_onboarding INTEGER DEFAULT 0");
} catch (e) {}

try {
  db.exec("ALTER TABLE affiliates ADD COLUMN email TEXT");
} catch (e) {}

try {
  db.exec("ALTER TABLE affiliates ADD COLUMN access_code TEXT UNIQUE");
} catch (e) {}

try {
  db.exec("ALTER TABLE affiliates ADD COLUMN avatar_url TEXT");
} catch (e) {}

// Payout Requests
db.exec(`
  CREATE TABLE IF NOT EXISTS payout_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    affiliate_id INTEGER NOT NULL,
    amount REAL NOT NULL,
    payment_method TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (affiliate_id) REFERENCES affiliates(id)
  )
`);

// Individual Lead Tracking for transparency
db.exec(`
  CREATE TABLE IF NOT EXISTS lead_details (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    affiliate_id INTEGER NOT NULL,
    client_name TEXT,
    client_phone TEXT,
    event_type TEXT NOT NULL, 
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (affiliate_id) REFERENCES affiliates(id)
  )
`);

// Payment Links for robust tracking
db.exec(`
  CREATE TABLE IF NOT EXISTS payment_links (
    id TEXT PRIMARY KEY,
    affiliate_id INTEGER NOT NULL,
    client_name TEXT NOT NULL,
    client_phone TEXT NOT NULL,
    amount REAL DEFAULT 425,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (affiliate_id) REFERENCES affiliates(id)
  )
`);

// Real-time Chat Messages
db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    affiliate_id INTEGER NOT NULL,
    sender_type TEXT NOT NULL, -- 'admin' or 'affiliate'
    content TEXT NOT NULL,
    is_read INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (affiliate_id) REFERENCES affiliates(id)
  )
`);

// Real-time Notifications
db.exec(`
  CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    affiliate_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'info',
    is_read INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (affiliate_id) REFERENCES affiliates(id)
  )
`);

export default db;
