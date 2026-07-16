process.noDeprecation = true;
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');
const uploadRouter = require('./routes/upload');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.method, req.url, req.method === 'POST' ? JSON.stringify(req.body) : '');
  next();
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/upload', uploadRouter);

const buildDir = [
  path.join(__dirname, '..', 'client', 'build'),
  path.join(process.cwd(), 'client', 'build'),
  path.join(__dirname, 'client', 'build'),
].find(p => { try { return fs.statSync(p).isDirectory(); } catch { return false; } }) || path.join(__dirname, '..', 'client', 'build');

app.use(express.static(buildDir, {
  maxAge: 0, etag: false, lastModified: false,
  setHeaders: (res, p) => {
    if (p.endsWith('.html')) res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  }
}));
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/') || req.path.startsWith('/uploads/')) return;
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.sendFile(path.join(buildDir, 'index.html'));
});

app.use((err, req, res, next) => {
  console.error('ERROR:', err);
  res.status(500).json({ error: err.message });
});

app.use((req, res) => {
  console.log('UNHANDLED:', req.method, req.url);
  res.status(404).json({ error: 'Route not found: ' + req.method + ' ' + req.url });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
