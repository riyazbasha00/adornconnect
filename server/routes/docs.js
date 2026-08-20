const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const docsDir = path.join(__dirname, '..', '..', 'uploads', 'docs');
if (!fs.existsSync(docsDir)) fs.mkdirSync(docsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: docsDir,
  filename(req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const base = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9-_ ]/g, '').trim();
    cb(null, Date.now() + '-' + base + ext);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter(req, file, cb) {
    const allowed = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.zip', '.rar'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowed.includes(ext)) return cb(new Error('Invalid file type. Allowed: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, ZIP, RAR'));
    cb(null, true);
  }
});

router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({
    url: 'uploads/docs/' + req.file.filename,
    name: req.file.originalname,
    size: req.file.size
  });
});

module.exports = router;
