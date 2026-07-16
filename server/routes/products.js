const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  const { sku, cat, tag, q } = req.query;

  if (sku) {
    const p = db.getProduct(sku);
    if (!p) return res.status(404).json({ error: 'not found' });
    return res.json(p);
  }

  let products = db.getProducts();

  if (cat) products = products.filter(p => p.cat === cat);
  if (tag) products = products.filter(p => p.tags && p.tags.includes(tag));
  if (q) {
    const like = q.toLowerCase();
    products = products.filter(p =>
      (p.name && p.name.toLowerCase().includes(like)) ||
      (p.sku && p.sku.toLowerCase().includes(like)) ||
      (p.desc && p.desc.toLowerCase().includes(like))
    );
  }

  res.json(products);
});

router.post('/', (req, res) => {
  const { sku, name, cat, desc, price, unit, img, tags } = req.body;
  if (!sku || !name) return res.status(400).json({ error: 'sku and name required' });

  if (db.getProduct(sku)) return res.status(409).json({ error: 'Product with this SKU already exists' });

  db.addProduct({ sku, name, cat: cat || null, desc: desc || '', price: price || '', unit: unit || '', img: img || '', tags: tags || [] });
  res.status(201).json({ success: true });
});

router.put('/', (req, res) => {
  const { sku } = req.query;
  if (!sku) return res.status(400).json({ error: 'sku required' });

  if (!db.getProduct(sku)) return res.status(404).json({ error: 'not found' });

  const { name, cat, desc, price, unit, img, tags } = req.body;
  db.updateProduct(sku, { name: name || '', cat: cat || null, desc: desc || '', price: price || '', unit: unit || '', img: img || '', tags: tags || [] });
  res.json({ success: true });
});

router.delete('/', (req, res) => {
  const { sku } = req.query;
  if (!sku) return res.status(400).json({ error: 'sku required' });

  if (!db.deleteProduct(sku)) return res.status(404).json({ error: 'not found' });
  res.json({ success: true });
});

module.exports = router;
