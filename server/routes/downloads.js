const express = require('express');
const router = express.Router();
const { getDownloads, addDownload, deleteDownload } = require('../db');

router.get('/', (req, res) => {
  const { category } = req.query;
  let downloads = getDownloads();
  if (category) downloads = downloads.filter(d => d.category === category);
  res.json(downloads);
});

router.post('/', (req, res) => {
  const { title, category, fileUrl, fileName, fileSize } = req.body;
  if (!title || !category || !fileUrl) {
    return res.status(400).json({ error: 'Title, category, and file are required' });
  }
  addDownload({ title, category, fileUrl, fileName: fileName || '', fileSize: fileSize || 0 });
  res.json({ success: true });
});

router.delete('/', (req, res) => {
  const id = req.query.id;
  if (!id) return res.status(400).json({ error: 'ID required' });
  const ok = deleteDownload(id);
  if (!ok) return res.status(404).json({ error: 'Not found' });
  res.json({ success: true });
});

module.exports = router;
