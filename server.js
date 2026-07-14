const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

/* ── Categories ── */

app.get('/api/categories', (req, res) => {
  const cats = db.prepare('SELECT * FROM categories ORDER BY label').all();
  res.json(cats);
});

app.post('/api/categories', (req, res) => {
  const { id, label, icon } = req.body;
  if (!id || !label) return res.status(400).json({ error: 'id and label required' });
  try {
    db.prepare('INSERT INTO categories (id, label, icon) VALUES (?, ?, ?)').run(id, label, icon || 'fas fa-box');
    res.json({ success: true });
  } catch (e) {
    res.status(409).json({ error: e.message });
  }
});

app.put('/api/categories/:id', (req, res) => {
  const { label, icon } = req.body;
  db.prepare('UPDATE categories SET label = ?, icon = ? WHERE id = ?').run(label, icon || 'fas fa-box', req.params.id);
  res.json({ success: true });
});

app.delete('/api/categories/:id', (req, res) => {
  db.prepare('UPDATE products SET cat = NULL WHERE cat = ?').run(req.params.id);
  db.prepare('DELETE FROM categories WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

/* ── Products ── */

app.get('/api/products', (req, res) => {
  const { cat, tag, q } = req.query;
  let sql = 'SELECT * FROM products';
  const params = [];
  const wheres = [];

  if (cat) { wheres.push('cat = ?'); params.push(cat); }
  if (tag) { wheres.push("tags LIKE ?"); params.push(`%"${tag}"%`); }
  if (q) { wheres.push('(name LIKE ? OR sku LIKE ? OR desc LIKE ?)'); params.push(`%${q}%`, `%${q}%`, `%${q}%`); }

  if (wheres.length) sql += ' WHERE ' + wheres.join(' AND ');
  sql += ' ORDER BY created_at DESC';

  const products = db.prepare(sql).all(...params);
  res.json(products.map(p => ({ ...p, tags: JSON.parse(p.tags || '[]') })));
});

app.get('/api/products/:sku', (req, res) => {
  const p = db.prepare('SELECT * FROM products WHERE sku = ?').get(req.params.sku);
  if (!p) return res.status(404).json({ error: 'not found' });
  p.tags = JSON.parse(p.tags || '[]');
  res.json(p);
});

app.post('/api/products', (req, res) => {
  const { sku, name, cat, desc, price, unit, img, tags } = req.body;
  if (!sku || !name) return res.status(400).json({ error: 'sku and name required' });
  try {
    db.prepare(
      'INSERT INTO products (sku, name, cat, desc, price, unit, img, tags) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    ).run(sku, name, cat || null, desc || '', price || '', unit || '', img || '', JSON.stringify(tags || []));
    res.json({ success: true });
  } catch (e) {
    res.status(409).json({ error: e.message });
  }
});

app.put('/api/products/:sku', (req, res) => {
  const { name, cat, desc, price, unit, img, tags } = req.body;
  db.prepare(
    'UPDATE products SET name = ?, cat = ?, desc = ?, price = ?, unit = ?, img = ?, tags = ? WHERE sku = ?'
  ).run(name, cat || null, desc || '', price || '', unit || '', img || '', JSON.stringify(tags || []), req.params.sku);
  res.json({ success: true });
});

app.delete('/api/products/:sku', (req, res) => {
  db.prepare('DELETE FROM products WHERE sku = ?').run(req.params.sku);
  res.json({ success: true });
});

/* ── Static fallback ── */

app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
