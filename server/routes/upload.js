const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'uploads'),
  filename(req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, Date.now() + '-' + Math.random().toString(36).slice(2, 6) + ext);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter(req, file, cb) {
    const allowed = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowed.includes(ext)) return cb(new Error('Invalid file type'));
    cb(null, true);
  }
});

router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ url: 'uploads/' + req.file.filename });
});

module.exports = router;
