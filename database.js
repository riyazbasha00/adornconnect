const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(__dirname, 'data', 'adorn.db');

function init() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      label TEXT NOT NULL,
      icon TEXT DEFAULT 'fas fa-box'
    );

    CREATE TABLE IF NOT EXISTS products (
      sku TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      cat TEXT NOT NULL,
      desc TEXT DEFAULT '',
      price TEXT DEFAULT '',
      unit TEXT DEFAULT '',
      img TEXT DEFAULT '',
      tags TEXT DEFAULT '[]',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (cat) REFERENCES categories(id) ON DELETE SET NULL
    );
  `);

  return db;
}

function seed(db) {
  const catCount = db.prepare('SELECT COUNT(*) as c FROM categories').get().c;
  if (catCount > 0) return;

  const defaultCategories = [
    { id: 'cat6-cables', label: 'CAT6 Cables', icon: 'fas fa-cable-car' },
    { id: 'racks-cabinets', label: 'Racks & Cabinets', icon: 'fas fa-th' },
    { id: 'fiber-cables', label: 'Fiber Optic Cables', icon: 'fas fa-lightbulb' },
    { id: 'fiber-accessories', label: 'Fiber Accessories', icon: 'fas fa-puzzle-piece' },
    { id: 'faceplates', label: 'Face Plates, Back Boxes & Patch Panels', icon: 'fas fa-th-large' },
    { id: 'keystone-jacks', label: 'Keystone Jacks', icon: 'fas fa-plug' },
    { id: 'network-cabinets', label: 'Network Cabinets & Server Racks', icon: 'fas fa-server' },
    { id: 'cable-mgmt', label: 'Cable Management Solutions', icon: 'fas fa-tools' },
    { id: 'tools', label: 'Tools & Testing Equipments', icon: 'fas fa-screwdriver-wrench' },
    { id: 'surveillance', label: 'Surveillance Solutions', icon: 'fas fa-video' },
    { id: 'access-control', label: 'Access Control Solutions', icon: 'fas fa-lock' },
    { id: 'intercom', label: 'Intercom Solutions', icon: 'fas fa-phone' },
    { id: 'intrusion-alarm', label: 'Intrusion Alarm', icon: 'fas fa-bell' },
    { id: 'safety-solutions', label: 'Safety Solutions', icon: 'fas fa-shield-alt' },
  ];

  const insCat = db.prepare('INSERT INTO categories (id, label, icon) VALUES (@id, @label, @icon)');
  const tx = db.transaction(() => {
    for (const c of defaultCategories) insCat.run(c);
  });
  tx();

  const productsPath = path.join(__dirname, 'cambo_products.json');
  if (!fs.existsSync(productsPath)) return;

  const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
  const insProd = db.prepare(
    'INSERT INTO products (sku, name, cat, desc, price, unit, img, tags) VALUES (@sku, @name, @cat, @desc, @price, @unit, @img, @tags)'
  );
  const tx2 = db.transaction(() => {
    for (const p of products) {
      insProd.run({
        sku: p.sku,
        name: p.name,
        cat: p.cat || 'cat6-cables',
        desc: p.desc || '',
        price: p.price || '',
        unit: p.unit || '',
        img: p.img || '',
        tags: JSON.stringify(p.tags || []),
      });
    }
  });
  tx2();
}

const db = init();
seed(db);

module.exports = db;
