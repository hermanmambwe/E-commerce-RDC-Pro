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
    amount REAL DEFAULT 1125,
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

// --- Client Onboarding Tables ---

db.exec(`
  CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    affiliate_id INTEGER, -- (Optional) The affiliate who brought them
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT NOT NULL,
    access_code TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'pending_onboarding', -- 'pending_onboarding', 'active', 'completed'
    business_details TEXT, -- JSON string from questionnaire
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (affiliate_id) REFERENCES affiliates(id)
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS contracts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER NOT NULL,
    is_signed INTEGER DEFAULT 0,
    agreed_terms TEXT,
    signed_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id)
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS client_projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER NOT NULL UNIQUE,
    kickoff_date DATETIME,
    kickoff_time TEXT,
    milestones TEXT DEFAULT '{"branding": 0, "catalog": 0, "payment": 0, "marketing": 0, "testing": 0, "live": 0}', -- JSON string
    status TEXT DEFAULT 'setup', -- 'setup', 'in_progress', 'delivered'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id)
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS client_deliverables (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    file_url TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id)
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS client_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER NOT NULL,
    room_type TEXT NOT NULL DEFAULT 'admin', -- 'admin' or 'affiliate'
    sender_type TEXT NOT NULL, -- 'admin', 'client', or 'affiliate'
    content TEXT NOT NULL,
    is_read INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id)
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS affiliate_clicks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    affiliate_id INTEGER NOT NULL,
    source TEXT DEFAULT 'direct', -- e.g. 'whatsapp', 'facebook', 'instagram'
    ip_hash TEXT, -- hashed IP for basic unique counting
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (affiliate_id) REFERENCES affiliates(id)
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS activity_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    user_type TEXT, -- 'admin', 'affiliate', 'client'
    action TEXT NOT NULL,
    details TEXT,
    phone TEXT,
    is_notified INTEGER DEFAULT 0, -- flag for WhatsApp engine
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS invoices (
    id TEXT PRIMARY KEY, -- INV-123456
    client_id INTEGER NOT NULL,
    affiliate_id INTEGER,
    amount REAL NOT NULL,
    stage TEXT NOT NULL, -- 'initial60', 'final40', 'full100'
    status TEXT DEFAULT 'pending', -- 'pending', 'paid'
    payment_method TEXT,
    paid_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id)
  )
`);

try {
  db.exec(`ALTER TABLE client_messages ADD COLUMN room_type TEXT NOT NULL DEFAULT 'admin'`);
} catch (e) {
  // column likely exists
}

try {
  db.exec(`ALTER TABLE client_projects ADD COLUMN total_price REAL DEFAULT 1125.0`);
} catch (e) {}

try {
  db.exec(`ALTER TABLE client_projects ADD COLUMN paid_amount REAL DEFAULT 0.0`);
} catch (e) {}

export default db;
