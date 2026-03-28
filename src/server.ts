import express from 'express';
import cors from 'cors';
import db from './db';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

// Logging Helper (The "WhatsApp" Preparation Engine)
function logActivity(user_id: number | null, user_type: string, action: string, details: string, phone?: string) {
  try {
    db.prepare('INSERT INTO activity_logs (user_id, user_type, action, details, phone) VALUES (?, ?, ?, ?, ?)').run(user_id, user_type, action, details, phone || null);
    console.log(`[ACTIVITY LOG] ${user_type.toUpperCase()}: ${action} - ${details}`);
  } catch (e) { console.error('LOG ERROR:', e); }
}

app.use(cors());
app.use(express.json());

// Serve static files from Vite build
app.use(express.static(path.join(__dirname, '../dist')));
// Serve user uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Admin Login
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'mambwehermann@gmail.com' && password === '##Herman@123##') {
    res.json({ success: true, user: { email, role: 'admin' } });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Affiliate Login
app.post('/api/affiliates/login', (req, res) => {
  const { phone, access_code } = req.body;
  try {
    const affiliate = db.prepare('SELECT * FROM affiliates WHERE phone = ? AND access_code = ?').get(phone, access_code) as any;
    if (affiliate) {
      if (affiliate.status !== 'active') {
        return res.status(403).json({ error: "Votre compte n'est pas encore activé." });
      }
      res.json({ success: true, user: { ...affiliate, role: 'affiliate' } });
    } else {
      res.status(401).json({ error: "Téléphone ou code d'accès incorrect" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Register a new affiliate
app.post('/api/affiliates/register', (req, res) => {
  const { name, email, phone, method } = req.body;
  
  if (!name || !email || !phone || !method) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const access_code = Math.random().toString(36).substring(2, 8).toUpperCase();

  try {
    const stmt = db.prepare('INSERT INTO affiliates (name, email, phone, method, access_code) VALUES (?, ?, ?, ?, ?)');
    const result = stmt.run(name, email, phone, method, access_code);
    res.json({ id: result.lastInsertRowid, status: 'pending', access_code });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// List all affiliates (Admin)
app.get('/api/affiliates', (req, res) => {
  try {
    const affiliates = db.prepare('SELECT * FROM affiliates ORDER BY created_at DESC').all();
    res.json(affiliates);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update affiliate status and access code (Admin)
app.patch('/api/affiliates/:id', (req, res) => {
  const { id } = req.params;
  const { status, promo_code } = req.body;

  try {
    if (status === 'active') {
      const access_code = Math.random().toString(36).substring(2, 8).toUpperCase();
      const stmt = db.prepare('UPDATE affiliates SET status = ?, promo_code = ?, access_code = COALESCE(access_code, ?) WHERE id = ?');
      stmt.run(status, promo_code, access_code, id);
    } else {
      const stmt = db.prepare('UPDATE affiliates SET status = ?, promo_code = ? WHERE id = ?');
      stmt.run(status, promo_code, id);
    }
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update affiliate profile (Affiliate Dashboard)
app.patch('/api/affiliates/:id/profile', (req, res) => {
  const { id } = req.params;
  const { name, avatar } = req.body;
  
  try {
    let avatarUrl = undefined;
    
    if (avatar) {
      const base64Data = avatar.replace(/^data:image\/\w+;base64,/, "");
      const fileName = `avatar_${id}_${Date.now()}.jpg`;
      const uploadDir = path.join(process.cwd(), 'uploads', 'avatars');
      const filePath = path.join(uploadDir, fileName);
      
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      
      fs.writeFileSync(filePath, base64Data, 'base64');
      avatarUrl = `/uploads/avatars/${fileName}`;
    }

    if (avatarUrl && name) {
      const stmt = db.prepare('UPDATE affiliates SET name = ?, avatar_url = ? WHERE id = ?');
      stmt.run(name, avatarUrl, id);
    } else if (name) {
      const stmt = db.prepare('UPDATE affiliates SET name = ? WHERE id = ?');
      stmt.run(name, id);
    } else if (avatarUrl) {
      const stmt = db.prepare('UPDATE affiliates SET avatar_url = ? WHERE id = ?');
      stmt.run(avatarUrl, id);
    }

    res.json({ success: true, avatar_url: avatarUrl });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Increment leads/conversions for an affiliate (Simulated/Testing)
app.patch('/api/affiliates/:id/track', (req, res) => {
  const { id } = req.params;
  const { type, clientName, clientPhone } = req.body; // 'lead' or 'conversion'

  try {
    if (type === 'lead') {
      db.prepare('UPDATE affiliates SET total_leads = total_leads + 1 WHERE id = ?').run(id);
      db.prepare('INSERT INTO lead_details (affiliate_id, client_name, client_phone, event_type) VALUES (?, ?, ?, ?)').run(id, clientName || 'Client Anonyme', clientPhone || '', 'lead');
    } else if (type === 'conversion') {
      // When a sale is confirmed, increment conversions and update revenue
      db.prepare('UPDATE affiliates SET conversions = conversions + 1, revenue = revenue + 1125 WHERE id = ?').run(id);
      db.prepare('INSERT INTO lead_details (affiliate_id, client_name, client_phone, event_type) VALUES (?, ?, ?, ?)').run(id, clientName || 'Client Anonyme', clientPhone || '', 'conversion');
    }
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get affiliate details and leads (Dashboard)
app.get('/api/affiliates/:id/dashboard', (req, res) => {
  const { id } = req.params;
  try {
    const affiliate = db.prepare('SELECT * FROM affiliates WHERE id = ?').get(id);
    const leads = db.prepare('SELECT * FROM lead_details WHERE affiliate_id = ? ORDER BY created_at DESC').all(id);
    const payouts = db.prepare('SELECT * FROM payout_requests WHERE affiliate_id = ? ORDER BY created_at DESC').all(id);
    res.json({ affiliate, leads, payouts });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Public Affiliate Profile for Co-branding
app.get('/api/affiliates/:id/profile', (req, res) => {
  const { id } = req.params;
  try {
    const affiliate = db.prepare('SELECT id, name, avatar_url, promo_code FROM affiliates WHERE id = ?').get(id);
    if (affiliate) {
      res.json(affiliate);
    } else {
      res.status(404).json({ error: 'Affiliate not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Log Affiliate Click (Analytics)
app.post('/api/affiliates/:id/click', (req, res) => {
  const { id } = req.params;
  const { source } = req.body;
  
  // Basic IP hashing for unique counting (in a real app, use crypto.createHash)
  const rawIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const ip_hash = Buffer.from(String(rawIp)).toString('base64');
  
  try {
    db.prepare('INSERT INTO affiliate_clicks (affiliate_id, source, ip_hash) VALUES (?, ?, ?)').run(id, source || 'direct', ip_hash);
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get Affiliate Analytics (Dashboard)
app.get('/api/affiliates/:id/analytics', (req, res) => {
  const { id } = req.params;
  try {
    const clicks = db.prepare(`
      SELECT source, COUNT(*) as count 
      FROM affiliate_clicks 
      WHERE affiliate_id = ? 
      GROUP BY source
      ORDER BY count DESC
    `).all(id);
    
    // Also get last 7 days total trend (optional, but good for UI)
    const recentClicks = db.prepare(`
      SELECT date(created_at) as date, COUNT(*) as count
      FROM affiliate_clicks
      WHERE affiliate_id = ? AND created_at >= date('now', '-7 days')
      GROUP BY date(created_at)
      ORDER BY date
    `).all(id);

    res.json({ sources: clicks, trend: recentClicks });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Payout Requests
app.get('/api/payouts', (req, res) => {
  try {
    const payouts = db.prepare(`
      SELECT p.*, a.name as affiliate_name, a.phone as affiliate_phone 
      FROM payout_requests p 
      JOIN affiliates a ON p.affiliate_id = a.id 
      ORDER BY p.created_at DESC
    `).all();
    res.json(payouts);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/payouts/request', (req, res) => {
  const { affiliate_id, amount, payment_method } = req.body;
  if (!affiliate_id || !amount || !payment_method) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    db.prepare('INSERT INTO payout_requests (affiliate_id, amount, payment_method) VALUES (?, ?, ?)').run(affiliate_id, amount, payment_method);
    
    logActivity(affiliate_id, 'affiliate', 'payout_request', `Demande de retrait: $${amount}`);

    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/payouts/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const stmt = db.prepare('UPDATE payout_requests SET status = ? WHERE id = ?');
    stmt.run(status, id);
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Payment Links
app.post('/api/payment-links', (req, res) => {
  const { affiliate_id, client_name, client_phone, amount } = req.body;
  const id = Math.random().toString(36).substring(2, 15);

  try {
    const stmt = db.prepare('INSERT INTO payment_links (id, affiliate_id, client_name, client_phone, amount) VALUES (?, ?, ?, ?, ?)');
    stmt.run(id, affiliate_id, client_name, client_phone, amount || 1125);
    res.json({ id, success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/payment-links/:id', (req, res) => {
  const { id } = req.params;
  try {
    const link = db.prepare(`
      SELECT p.*, a.name as affiliate_name 
      FROM payment_links p 
      JOIN affiliates a ON p.affiliate_id = a.id 
      WHERE p.id = ?
    `).get(id);
    if (link) {
      res.json(link);
    } else {
      res.status(404).json({ error: 'Link not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/payment-links/:id/pay', (req, res) => {
  const { id } = req.params;
  try {
    const link = db.prepare('SELECT * FROM payment_links WHERE id = ?').get(id) as any;
    if (!link) return res.status(404).json({ error: 'Link not found' });
    if (link.status === 'paid') return res.status(400).json({ error: 'Already paid' });

    // Update link status
    db.prepare('UPDATE payment_links SET status = ? WHERE id = ?').run('paid', id);
    
    // Update affiliate stats
    db.prepare('UPDATE affiliates SET conversions = conversions + 1, revenue = revenue + ? WHERE id = ?')
      .run(link.amount, link.affiliate_id);
    
    // Log in lead_details
    db.prepare('INSERT INTO lead_details (affiliate_id, client_name, client_phone, event_type) VALUES (?, ?, ?, ?)')
      .run(link.affiliate_id, link.client_name, link.client_phone, 'conversion');

    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// --- Affiliate Onboarding ---
app.post('/api/affiliates/:id/onboarding', (req, res) => {
  const { id } = req.params;
  try {
    db.prepare('UPDATE affiliates SET has_completed_onboarding = 1 WHERE id = ?').run(id);
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// --- Real-time Chat (Polling) ---
app.get('/api/chat/:affiliateId', (req, res) => {
  const { affiliateId } = req.params;
  try {
    const messages = db.prepare('SELECT * FROM messages WHERE affiliate_id = ? ORDER BY created_at ASC').all(affiliateId);
    res.json(messages);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/chat', (req, res) => {
  const { affiliate_id, sender_type, content } = req.body;
  try {
    const stmt = db.prepare('INSERT INTO messages (affiliate_id, sender_type, content) VALUES (?, ?, ?)');
    const result = stmt.run(affiliate_id, sender_type, content);
    
    // Automatically trigger a notification for the other party (simplified)
    if (sender_type === 'admin') {
      db.prepare("INSERT INTO notifications (affiliate_id, title, message, type) VALUES (?, 'Nouveau Message', 'Vous avez reçu un message de l''administrateur', 'message')").run(affiliate_id);
    }
    
    const newMessage = db.prepare('SELECT * FROM messages WHERE id = ?').get(result.lastInsertRowid);
    res.json(newMessage);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/admin/chats', (req, res) => {
  try {
    const affiliates = db.prepare(`
      SELECT DISTINCT a.id, a.name, a.phone, 
      (SELECT content FROM messages m WHERE m.affiliate_id = a.id ORDER BY created_at DESC LIMIT 1) as last_message,
      (SELECT created_at FROM messages m WHERE m.affiliate_id = a.id ORDER BY created_at DESC LIMIT 1) as last_message_time
      FROM affiliates a
      JOIN messages m ON a.id = m.affiliate_id
      ORDER BY last_message_time DESC
    `).all();
    res.json(affiliates);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// --- Real-time Notifications (Polling) ---
app.get('/api/notifications/:affiliateId', (req, res) => {
  const { affiliateId } = req.params;
  try {
    const notifications = db.prepare('SELECT * FROM notifications WHERE affiliate_id = ? ORDER BY created_at DESC').all(affiliateId);
    res.json(notifications);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/notifications/:id/read', (req, res) => {
  const { id } = req.params;
  try {
    db.prepare('UPDATE notifications SET is_read = 1 WHERE id = ?').run(id);
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// --- Client Onboarding API ---

// Public endpoint for clients to register themselves
app.post('/api/clients/register', (req, res) => {
  const { affiliate_id, name, email, phone } = req.body;
  if (!name || !phone) return res.status(400).json({ error: 'Name and phone required' });
  const access_code = Math.random().toString(36).substring(2, 8).toUpperCase();
  try {
    const stmt = db.prepare('INSERT INTO clients (affiliate_id, name, email, phone, access_code) VALUES (?, ?, ?, ?, ?)');
    const result = stmt.run(affiliate_id || null, name, email, phone, access_code);
    
    // Create initial project and contract
    db.prepare('INSERT INTO client_projects (client_id) VALUES (?)').run(result.lastInsertRowid);
    db.prepare('INSERT INTO contracts (client_id) VALUES (?)').run(result.lastInsertRowid);

    res.json({ id: result.lastInsertRowid, access_code });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Admin creates a client, generating an access code
app.post('/api/admin/clients', (req, res) => {
  const { affiliate_id, name, email, phone } = req.body;
  if (!name || !phone) return res.status(400).json({ error: 'Name and phone required' });
  const access_code = Math.random().toString(36).substring(2, 8).toUpperCase();
  try {
    const stmt = db.prepare('INSERT INTO clients (affiliate_id, name, email, phone, access_code) VALUES (?, ?, ?, ?, ?)');
    const result = stmt.run(affiliate_id || null, name, email, phone, access_code);
    
    // Create initial project and contract
    db.prepare('INSERT INTO client_projects (client_id) VALUES (?)').run(result.lastInsertRowid);
    db.prepare('INSERT INTO contracts (client_id) VALUES (?)').run(result.lastInsertRowid);

    logActivity(result.lastInsertRowid as number, 'client', 'registration', `Nouveau client: ${name}`, phone);

    res.json({ id: result.lastInsertRowid, access_code });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Admin lists clients
app.get('/api/admin/clients', (req, res) => {
  try {
    const clients = db.prepare(`
      SELECT clients.*, affiliates.name as affiliate_name, 
             client_projects.id as project_id, client_projects.status as project_status, client_projects.milestones
      FROM clients 
      LEFT JOIN affiliates ON clients.affiliate_id = affiliates.id 
      LEFT JOIN client_projects ON clients.id = client_projects.client_id
      ORDER BY clients.created_at DESC
    `).all();
    res.json(clients);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Client logs in
app.post('/api/clients/login', (req, res) => {
  const { phone, access_code } = req.body;
  try {
    const client = db.prepare('SELECT * FROM clients WHERE phone = ? AND access_code = ?').get(phone, access_code);
    if (client) {
      res.json({ success: true, user: { ...client, role: 'client' } });
    } else {
      res.status(401).json({ error: "Téléphone ou code d'accès incorrect" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Client Dashboard details
app.get('/api/clients/:id/dashboard', (req, res) => {
  const { id } = req.params;
  try {
    const client = db.prepare('SELECT * FROM clients WHERE id = ?').get(id);
    const contract = db.prepare('SELECT * FROM contracts WHERE client_id = ?').get(id);
    const project = db.prepare('SELECT * FROM client_projects WHERE client_id = ?').get(id);
    const deliverables = db.prepare('SELECT * FROM client_deliverables WHERE client_id = ? ORDER BY created_at DESC').all(id);
    res.json({ client, contract, project, deliverables });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Client signs contract
app.post('/api/clients/:id/contract/sign', (req, res) => {
  const { id } = req.params;
  try {
    db.prepare('UPDATE contracts SET is_signed = 1, signed_at = CURRENT_TIMESTAMP WHERE client_id = ?').run(id);
    // Automatically trigger Welcome Packet message
    const welcomeMsg = "Bienvenue dans l'aventure ! Votre contrat est signé. Merci de remplir le questionnaire pour démarrer.";
    db.prepare("INSERT INTO client_messages (client_id, room_type, sender_type, content) VALUES (?, 'admin', 'admin', ?)").run(id, welcomeMsg);
    
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Client submits questionnaire
app.patch('/api/clients/:id/questionnaire', (req, res) => {
  const { id } = req.params;
  const { business_details } = req.body;
  try {
    db.prepare('UPDATE clients SET business_details = ?, status = ? WHERE id = ?').run(JSON.stringify(business_details), 'active', id);
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Client schedules kickoff
app.patch('/api/clients/:id/schedule', (req, res) => {
  const { id } = req.params;
  const { kickoff_date, kickoff_time } = req.body;
  try {
    db.prepare('UPDATE client_projects SET kickoff_date = ?, kickoff_time = ? WHERE client_id = ?').run(kickoff_date, kickoff_time, id);
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Admin uploads client deliverable
app.post('/api/clients/:id/deliverable', (req, res) => {
  const { id } = req.params;
  const { title, file_url } = req.body;
  try {
    db.prepare('INSERT INTO client_deliverables (client_id, title, file_url) VALUES (?, ?, ?)').run(id, title, file_url);
    const msg = `Un nouveau fichier est disponible: ${title}`;
    db.prepare("INSERT INTO client_messages (client_id, room_type, sender_type, content) VALUES (?, 'admin', 'admin', ?)").run(id, msg);
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Client Messages by Room
app.get('/api/client-chat/:clientId/:roomType', (req, res) => {
  const { clientId, roomType } = req.params;
  try {
    const messages = db.prepare('SELECT * FROM client_messages WHERE client_id = ? AND room_type = ? ORDER BY created_at ASC').all(clientId, roomType);
    res.json(messages);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/client-chat', (req, res) => {
  const { client_id, room_type, sender_type, content } = req.body;
  try {
    const stmt = db.prepare('INSERT INTO client_messages (client_id, room_type, sender_type, content) VALUES (?, ?, ?, ?)');
    const result = stmt.run(client_id, room_type || 'admin', sender_type, content);
    const newMessage = db.prepare('SELECT * FROM client_messages WHERE id = ?').get(result.lastInsertRowid);
    res.json(newMessage);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Admin gets list of clients with active chats
app.get('/api/admin/client-chats', (req, res) => {
  try {
    const clients = db.prepare(`
      SELECT DISTINCT c.id, c.name, c.phone, 
      (SELECT content FROM client_messages m WHERE m.client_id = c.id AND m.room_type = 'admin' ORDER BY created_at DESC LIMIT 1) as last_message,
      (SELECT created_at FROM client_messages m WHERE m.client_id = c.id AND m.room_type = 'admin' ORDER BY created_at DESC LIMIT 1) as last_message_time
      FROM clients c
      JOIN client_messages m ON c.id = m.client_id
      WHERE m.room_type = 'admin'
      ORDER BY last_message_time DESC
    `).all();
    res.json(clients);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Affiliate gets their referred clients
app.get('/api/affiliates/:id/clients', (req, res) => {
  const { id } = req.params;
  try {
    const clients = db.prepare(`
      SELECT DISTINCT c.id, c.name, c.phone, c.status, c.created_at,
      (SELECT content FROM client_messages m WHERE m.client_id = c.id AND m.room_type = 'affiliate' ORDER BY created_at DESC LIMIT 1) as last_message,
      (SELECT created_at FROM client_messages m WHERE m.client_id = c.id AND m.room_type = 'affiliate' ORDER BY created_at DESC LIMIT 1) as last_message_time
      FROM clients c
      WHERE c.affiliate_id = ?
      ORDER BY c.created_at DESC
    `).all(id);
    res.json(clients);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// SPA routing: Catch-all for frontend routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// CEO Dashboard Stats
app.get('/api/admin/ceo-stats', (req, res) => {
  try {
    const totalRev = db.prepare('SELECT SUM(revenue) as total FROM affiliates').get() as any;
    const activeAffiliates = db.prepare('SELECT COUNT(*) as count FROM affiliates WHERE status = "active"').get() as any;
    const pendingPayouts = db.prepare('SELECT SUM(amount) as total FROM payout_requests WHERE status = "pending"').get() as any;
    const totalClients = db.prepare('SELECT COUNT(*) as count FROM clients').get() as any;
    
    // Traffic Sources Aggregate
    const trafficSources = db.prepare(`
      SELECT source, COUNT(*) as count 
      FROM affiliate_clicks 
      GROUP BY source 
      ORDER BY count DESC
    `).all();

    // Monthly Revenue Trend (Mocking historical data based on current total for visualization)
    const revenueTrend = [
      Math.floor((totalRev.total || 0) * 0.4),
      Math.floor((totalRev.total || 0) * 0.55),
      Math.floor((totalRev.total || 0) * 0.7),
      Math.floor((totalRev.total || 0) * 0.85),
      Math.floor(totalRev.total || 0)
    ];

    res.json({
      revenue: totalRev.total || 0,
      activeAffiliates: activeAffiliates.count || 0,
      pendingPayouts: pendingPayouts.total || 0,
      totalClients: totalClients.count || 0,
      trafficSources,
      revenueTrend
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// CEO Dashboard Stats
app.get('/api/admin/ceo-stats', (req, res) => {
  try {
    const totalRev = db.prepare('SELECT SUM(revenue) as total FROM affiliates').get() as any;
    const activeAffiliates = db.prepare('SELECT COUNT(*) as count FROM affiliates WHERE status = "active"').get() as any;
    const pendingPayouts = db.prepare('SELECT SUM(amount) as total FROM payout_requests WHERE status = "pending"').get() as any;
    const totalClients = db.prepare('SELECT COUNT(*) as count FROM clients').get() as any;
    const incomeFromInvoices = db.prepare('SELECT SUM(amount) as total FROM invoices WHERE status = "paid"').get() as any;
    
    // Traffic Sources Aggregate
    const trafficSources = db.prepare(`
      SELECT source, COUNT(*) as count 
      FROM affiliate_clicks 
      GROUP BY source 
      ORDER BY count DESC
    `).all();

    // Monthly Revenue Trend
    const revenueTrend = [
      Math.floor((incomeFromInvoices.total || 0) * 0.4),
      Math.floor((incomeFromInvoices.total || 0) * 0.55),
      Math.floor((incomeFromInvoices.total || 0) * 0.7),
      Math.floor((incomeFromInvoices.total || 0) * 0.85),
      Math.floor(incomeFromInvoices.total || 0)
    ];

    res.json({
      revenue: incomeFromInvoices.total || 0,
      activeAffiliates: activeAffiliates.count || 0,
      pendingPayouts: pendingPayouts.total || 0,
      totalClients: totalClients.count || 0,
      trafficSources,
      revenueTrend
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Financial / Invoicing Endpoints
app.post('/api/invoices/generate', (req, res) => {
  const { client_id, affiliate_id, stage } = req.body;
  const projectCost = 1125.0;
  let amount = 0;

  if (stage === 'initial60') amount = projectCost * 0.6;
  else if (stage === 'final40') amount = projectCost * 0.4;
  else amount = projectCost;

  const id = `INV-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

  try {
    db.prepare(`
      INSERT INTO invoices (id, client_id, affiliate_id, amount, stage)
      VALUES (?, ?, ?, ?, ?)
    `).run(id, client_id, affiliate_id || null, amount, stage);

    logActivity(affiliate_id, 'affiliate', 'invoice_generated', `Facture ${id} générée pour client #${client_id}`);
    res.json({ success: true, invoice_id: id });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/public/invoices/:id', (req, res) => {
  const { id } = req.params;
  try {
    const invoice = db.prepare(`
      SELECT i.*, c.name as client_name, c.phone as client_phone
      FROM invoices i
      JOIN clients c ON i.client_id = c.id
      WHERE i.id = ?
    `).get(id) as any;

    if (!invoice) return res.status(404).json({ error: 'Invoice not found' });
    res.json(invoice);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/admin/clients/:id/invoices', (req, res) => {
  const { id } = req.params;
  try {
    const invoices = db.prepare('SELECT * FROM invoices WHERE client_id = ? ORDER BY created_at DESC').all(id);
    res.json(invoices);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/admin/invoices/:id/pay', (req, res) => {
  const { id } = req.params;
  const { payment_method } = req.body;
  try {
    const invoice = db.prepare('SELECT * FROM invoices WHERE id = ?').get(id) as any;
    if (!invoice) return res.status(404).json({ error: 'Invoice not found' });

    db.prepare(`
      UPDATE invoices 
      SET status = "paid", paid_at = CURRENT_TIMESTAMP, payment_method = ? 
      WHERE id = ?
    `).run(payment_method, id);

    // Update paid_amount in project
    db.prepare(`
      UPDATE client_projects 
      SET paid_amount = paid_amount + ? 
      WHERE client_id = ?
    `).run(invoice.amount, invoice.client_id);

    // If initial payment, move project to 'in_progress'
    if (invoice.stage === 'initial60' || invoice.stage === 'full100') {
      db.prepare('UPDATE client_projects SET status = "in_progress" WHERE client_id = ?').run(invoice.client_id);
      db.prepare('UPDATE clients SET status = "active" WHERE id = ?').run(invoice.client_id);
    }

    logActivity(null, 'admin', 'payment_confirmed', `Paiement facturé ${id} confirmé ($${invoice.amount})`);
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Admin updates project milestones
app.patch('/api/admin/projects/:id/milestones', (req, res) => {
  const { id } = req.params;
  const { milestones, status } = req.body;
  try {
    if (milestones) {
      db.prepare('UPDATE client_projects SET milestones = ? WHERE id = ?').run(JSON.stringify(milestones), id);
      logActivity(null, 'admin', 'milestone_update', `Mise à jour d'étape pour le projet #${id}`, null as any);
    }
    if (status) {
      db.prepare('UPDATE client_projects SET status = ? WHERE id = ?').run(status, id);
      // If status is 'delivered', we also update the client status to 'completed'
      if (status === 'delivered') {
        const project = db.prepare('SELECT client_id FROM client_projects WHERE id = ?').get(id) as any;
        if (project) {
          db.prepare('UPDATE clients SET status = "completed" WHERE id = ?').run(project.client_id);
          logActivity(project.client_id, 'client', 'delivrer', 'Votre boutique est maintenant LIVE!', null as any);
        }
      }
    }
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Export app for Vercel
export default app;

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server running at port ${port}`);
  });
}
