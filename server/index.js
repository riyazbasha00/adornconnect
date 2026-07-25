process.noDeprecation = true;
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

let compression;
try { compression = require('compression'); } catch {}

const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');
const uploadRouter = require('./routes/upload');
const { getBanner, updateBanner, getProducts, getCategories } = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

if (compression) app.use(compression());
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: https://adornconnect.com/sitemap.xml`);
});

app.get('/sitemap.xml', (req, res) => {
  const SITE = 'https://adornconnect.com';
  const products = getProducts();
  const categories = getCategories();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>${SITE}/products</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>`;

  categories.forEach(c => {
    xml += `\n  <url><loc>${SITE}/products?cat=${encodeURIComponent(c.id)}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`;
  });

  products.forEach(p => {
    xml += `\n  <url><loc>${SITE}/product?sku=${encodeURIComponent(p.sku)}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`;
  });

  xml += '\n</urlset>';
  res.type('application/xml');
  res.send(xml);
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  maxAge: '30d', etag: true,
}));

app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/upload', uploadRouter);

app.get('/api/banner', (req, res) => {
  res.json(getBanner());
});
app.put('/api/banner', (req, res) => {
  const banner = updateBanner(req.body);
  res.json(banner);
});

const buildDir = [
  path.join(__dirname, '..', 'client', 'build'),
  path.join(process.cwd(), 'client', 'build'),
  path.join(__dirname, 'client', 'build'),
].find(p => { try { return fs.statSync(p).isDirectory(); } catch { return false; } }) || path.join(__dirname, '..', 'client', 'build');

app.use(express.static(buildDir, {
  maxAge: '1h', etag: true,
  setHeaders: (res, p) => {
    if (p.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    } else if (p.match(/\.(js|css)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
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
  res.status(404).json({ error: 'Route not found: ' + req.method + ' ' + req.url });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
