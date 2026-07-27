const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

let sharp;
try { sharp = require('sharp'); } catch {}

const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename(req, file, cb) {
    const ext = sharp ? '.webp' : path.extname(file.originalname).toLowerCase();
    cb(null, Date.now() + '-' + Math.random().toString(36).slice(2, 6) + ext);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter(req, file, cb) {
    const allowed = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.tiff'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowed.includes(ext)) return cb(new Error('Invalid file type'));
    cb(null, true);
  }
});

async function convertToWebp(filePath) {
  if (!sharp || !fs.existsSync(filePath)) return filePath;
  if (filePath.endsWith('.webp')) return filePath;
  const webpPath = filePath.replace(/\.[^.]+$/, '.webp');
  try {
    await sharp(filePath).webp({ quality: 80 }).toFile(webpPath);
    fs.unlinkSync(filePath);
    return webpPath;
  } catch { return filePath; }
}

router.post('/', upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const converted = await convertToWebp(req.file.path);
  res.json({ url: 'uploads/' + path.basename(converted) });
});

router.post('/bulk', upload.array('images', 100), async (req, res) => {
  if (!req.files || !req.files.length) return res.status(400).json({ error: 'No files uploaded' });
  const results = [];
  for (const f of req.files) {
    const converted = await convertToWebp(f.path);
    const sku = path.basename(f.originalname, path.extname(f.originalname)).trim();
    results.push({ sku, url: 'uploads/' + path.basename(converted) });
  }
  res.json(results);
});

module.exports = router;
