const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  const { id } = req.query;
  if (id) {
    const c = db.getCategory(id);
    if (!c) return res.status(404).json({ error: 'not found' });
    return res.json(c);
  }
  res.json(db.getCategories());
});

router.post('/', (req, res) => {
  console.log('CATEGORIES POST handler called, body:', JSON.stringify(req.body));
  const { id, label, icon } = req.body;
  if (!id || !label) {
    console.log('Missing id or label');
    return res.status(400).json({ error: 'id and label required' });
  }

  const exists = db.getCategory(id);
  if (exists) {
    console.log('Category already exists:', id);
    return res.status(409).json({ error: 'Category with this ID already exists' });
  }

  try {
    db.addCategory({ id, label, icon: icon || 'fas fa-box' });
    console.log('Category created:', id);
    res.status(201).json({ success: true });
  } catch (e) {
    console.log('Error creating category:', e.message);
    res.status(500).json({ error: e.message });
  }
});

router.put('/', (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'id required' });

  if (!db.getCategory(id)) return res.status(404).json({ error: 'not found' });

  const { label, icon } = req.body;
  db.updateCategory(id, { label: label || '', icon: icon || 'fas fa-box' });
  res.json({ success: true });
});

router.delete('/', (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'id required' });

  if (!db.getCategory(id)) return res.status(404).json({ error: 'not found' });

  db.deleteCategory(id);
  res.json({ success: true });
});

module.exports = router;
