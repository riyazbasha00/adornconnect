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
const docsRouter = require('./routes/docs');
const downloadsRouter = require('./routes/downloads');
const enrollmentsRouter = require('./routes/enrollments');
const certificatesRouter = require('./routes/certificates');
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
  <url><loc>${SITE}/portfolio</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>${SITE}/academy</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>${SITE}/insights</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>${SITE}/resources</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>${SITE}/products</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>${SITE}/about</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${SITE}/where-to-buy</loc><changefreq>monthly</changefreq><priority>0.85</priority></url>
  <url><loc>${SITE}/projects</loc><changefreq>weekly</changefreq><priority>0.85</priority></url>
  <url><loc>${SITE}/partner-network</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${SITE}/partner-program</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${SITE}/support</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${SITE}/knowledge-center</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>${SITE}/downloads</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>${SITE}/privacy</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>`;

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

const uploadCandidates = [
  path.join(__dirname, '..', 'uploads'),
  path.join(__dirname, 'uploads'),
  path.join(process.cwd(), 'uploads'),
  path.join(process.cwd(), 'nodejs', 'uploads'),
  '/home/u341249923/domains/adornconnect.com/nodejs/uploads',
  '/home/u341249923/domains/adornconnect.com/uploads',
];
uploadCandidates.forEach(dir => {
  try {
    if (fs.existsSync(dir)) {
      app.use('/uploads', express.static(dir, { maxAge: '30d', etag: true }));
    }
  } catch (e) {}
});

app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/docs', docsRouter);
app.use('/api/downloads', downloadsRouter);
app.use('/api/enrollments', enrollmentsRouter);
app.use('/api/certificates', certificatesRouter);

app.get('/api/banner', (req, res) => {
  res.json(getBanner());
});
app.put('/api/banner', (req, res) => {
  const banner = updateBanner(req.body);
  res.json(banner);
});

app.get('/order', (req, res) => {
  res.redirect(301, '/products');
});

const candidateBuildDirs = [
  path.join(__dirname, 'build'),
  path.join(__dirname, '..', 'client', 'build'),
  path.join(process.cwd(), 'client', 'build'),
  path.join(process.cwd(), 'server', 'build'),
  path.join(process.cwd(), 'nodejs', 'client', 'build'),
  path.join(process.cwd(), 'nodejs', 'server', 'build'),
  path.join(__dirname, 'client', 'build'),
  path.join(__dirname, '..', '..', 'client', 'build'),
  path.join(__dirname, '..', 'nodejs', 'client', 'build'),
  '/home/u341249923/domains/adornconnect.com/nodejs/client/build',
  '/home/u341249923/domains/adornconnect.com/nodejs/server/build',
  '/home/u341249923/domains/adornconnect.com/public_html/client/build',
  '/home/u341249923/domains/adornconnect.com/client/build',
];

const validBuildDirs = candidateBuildDirs.filter(p => {
  try {
    return fs.existsSync(p) && fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, 'index.html'));
  } catch {
    return false;
  }
});

const buildDir = validBuildDirs[0] || [
  path.join(__dirname, 'build'),
  path.join(__dirname, '..', 'client', 'build'),
  path.join(process.cwd(), 'client', 'build'),
].find(p => { try { return fs.statSync(p).isDirectory(); } catch { return false; } }) || path.join(__dirname, 'build');

const fallbackHtmlPath = path.join(__dirname, 'index-fallback.html');
let cachedIndexHtml = '';

// Pre-load cached index.html from disk if available
try {
  const initialIndexPath = path.join(buildDir, 'index.html');
  if (fs.existsSync(initialIndexPath)) {
    cachedIndexHtml = fs.readFileSync(initialIndexPath, 'utf8');
  } else if (fs.existsSync(fallbackHtmlPath)) {
    cachedIndexHtml = fs.readFileSync(fallbackHtmlPath, 'utf8');
  }
} catch (e) {}

// Health check and diagnostic API
app.get('/api/health', (req, res) => {
  const staticJsFiles = [];
  try {
    for (const bDir of (validBuildDirs.length ? validBuildDirs : [buildDir])) {
      const jsDir = path.join(bDir, 'static', 'js');
      if (fs.existsSync(jsDir)) {
        staticJsFiles.push(...fs.readdirSync(jsDir));
        break;
      }
    }
  } catch (e) {}

  res.json({
    status: 'ok',
    cwd: process.cwd(),
    dirname: __dirname,
    activeBuildDir: buildDir,
    availableBuildDirs: validBuildDirs,
    hasIndexHtml: fs.existsSync(path.join(buildDir, 'index.html')),
    staticJsFiles,
    timestamp: new Date().toISOString()
  });
});

function sendRebuildingPage(res) {
  res.status(200).type('html').send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="refresh" content="2" />
  <title>ADORN — Updating Application...</title>
  <style>
    body {
      margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #0b1528; color: #fff; min-height: 100vh;
      display: flex; align-items: center; justify-content: center; text-align: center; padding: 20px;
    }
    .box {
      background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
      padding: 38px 28px; border-radius: 16px; max-width: 460px; width: 100%;
      box-shadow: 0 20px 50px rgba(0,0,0,0.4);
    }
    .spinner {
      width: 36px; height: 36px; border: 3px solid rgba(109,59,255,0.25);
      border-top-color: #6d3bff; border-radius: 50%;
      animation: spin 0.8s linear infinite; margin: 0 auto 18px;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    h2 { margin: 0 0 8px; font-size: 1.3rem; font-weight: 700; color: #fff; }
    p { margin: 0; font-size: 0.88rem; color: #94a3b8; line-height: 1.5; }
  </style>
</head>
<body>
  <div class="box">
    <div class="spinner"></div>
    <h2>Updating Application</h2>
    <p>Loading the latest assets. This page will refresh automatically in 2 seconds...</p>
  </div>
</body>
</html>`);
}

