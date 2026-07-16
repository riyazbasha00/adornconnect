const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'data.json');

let data = null;

function load() {
  if (!data) {
    const raw = fs.readFileSync(DATA_PATH, 'utf-8');
    data = JSON.parse(raw);
    if (!data.products) data.products = [];
    if (!data.categories) data.categories = [];
  }
  return data;
}

function save() {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

function getProducts() {
  return load().products;
}

function getProduct(sku) {
  return load().products.find(p => p.sku === sku) || null;
}

function addProduct(p) {
  const d = load();
  d.products.unshift({ ...p, created_at: new Date().toISOString() });
  save();
}

function updateProduct(sku, updates) {
  const d = load();
  const idx = d.products.findIndex(p => p.sku === sku);
  if (idx === -1) return false;
  d.products[idx] = { ...d.products[idx], ...updates, sku };
  save();
  return true;
}

function deleteProduct(sku) {
  const d = load();
  const len = d.products.length;
  d.products = d.products.filter(p => p.sku !== sku);
  if (d.products.length === len) return false;
  save();
  return true;
}

function getCategories() {
  return load().categories;
}

function getCategory(id) {
  return load().categories.find(c => c.id === id) || null;
}

function addCategory(c) {
  const d = load();
  d.categories.push({ ...c });
  save();
}

function updateCategory(id, updates) {
  const d = load();
  const idx = d.categories.findIndex(c => c.id === id);
  if (idx === -1) return false;
  d.categories[idx] = { ...d.categories[idx], ...updates, id };
  save();
  return true;
}

function deleteCategory(id) {
  const d = load();
  d.products.forEach(p => { if (p.cat === id) p.cat = null; });
  const len = d.categories.length;
  d.categories = d.categories.filter(c => c.id !== id);
  if (d.categories.length === len) return false;
  save();
  return true;
}

module.exports = {
  getProducts, getProduct, addProduct, updateProduct, deleteProduct,
  getCategories, getCategory, addCategory, updateCategory, deleteCategory,
};
