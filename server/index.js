process.noDeprecation = true;
const express = require('express');
const cors = require('cors');
const path = require('path');

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

app.use(express.static(path.join(__dirname, '..', 'client', 'build'), {
  maxAge: 0, etag: false, lastModified: false,
  setHeaders: (res, p) => {
    if (p.endsWith('.html')) res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  }
}));
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/') || req.path.startsWith('/uploads/')) return;
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
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