// Register static handlers for all detected build directories
const staticOptions = {
  maxAge: '1h',
  etag: true,
  setHeaders: (res, p) => {
    if (p.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    } else if (p.match(/\.(js|css)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
  }
};

validBuildDirs.forEach(dir => {
  try {
    app.use(express.static(dir, staticOptions));
    const subStatic = path.join(dir, 'static');
    if (fs.existsSync(subStatic)) {
      app.use('/static', express.static(subStatic, { maxAge: '31536000', immutable: true }));
    }
  } catch (e) {}
});

app.use(express.static(buildDir, staticOptions));
try {
  const primarySubStatic = path.join(buildDir, 'static');
  if (fs.existsSync(primarySubStatic)) {
    app.use('/static', express.static(primarySubStatic, { maxAge: '31536000', immutable: true }));
  }
} catch (e) {}

app.get('*', (req, res, next) => {
  // Never intercept API routes or upload assets with index.html fallback
  if (req.path.startsWith('/api/') || req.path.startsWith('/uploads/')) {
    return next();
  }

  // CRITICAL: Never return index.html for static asset requests (js, css, map, images, fonts, etc.)
  // Returning HTML for a JS file causes "Uncaught SyntaxError: Unexpected token '<'" in the browser,
  // which crashes React and leaves the user with a blank white page!
  if (req.path.match(/\.(js|css|map|png|jpg|jpeg|gif|svg|ico|woff2?|ttf|eot|json|txt|pdf|webp)$/i)) {
    for (const bDir of (validBuildDirs.length ? validBuildDirs : [buildDir])) {
      try {
        const relPath = req.path.replace(/^\//, '');
        const directCandidate = path.join(bDir, relPath);
        if (fs.existsSync(directCandidate)) {
          return res.sendFile(directCandidate);
        }
      } catch (e) {}
    }
    return res.status(404).type('text/plain').send(`Asset not found: ${req.path}`);
  }

  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  const indexPath = path.join(buildDir, 'index.html');

  // Check if current index.html exists
  if (fs.existsSync(indexPath)) {
    try {
      const html = fs.readFileSync(indexPath, 'utf8');
      if (html && html.includes('<div id="root">')) {
        cachedIndexHtml = html;
      }
    } catch (e) {}

    return res.sendFile(indexPath, (err) => {
      if (err && !res.headersSent) {
        if (cachedIndexHtml) {
          return res.type('html').send(cachedIndexHtml);
        }
        return sendRebuildingPage(res);
      }
    });
  }

  // If index.html is temporarily deleted during compilation, serve cached fallback
  if (cachedIndexHtml) {
    return res.type('html').send(cachedIndexHtml);
  }

  if (fs.existsSync(fallbackHtmlPath)) {
    try {
      cachedIndexHtml = fs.readFileSync(fallbackHtmlPath, 'utf8');
      return res.type('html').send(cachedIndexHtml);
    } catch (e) {}
  }

  return sendRebuildingPage(res);
});

app.use((err, req, res, next) => {
  console.error('ERROR:', err);
  if (err && err.code === 'ENOENT' && err.path && err.path.includes('index.html')) {
    if (cachedIndexHtml && !res.headersSent) {
      return res.type('html').send(cachedIndexHtml);
    }
    if (!res.headersSent) {
      return sendRebuildingPage(res);
    }
  }
  if (!res.headersSent) {
    res.status(500).json({ error: err.message });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found: ' + req.method + ' ' + req.url });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
