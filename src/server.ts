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

  try {
    const stmt = db.prepare('INSERT INTO affiliates (name, email, phone, method) VALUES (?, ?, ?, ?)');
    const result = stmt.run(name, email, phone, method);
    res.json({ id: result.lastInsertRowid, status: 'pending' });
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
    const stmt = db.prepare('INSERT INTO payout_requests (affiliate_id, amount, payment_method) VALUES (?, ?, ?)');
    stmt.run(affiliate_id, amount, payment_method);
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

// SPA routing: Catch-all for frontend routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Export app for Vercel
export default app;

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server running at port ${port}`);
  });
}
