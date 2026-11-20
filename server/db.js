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
    if (!data.banner) data.banner = { images: [] };
    if (!data.downloads) data.downloads = [];
    if (!data.enrollments) data.enrollments = [];
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
  return load().categories.map(c => ({ ...c, enabled: c.enabled !== false }));
}

function getCategory(id) {
  const c = load().categories.find(c => c.id === id) || null;
  if (c && c.enabled === undefined) c.enabled = true;
  return c;
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

function getBanner() {
  const b = load().banner || {};
  if (Array.isArray(b.images)) return { images: b.images };
  return { images: b.image ? [b.image] : [] };
}

function updateBanner(updates) {
  const d = load();
  const current = getBanner();
  if (Array.isArray(updates.images)) {
    d.banner = { images: updates.images };
  } else {
    d.banner = { ...current, ...updates };
  }
  save();
  return d.banner;
}

function getDownloads() {
  return load().downloads || [];
}

function addDownload(item) {
  const d = load();
  if (!d.downloads) d.downloads = [];
  d.downloads.unshift({ id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), ...item, created_at: new Date().toISOString() });
  save();
}

function deleteDownload(id) {
  const d = load();
  if (!d.downloads) return false;
  const len = d.downloads.length;
  d.downloads = d.downloads.filter(dl => dl.id !== id);
  if (d.downloads.length === len) return false;
  save();
  return true;
}

function getEnrollments() {
  return load().enrollments || [];
}

function getEnrollment(id) {
  return (load().enrollments || []).find(e => e.id === id) || null;
}

function addEnrollment(item) {
  const d = load();
  if (!d.enrollments) d.enrollments = [];
  const enrollment = {
    id: 'ENR-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).slice(2, 6).toUpperCase(),
    ...item,
    status: item.status || 'Pending',
    created_at: new Date().toISOString()
  };
  d.enrollments.unshift(enrollment);
  save();
  return enrollment;
}

function updateEnrollment(id, updates) {
  const d = load();
  if (!d.enrollments) return false;
  const idx = d.enrollments.findIndex(e => e.id === id);
  if (idx === -1) return false;
  d.enrollments[idx] = { ...d.enrollments[idx], ...updates, id };
  save();
  return d.enrollments[idx];
}

function deleteEnrollment(id) {
  const d = load();
  if (!d.enrollments) return false;
  const len = d.enrollments.length;
  d.enrollments = d.enrollments.filter(e => e.id !== id);
  if (d.enrollments.length === len) return false;
  save();
  return true;
}

module.exports = {
  getProducts, getProduct, addProduct, updateProduct, deleteProduct,
  getCategories, getCategory, addCategory, updateCategory, deleteCategory,
  getBanner, updateBanner,
  getDownloads, addDownload, deleteDownload,
  getEnrollments, getEnrollment, addEnrollment, updateEnrollment, deleteEnrollment,
};
