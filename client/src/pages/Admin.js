import React, { useState, useEffect, useCallback } from 'react';
import {
  fetchProducts, fetchCategories, createProduct, updateProduct, deleteProduct,
  createCategory, updateCategory, deleteCategory, uploadImage
} from '../api';
import './Admin.css';

const LOGIN_KEY = 'adorn_admin';
const DEFAULT_PASS = 'admin123';

const ICON_SUGGESTIONS = [
  'fas fa-cable-car', 'fas fa-plug', 'fas fa-link', 'fas fa-th-large', 'fas fa-th',
  'fas fa-server', 'fas fa-lightbulb', 'fas fa-tools', 'fas fa-screwdriver-wrench',
  'fas fa-video', 'fas fa-lock', 'fas fa-phone', 'fas fa-bell', 'fas fa-shield-alt',
  'fas fa-puzzle-piece', 'fas fa-box', 'fas fa-wifi', 'fas fa-satellite-dish',
  'fas fa-network-wired', 'fas fa-microchip', 'fas fa-bolt', 'fas fa-camera',
  'fas fa-door-open', 'fas fa-key', 'fas fa-fire-extinguisher', 'fas fa-fan',
];

const emptyProduct = { sku: '', name: '', cat: '', desc: '', price: '', unit: '', img: '', tags: [] };
const emptyCategory = { id: '', label: '', icon: 'fas fa-box' };

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [tab, setTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [pForm, setPForm] = useState({ ...emptyProduct });
  const [editIdx, setEditIdx] = useState(-1);
  const [showPModal, setShowPModal] = useState(false);

  const [cForm, setCForm] = useState({ ...emptyCategory });
  const [catEditIdx, setCatEditIdx] = useState(-1);
  const [showCModal, setShowCModal] = useState(false);

  const [toast, setToast] = useState(null);

  const [bulkData, setBulkData] = useState('');
  const [showBulkModal, setShowBulkModal] = useState(false);

  const showToast = useCallback((msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem(LOGIN_KEY);
    if (stored) setLoggedIn(true);
  }, []);

  const loadData = useCallback(async () => {
    try {
      const [prods, cats] = await Promise.all([fetchProducts(), fetchCategories()]);
      setProducts(prods);
      setCategories(cats);
    } catch { setProducts([]); setCategories([]); }
  }, []);

  useEffect(() => {
    if (loggedIn) loadData();
  }, [loggedIn, loadData]);

  const doLogin = () => {
    const stored = localStorage.getItem(LOGIN_KEY);
    const valid = stored ? stored === password : password === DEFAULT_PASS;
    if (valid) {
      if (!stored) localStorage.setItem(LOGIN_KEY, DEFAULT_PASS);
      setLoggedIn(true);
    } else {
      showToast('Incorrect password', 'error');
    }
  };

  // Product CRUD
  const openNewProduct = () => {
    setPForm({ ...emptyProduct });
    setEditIdx(-1);
    setShowPModal(true);
  };

  const openEditProduct = (idx) => {
    const p = products[idx];
    setPForm({ ...p, tags: [...(p.tags || [])] });
    setEditIdx(idx);
    setShowPModal(true);
  };

  const saveProduct = async () => {
    if (!pForm.sku || !pForm.name) { showToast('SKU and name required', 'error'); return; }
    try {
      if (editIdx >= 0) {
        await updateProduct(products[editIdx].sku, pForm);
      } else {
        await createProduct(pForm);
      }
      setShowPModal(false);
      showToast(editIdx >= 0 ? 'Product updated' : 'Product created');
      await loadData();
    } catch (e) { showToast(e.message, 'error'); }
  };

  const removeProduct = async (idx) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await deleteProduct(products[idx].sku);
      showToast('Product deleted');
      await loadData();
    } catch (e) { showToast(e.message, 'error'); }
  };

  // Category CRUD
  const openNewCategory = () => {
    setCForm({ ...emptyCategory });
    setCatEditIdx(-1);
    setShowCModal(true);
  };

  const openEditCategory = (idx) => {
    const c = categories[idx];
    setCForm({ ...c });
    setCatEditIdx(idx);
    setShowCModal(true);
  };

  const saveCategory = async () => {
    if (!cForm.id || !cForm.label) { showToast('ID and label required', 'error'); return; }
    try {
      if (catEditIdx >= 0) {
        await updateCategory(categories[catEditIdx].id, cForm);
      } else {
        await createCategory(cForm);
      }
      setShowCModal(false);
      showToast(catEditIdx >= 0 ? 'Category updated' : 'Category created');
      await loadData();
    } catch (e) { showToast(e.message, 'error'); }
  };

  const removeCategory = async (idx) => {
    if (!window.confirm('Delete this category? Products in it will be uncategorized.')) return;
    try {
      await deleteCategory(categories[idx].id);
      showToast('Category deleted');
      await loadData();
    } catch (e) { showToast(e.message, 'error'); }
  };

  // Import/Export
  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(products, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'products_export.json';
    a.click();
  };

  const importJSON = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const data = JSON.parse(await file.text());
        if (!Array.isArray(data)) throw new Error('Invalid format');
        let count = 0;
        for (const p of data) {
          if (p.sku && p.name) {
            try { await createProduct(p); count++; }
            catch { /* duplicate, skip */ }
          }
        }
        showToast(`Imported ${count} products`);
        await loadData();
      } catch (err) { showToast('Import failed: ' + err.message, 'error'); }
    };
    input.click();
  };

  const parseCSV = (text) => {
    const lines = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim().split('\n');
    if (lines.length < 2) throw new Error('CSV must have a header row and at least one data row');
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const required = ['sku', 'name'];
    for (const r of required) {
      if (!headers.includes(r)) throw new Error(`CSV missing required column: "${r}"`);
    }
    const results = [];
    const errors = [];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      const vals = [];
      let current = '', inQ = false;
      for (let c = 0; c < line.length; c++) {
        const ch = line[c];
        if (ch === '"') { inQ = !inQ; continue; }
        if (ch === ',' && !inQ) { vals.push(current.trim()); current = ''; continue; }
        current += ch;
      }
      vals.push(current.trim());
      if (vals.length === 1 && !vals[0]) continue;
      const row = {};
      headers.forEach((h, idx) => {
        let val = vals[idx] || '';
        if (h === 'tags') val = val ? val.split('|').map(t => t.trim()).filter(Boolean) : [];
        row[h] = val;
      });
      if (row.sku && row.name) {
        results.push(row);
      } else {
        errors.push(`Row ${i + 1}: missing sku or name (${line.substring(0, 60)})`);
      }
    }
    if (errors.length) throw new Error('Parse errors:\n' + errors.join('\n'));
    return results;
  };

  const downloadTemplate = () => {
    const example = ['sku', 'name', 'cat', 'desc', 'price', 'unit', 'img', 'tags'];
    const row1 = ['CAMBO-XXXX', 'Product Name', 'surveillance', '"Description with, commas here"', 'AED 0', '/pc', 'https://example.com/img.jpg', 'featured|bestseller'];
    const csv = example.join(',') + '\n' + row1.join(',') + '\n';
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'bulk_upload_template.csv';
    a.click();
  };

  const doBulkUpload = async () => {
    try {
      const rows = parseCSV(bulkData);
      if (!rows.length) { showToast('No valid rows found', 'error'); return; }
      let count = 0, fail = 0;
      for (const row of rows) {
        try {
          const payload = { ...row };
          if (payload.price) payload.price = payload.price;
          if (payload.unit) payload.unit = payload.unit;
          await createProduct(payload);
          count++;
        } catch (e) {
          fail++;
          console.error('Bulk upload row error:', row.sku, e.message);
        }
      }
      setShowBulkModal(false);
      setBulkData('');
      showToast(`Uploaded ${count} of ${rows.length} products${fail ? ` (${fail} failed)` : ''}`);
      await loadData();
    } catch (e) { showToast(e.message, 'error'); }
  };

  const handleBulkFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => setBulkData(e.target.result);
    reader.readAsText(file);
  };

  const quickUpdate = async (idx, updates) => {
    const p = products[idx];
    try {
      await updateProduct(p.sku, { ...p, ...updates });
      await loadData();
    } catch (e) { showToast(e.message, 'error'); }
  };

  const handleUpload = async (file) => {
    try {
      const res = await uploadImage(file);
      setPForm(prev => ({ ...prev, img: res.url }));
    } catch (e) { showToast(e.message, 'error'); }
  };

  const toggleTag = (tag) => {
    setPForm(prev => {
      const tags = prev.tags.includes(tag) ? prev.tags.filter(t => t !== tag) : [...prev.tags, tag];
      return { ...prev, tags };
    });
  };

  if (!loggedIn) {
    return (
      <div className="login-screen">
        <div className="login-box">
          <h1>Admin Panel</h1>
          <p>Enter password to manage products</p>
          <input type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && doLogin()} />
          <button className="btn btn-primary" onClick={doLogin} style={{ width: '100%', justifyContent: 'center' }}>Login</button>
        </div>
      </div>
    );
  }

  const prodCount = products.length;
  const catCount = categories.length;
  const featuredCount = products.filter(p => p.tags && p.tags.includes('featured')).length;

  return (
    <div className="admin-layout">
      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}

      <aside className="admin-sidebar">
        <h2>ADORN Admin</h2>
        <a href="#!" className={tab === 'dashboard' ? 'active' : ''} onClick={() => setTab('dashboard')}><i className="fas fa-chart-pie"></i> Dashboard</a>
        <a href="#!" className={tab === 'products' ? 'active' : ''} onClick={() => setTab('products')}><i className="fas fa-box"></i> Products</a>
        <a href="#!" className={tab === 'categories' ? 'active' : ''} onClick={() => setTab('categories')}><i className="fas fa-list"></i> Categories</a>
        <a href="#!" className={tab === 'images' ? 'active' : ''} onClick={() => setTab('images')}><i className="fas fa-images"></i> Images</a>
      </aside>

      <main className="admin-main">
        {tab === 'dashboard' && (
          <div className="tab-content">
            <h2 className="tab-title">Dashboard</h2>
            <div className="dash-grid">
              <div className="dash-card"><i className="fas fa-box"></i><strong>{prodCount}</strong><span>Products</span></div>
              <div className="dash-card"><i className="fas fa-list"></i><strong>{catCount}</strong><span>Categories</span></div>
              <div className="dash-card"><i className="fas fa-star"></i><strong>{featuredCount}</strong><span>Featured</span></div>
            </div>
          </div>
        )}

        {tab === 'products' && (
          <div className="tab-content">
            <div className="tab-header">
              <h2 className="tab-title">Products</h2>
              <div className="tab-actions">
                <button className="btn btn-outline" onClick={exportJSON}><i className="fas fa-download"></i> Export</button>
                <button className="btn btn-outline" onClick={importJSON}><i className="fas fa-upload"></i> Import JSON</button>
                <button className="btn btn-outline" onClick={() => { setBulkData(''); setShowBulkModal(true); }}><i className="fas fa-table"></i> Bulk Upload</button>
                <button className="btn btn-primary" onClick={openNewProduct}><i className="fas fa-plus"></i> Add Product</button>
              </div>
            </div>
            <div className="table-wrap">
              <table className="admin-table">
                <thead><tr><th>SKU</th><th>Name</th><th>Category</th><th>Tags</th><th>Actions</th></tr></thead>
                <tbody>
                  {products.map((p, i) => (
                    <tr key={p.sku}>
                      <td><code>{p.sku}</code></td>
                      <td className="td-name">{p.name}</td>
                      <td>
                        <select className="inline-select" value={p.cat || ''} onChange={e => quickUpdate(i, { cat: e.target.value || null })}>
                          <option value="">-- None --</option>
                          {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                        </select>
                      </td>
                      <td>
                        <div className="inline-tags">
                          {['featured', 'bestseller'].map(t => (
                            <button key={t} className={`tag-btn-sm ${p.tags?.includes(t) ? 'on' : ''}`} onClick={() => {
                              const tags = p.tags?.includes(t) ? (p.tags || []).filter(x => x !== t) : [...(p.tags || []), t];
                              quickUpdate(i, { tags });
                            }}>{t}</button>
                          ))}
                        </div>
                      </td>
                      <td className="actions-col">
                        <button className="btn-sm edit" onClick={() => openEditProduct(i)}><i className="fas fa-edit"></i></button>
                        <button className="btn-sm delete" onClick={() => removeProduct(i)}><i className="fas fa-trash"></i></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'categories' && (
          <div className="tab-content">
            <div className="tab-header">
              <h2 className="tab-title">Categories</h2>
              <button className="btn btn-primary" onClick={openNewCategory}><i className="fas fa-plus"></i> Add Category</button>
            </div>
            <div className="table-wrap">
              <table className="admin-table">
                <thead><tr><th>ID</th><th>Label</th><th>Icon</th><th>Actions</th></tr></thead>
                <tbody>
                  {categories.map((c, i) => (
                    <tr key={c.id}>
                      <td><code>{c.id}</code></td>
                      <td>{c.label}</td>
                      <td><i className={c.icon}></i> {c.icon}</td>
                      <td className="actions-col">
                        <button className="btn-sm edit" onClick={() => openEditCategory(i)}><i className="fas fa-edit"></i></button>
                        <button className="btn-sm delete" onClick={() => removeCategory(i)}><i className="fas fa-trash"></i></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Product Modal */}
      {showPModal && (
        <div className="modal-overlay" onClick={() => setShowPModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>{editIdx >= 0 ? 'Edit Product' : 'New Product'}</h3>
            <div className="modal-grid">
              <label>SKU <input value={pForm.sku} onChange={e => setPForm({ ...pForm, sku: e.target.value })} placeholder="e.g. CAMBO-XXXX" /></label>
              <label>Name <input value={pForm.name} onChange={e => setPForm({ ...pForm, name: e.target.value })} placeholder="Product name" /></label>
              <label>Category
                <select value={pForm.cat} onChange={e => setPForm({ ...pForm, cat: e.target.value })}>
                  <option value="">-- Select --</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </label>
              <label>Price <input value={pForm.price} onChange={e => setPForm({ ...pForm, price: e.target.value })} placeholder="e.g. AED 45" /></label>
              <label>Unit <input value={pForm.unit} onChange={e => setPForm({ ...pForm, unit: e.target.value })} placeholder="e.g. /box" /></label>
              <label className="full">Description <textarea value={pForm.desc} onChange={e => setPForm({ ...pForm, desc: e.target.value })} rows={3} /></label>
              <label className="full">Image URL <input value={pForm.img} onChange={e => setPForm({ ...pForm, img: e.target.value })} placeholder="https://..." /></label>
              <label className="full">
                Upload Image
                <input type="file" accept="image/*" onChange={e => e.target.files[0] && handleUpload(e.target.files[0])} />
              </label>
              <div className="full tags-row">
                <span className="tag-label">Tags:</span>
                {['featured', 'bestseller'].map(t => (
                  <button key={t} className={`tag-btn ${pForm.tags.includes(t) ? 'on' : ''}`} onClick={() => toggleTag(t)}>{t}</button>
                ))}
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setShowPModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={saveProduct}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Upload Modal */}
      {showBulkModal && (
        <div className="modal-overlay" onClick={() => setShowBulkModal(false)}>
          <div className="modal modal-wide" onClick={e => e.stopPropagation()}>
            <h3>Bulk Upload Products</h3>
            <p className="bulk-hint">Upload a CSV file or paste CSV data below. Required columns: <code>sku</code>, <code>name</code>. Optional: <code>cat</code>, <code>desc</code>, <code>price</code>, <code>unit</code>, <code>img</code>, <code>tags</code> (pipe-separated).</p>
            <div className="bulk-file-row">
              <button className="btn btn-outline" onClick={downloadTemplate}><i className="fas fa-download"></i> Download Template</button>
              <span className="bulk-or">or</span>
              <input type="file" accept=".csv,.txt" onChange={e => e.target.files[0] && handleBulkFile(e.target.files[0])} />
            </div>
            <textarea className="bulk-textarea" value={bulkData} onChange={e => setBulkData(e.target.value)} rows={8} placeholder={`sku,name,cat,desc,price,unit,tags\nCAMBO-CAM,IP Camera,surveillance,HD security camera,AED 120,/pc,featured|bestseller`}></textarea>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setShowBulkModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={doBulkUpload} disabled={!bulkData.trim()}><i className="fas fa-upload"></i> Upload</button>
            </div>
          </div>
        </div>
      )}

      {/* Category Modal */}
      {showCModal && (
        <div className="modal-overlay" onClick={() => setShowCModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>{catEditIdx >= 0 ? 'Edit Category' : 'New Category'}</h3>
            <div className="modal-grid">
              <label>ID <input value={cForm.id} onChange={e => setCForm({ ...cForm, id: e.target.value })} placeholder="e.g. cat6-cables" disabled={catEditIdx >= 0} /></label>
              <label>Label <input value={cForm.label} onChange={e => setCForm({ ...cForm, label: e.target.value })} placeholder="Category name" /></label>
              <label className="full">Icon
                <div className="icon-picker">
                  {ICON_SUGGESTIONS.map(ic => (
                    <button key={ic} className={`icon-opt ${cForm.icon === ic ? 'active' : ''}`} onClick={() => setCForm({ ...cForm, icon: ic })} title={ic}>
                      <i className={ic}></i>
                    </button>
                  ))}
                </div>
              </label>
            </div>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setShowCModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={saveCategory}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
