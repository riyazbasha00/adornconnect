import React, { useState, useEffect, useCallback } from 'react';
import {
  fetchProducts, fetchCategories, createProduct, updateProduct, deleteProduct,
  createCategory, updateCategory, deleteCategory, uploadImage, imgUrl,
  fetchBanner, updateBanner as apiUpdateBanner,
  fetchDownloads, addDownload, deleteDownload, uploadDocument,
  fetchEnrollments, updateEnrollment as apiUpdateEnrollment, deleteEnrollment as apiDeleteEnrollment,
  fetchCertificates, createCertificate, updateCertificate as apiUpdateCertificate, deleteCertificate as apiDeleteCertificate
} from '../api';
import { QRCodeView } from '../utils/qr';
import './Admin.css';

const LOGIN_KEY = 'adorn_admin';
const DEFAULT_PASS = 'admin123';

const emptyProduct = { sku: '', name: '', cat: '', desc: '', price: '', unit: '', img: '', tags: [] };
const emptyCategory = { id: '', label: '', enabled: true };

const emptyCert = {
  certNumber: '',
  candidateName: '',
  email: '',
  phone: '',
  company: '',
  courseName: 'Certified Structured Cabling Specialist (Level 1)',
  courseId: 'structured-cabling',
  issueDate: new Date().toISOString().slice(0, 10),
  expiryDate: new Date(Date.now() + 3 * 365 * 86400000).toISOString().slice(0, 10),
  grade: 'Distinction (95%)',
  issuer: 'ADORN Academy Technical Board',
  trainerName: 'Eng. Tariq Al Nuaimi',
  status: 'Active',
  notes: ''
};

const STANDARD_COURSES = [
  'Certified Structured Cabling Specialist (Level 1)',
  'Certified Fiber Optic Specialist (Single-Mode & Multi-Mode)',
  'Structured Cabling System Design & Engineering',
  'ELV & Intelligent Infrastructure Professional',
  'Copper Networking & High-Speed Testing (Cat6 & Cat6A)',
  'ADORN Master Network Infrastructure Engineer'
];

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

  const [imgSku, setImgSku] = useState('');
  const [imgPreview, setImgPreview] = useState(null);
  const [imgUploading, setImgUploading] = useState(false);

  const [bannerSlides, setBannerSlides] = useState([]);
  const [bannerLoading, setBannerLoading] = useState(false);

  const [bulkImgUploading, setBulkImgUploading] = useState(false);
  const [bulkImgProgress, setBulkImgProgress] = useState(null);

  const [downloads, setDownloads] = useState([]);
  const [dlCategory, setDlCategory] = useState('product-catalogue');
  const [dlTitle, setDlTitle] = useState('');
  const [dlUploading, setDlUploading] = useState(false);

  const [enrollments, setEnrollments] = useState([]);
  const [enrFilterStatus, setEnrFilterStatus] = useState('all');
  const [enrFilterEmirate, setEnrFilterEmirate] = useState('all');
  const [enrSearch, setEnrSearch] = useState('');
  const [selectedEnr, setSelectedEnr] = useState(null);

  const [certificates, setCertificates] = useState([]);
  const [certFilterStatus, setCertFilterStatus] = useState('all');
  const [certSearch, setCertSearch] = useState('');
  const [certForm, setCertForm] = useState({ ...emptyCert });
  const [editCertIdx, setEditCertIdx] = useState(-1);
  const [showCertModal, setShowCertModal] = useState(false);
  const [selectedPrintCert, setSelectedPrintCert] = useState(null);
  const [copiedCertNum, setCopiedCertNum] = useState('');

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
      const [prods, cats, banner, dl, enrs, certs] = await Promise.all([
        fetchProducts(),
        fetchCategories(true),
        fetchBanner(),
        fetchDownloads(),
        fetchEnrollments(),
        fetchCertificates()
      ]);
      setProducts(prods);
      setCategories(cats);
      if (banner && Array.isArray(banner.images)) setBannerSlides(banner.images);
      setDownloads(dl || []);
      setEnrollments(enrs || []);
      setCertificates(certs || []);
    } catch {
      setProducts([]);
      setCategories([]);
      setEnrollments([]);
      setCertificates([]);
    }
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

  const toggleCategory = async (idx) => {
    const c = categories[idx];
    const newValue = c.enabled === false ? true : false;
    try {
      await updateCategory(c.id, { enabled: newValue });
      await loadData();
    } catch (e) { showToast(e.message, 'error'); }
  };

  const handleUpload = async (file) => {
    try {
      const res = await uploadImage(file);
      setPForm(prev => ({ ...prev, img: res.url }));
    } catch (e) { showToast(e.message, 'error'); }
  };

  const handleImgUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !imgSku) return;
    setImgPreview(URL.createObjectURL(file));
    setImgUploading(true);
    try {
      const res = await uploadImage(file);
      const idx = products.findIndex(p => p.sku === imgSku);
      if (idx >= 0) await quickUpdate(idx, { img: res.url });
      setImgUploading(false);
      setImgPreview(null);
      showToast('Image uploaded for ' + imgSku);
      setImgSku('');
    } catch (err) { setImgUploading(false); showToast(err.message, 'error'); }
  };

  const handleBulkImgUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setBulkImgUploading(true);
    setBulkImgProgress({ total: files.length, done: 0, matched: 0, skipped: 0, errors: [] });
    let matched = 0, skipped = 0, errors = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const sku = file.name.replace(/\.[^.]+$/, '').trim();
      const p = products.find(p => p.sku === sku);
      if (!p) {
        skipped++;
        setBulkImgProgress(prev => prev ? { ...prev, done: i + 1, matched, skipped, errors } : prev);
        continue;
      }
      try {
        const res = await uploadImage(file);
        await updateProduct(sku, { ...p, img: res.url });
        matched++;
      } catch (err) { errors.push(sku + ': ' + err.message); }
      setBulkImgProgress(prev => prev ? { ...prev, done: i + 1, matched, skipped, errors } : prev);
    }
    setBulkImgUploading(false);
    await loadData();
    showToast(`Done: ${matched} matched, ${skipped} skipped` + (errors.length ? `, ${errors.length} errors` : ''));
    e.target.value = '';
  };

  const toggleTag = (tag) => {
    setPForm(prev => {
      const tags = prev.tags.includes(tag) ? prev.tags.filter(t => t !== tag) : [...prev.tags, tag];
      return { ...prev, tags };
    });
  };

  const handleBannerUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setBannerLoading(true);
    try {
      const res = await uploadImage(file);
      const next = [...bannerSlides, res.url];
      await apiUpdateBanner({ images: next });
      setBannerSlides(next);
      showToast('Banner slide added');
    } catch (err) { showToast(err.message, 'error'); }
    setBannerLoading(false);
    e.target.value = '';
  };

  const removeBannerSlide = async (idx) => {
    const next = bannerSlides.filter((_, i) => i !== idx);
    try {
      await apiUpdateBanner({ images: next });
      setBannerSlides(next);
      showToast('Banner slide removed');
    } catch (err) { showToast(err.message, 'error'); }
  };

  const moveBannerSlide = async (idx, dir) => {
    const next = [...bannerSlides];
    const to = idx + dir;
    if (to < 0 || to >= next.length) return;
    [next[idx], next[to]] = [next[to], next[idx]];
    try {
      await apiUpdateBanner({ images: next });
      setBannerSlides(next);
    } catch (err) { showToast(err.message, 'error'); }
  };

  const handleUpdateEnrollmentStatus = async (id, newStatus) => {
    try {
      await apiUpdateEnrollment(id, { status: newStatus });
      setEnrollments(prev => prev.map(e => e.id === id ? { ...e, status: newStatus } : e));
      if (selectedEnr && selectedEnr.id === id) {
        setSelectedEnr(prev => ({ ...prev, status: newStatus }));
      }
      showToast(`Status updated to ${newStatus}`);
    } catch (err) {
      showToast(err.message || 'Failed to update status', 'error');
    }
  };

  const handleDeleteEnrollment = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course registration?')) return;
    try {
      await apiDeleteEnrollment(id);
      setEnrollments(prev => prev.filter(e => e.id !== id));
      if (selectedEnr && selectedEnr.id === id) setSelectedEnr(null);
      showToast('Registration deleted');
    } catch (err) {
      showToast(err.message || 'Failed to delete registration', 'error');
    }
  };

  const exportEnrollmentsCSV = () => {
    if (enrollments.length === 0) {
      showToast('No enrollments to export', 'error');
      return;
    }
    const headers = ['ID', 'Date', 'Candidate Name', 'Email', 'Phone', 'Course', 'Emirate', 'Company', 'Designation', 'Mode', 'Batch', 'SIRA License', 'Status', 'Notes'];
    const rows = enrollments.map(e => [
      `"${e.id || ''}"`,
      `"${e.created_at ? new Date(e.created_at).toISOString() : ''}"`,
      `"${(e.fullName || '').replace(/"/g, '""')}"`,
      `"${(e.email || '').replace(/"/g, '""')}"`,
      `"${(e.phone || '').replace(/"/g, '""')}"`,
      `"${(e.courseName || '').replace(/"/g, '""')}"`,
      `"${(e.emirate || '').replace(/"/g, '""')}"`,
      `"${(e.company || '').replace(/"/g, '""')}"`,
      `"${(e.designation || '').replace(/"/g, '""')}"`,
      `"${(e.trainingMode || '').replace(/"/g, '""')}"`,
      `"${(e.preferredBatch || '').replace(/"/g, '""')}"`,
      `"${(e.siraLicense || '').replace(/"/g, '""')}"`,
      `"${(e.status || '').replace(/"/g, '""')}"`,
      `"${(e.notes || '').replace(/"/g, '""')}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `adorn_academy_enrollments_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
  const bestSellingCount = products.filter(p => p.tags && p.tags.includes('bestseller')).length;
  const dlCount = downloads.length;
  const enrCount = enrollments.length;

  const filteredEnrollments = enrollments.filter(e => {
    const matchStatus = enrFilterStatus === 'all' || (e.status && e.status.toLowerCase() === enrFilterStatus.toLowerCase());
    const matchEmirate = enrFilterEmirate === 'all' || (e.emirate && e.emirate.toLowerCase() === enrFilterEmirate.toLowerCase());
    const q = enrSearch.trim().toLowerCase();
    const matchSearch = !q || (
      (e.fullName && e.fullName.toLowerCase().includes(q)) ||
      (e.email && e.email.toLowerCase().includes(q)) ||
      (e.phone && e.phone.toLowerCase().includes(q)) ||
      (e.company && e.company.toLowerCase().includes(q)) ||
      (e.courseName && e.courseName.toLowerCase().includes(q)) ||
      (e.id && e.id.toLowerCase().includes(q))
    );
    return matchStatus && matchEmirate && matchSearch;
  });

  const generateRandom12Digits = () => {
    let num = Math.floor(1 + Math.random() * 9).toString();
    for (let i = 0; i < 11; i++) {
      num += Math.floor(Math.random() * 10);
    }
    return num;
  };

  const format12 = (val) => {
    if (!val) return '';
    const digits = val.toString().replace(/\D/g, '').slice(0, 12);
    const parts = [];
    for (let i = 0; i < digits.length; i += 4) {
      parts.push(digits.slice(i, i + 4));
    }
    return parts.join(' - ');
  };

  const openNewCert = () => {
    const today = new Date();
    const threeYears = new Date(today);
    threeYears.setFullYear(today.getFullYear() + 3);

    setCertForm({
      ...emptyCert,
      certNumber: generateRandom12Digits(),
      issueDate: today.toISOString().slice(0, 10),
      expiryDate: threeYears.toISOString().slice(0, 10),
    });
    setEditCertIdx(-1);
    setShowCertModal(true);
  };

  const openEditCert = (idx) => {
    const c = filteredCertificates[idx];
    setCertForm({ ...c });
    setEditCertIdx(idx);
    setShowCertModal(true);
  };

  const saveCert = async () => {
    if (!certForm.candidateName || !certForm.candidateName.trim()) {
      showToast('Candidate name is required', 'error');
      return;
    }
    if (!certForm.courseName || !certForm.courseName.trim()) {
      showToast('Course name is required', 'error');
      return;
    }
    const cleanNum = (certForm.certNumber || '').toString().replace(/\D/g, '');
    if (cleanNum.length !== 12) {
      showToast('Certificate number must be exactly 12 digits', 'error');
      return;
    }

    try {
      if (editCertIdx >= 0) {
        await apiUpdateCertificate(certForm.id, { ...certForm, certNumber: cleanNum });
        showToast('Certificate updated successfully');
      } else {
        await createCertificate({ ...certForm, certNumber: cleanNum });
        showToast('Certificate issued successfully');
      }
      setShowCertModal(false);
      await loadData();
    } catch (err) {
      showToast(err.message || 'Failed to save certificate', 'error');
    }
  };

  const removeCert = async (id, num) => {
    if (!window.confirm(`Delete certificate ${num}? This action cannot be undone.`)) return;
    try {
      await apiDeleteCertificate(id);
      showToast('Certificate deleted');
      await loadData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleUpdateCertStatus = async (id, status) => {
    try {
      await apiUpdateCertificate(id, { status });
      setCertificates(prev => prev.map(c => c.id === id ? { ...c, status } : c));
      showToast(`Status updated to ${status}`);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const copyCertLink = (certNum) => {
    const url = `${window.location.origin}/verify?cert=${certNum}`;
    navigator.clipboard?.writeText(url).then(() => {
      setCopiedCertNum(certNum);
      setTimeout(() => setCopiedCertNum(''), 2000);
      showToast('Verification link copied to clipboard');
    });
  };

  const certCount = certificates.length;

  const filteredCertificates = certificates.filter(c => {
    const matchStatus = certFilterStatus === 'all' || (c.status && c.status.toLowerCase() === certFilterStatus.toLowerCase());
    if (!matchStatus) return false;
    if (!certSearch.trim()) return true;
    const q = certSearch.trim().toLowerCase();
    const qClean = q.replace(/[\s-]/g, '');
    const numClean = (c.certNumber || '').replace(/[\s-]/g, '').toLowerCase();
    return (
      numClean.includes(qClean) ||
      (c.candidateName && c.candidateName.toLowerCase().includes(q)) ||
      (c.courseName && c.courseName.toLowerCase().includes(q)) ||
      (c.company && c.company.toLowerCase().includes(q)) ||
      (c.email && c.email.toLowerCase().includes(q))
    );
  });

  return (
    <div className="admin-layout">
      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}

      <aside className="admin-sidebar">
        <h2>ADORN Admin</h2>
        <a href="#!" className={tab === 'dashboard' ? 'active' : ''} onClick={() => setTab('dashboard')}><i className="fas fa-chart-pie"></i> Dashboard</a>
        <a href="#!" className={tab === 'products' ? 'active' : ''} onClick={() => setTab('products')}><i className="fas fa-box"></i> Products</a>
        <a href="#!" className={tab === 'categories' ? 'active' : ''} onClick={() => setTab('categories')}><i className="fas fa-list"></i> Categories</a>
        <a href="#!" className={tab === 'images' ? 'active' : ''} onClick={() => setTab('images')}><i className="fas fa-images"></i> Images</a>
        <a href="#!" className={tab === 'banner' ? 'active' : ''} onClick={() => setTab('banner')}><i className="fas fa-image"></i> Banner</a>
        <a href="#!" className={tab === 'downloads' ? 'active' : ''} onClick={() => setTab('downloads')}><i className="fas fa-download"></i> Downloads</a>
        <a href="#!" className={tab === 'enrollments' ? 'active' : ''} onClick={() => setTab('enrollments')}>
          <i className="fas fa-user-graduate"></i> Enrollments
          {enrCount > 0 && <span className="side-badge">{enrCount}</span>}
        </a>
        <a href="#!" className={tab === 'certificates' ? 'active' : ''} onClick={() => setTab('certificates')}>
          <i className="fas fa-certificate"></i> Certificates
          {certCount > 0 && <span className="side-badge" style={{ background: '#ff9a3d' }}>{certCount}</span>}
        </a>
        <a href="#!" className="logout-link" onClick={() => { localStorage.removeItem('adorn_admin'); window.location.href = '/'; }}><i className="fas fa-sign-out-alt"></i> Logout</a>
      </aside>

      <main className="admin-main">
        {tab === 'dashboard' && (
          <div className="tab-content">
            <h2 className="tab-title">Dashboard</h2>
            <div className="dash-grid">
              <div className="dash-card"><i className="fas fa-box"></i><strong>{prodCount}</strong><span>Products</span></div>
              <div className="dash-card"><i className="fas fa-list"></i><strong>{catCount}</strong><span>Categories</span></div>
              <div className="dash-card"><i className="fas fa-star"></i><strong>{featuredCount}</strong><span>Featured</span></div>
              <div className="dash-card"><i className="fas fa-fire"></i><strong>{bestSellingCount}</strong><span>Best Selling</span></div>
              <div className="dash-card"><i className="fas fa-download"></i><strong>{dlCount}</strong><span>Downloads</span></div>
              <div className="dash-card dash-clickable" onClick={() => setTab('enrollments')} style={{ cursor: 'pointer' }}>
                <i className="fas fa-user-graduate" style={{ color: '#6d3bff' }}></i>
                <strong style={{ color: '#6d3bff' }}>{enrCount}</strong>
                <span>Enrollments</span>
              </div>
              <div className="dash-card dash-clickable" onClick={() => setTab('certificates')} style={{ cursor: 'pointer' }}>
                <i className="fas fa-certificate" style={{ color: '#ff9a3d' }}></i>
                <strong style={{ color: '#ff9a3d' }}>{certCount}</strong>
                <span>Certificates</span>
              </div>
            </div>

            {enrollments.length > 0 && (
              <div className="dash-recent-section" style={{ marginTop: 32 }}>
                <div className="tab-header" style={{ marginBottom: 14 }}>
                  <h3 style={{ fontSize: '1.08rem', margin: 0, fontWeight: 700 }}>
                    <i className="fas fa-user-graduate" style={{ color: '#6d3bff', marginRight: 8 }}></i>
                    Recent Course Registrations
                  </h3>
                  <button className="btn btn-outline" style={{ padding: '6px 14px', fontSize: '.78rem' }} onClick={() => setTab('enrollments')}>
                    View All ({enrCount}) &rarr;
                  </button>
                </div>
                <div className="table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Ref ID</th>
                        <th>Candidate</th>
                        <th>Course</th>
                        <th>Emirate</th>
                        <th>Mode</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enrollments.slice(0, 5).map(e => (
                        <tr key={e.id}>
                          <td><code>{e.id}</code></td>
                          <td>
                            <strong>{e.fullName}</strong>
                            <div style={{ fontSize: '.72rem', color: 'var(--gray-500)' }}>{e.email}</div>
                          </td>
                          <td><span style={{ fontWeight: 600 }}>{e.courseName}</span></td>
                          <td><span className="badge-emirate">{e.emirate}</span></td>
                          <td><small>{e.trainingMode}</small></td>
                          <td style={{ fontSize: '.75rem', color: 'var(--gray-500)' }}>{e.created_at ? new Date(e.created_at).toLocaleDateString() : '-'}</td>
                          <td>
                            <span className={`status-pill pill-${(e.status || 'pending').toLowerCase()}`}>
                              {e.status}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn btn-outline"
                              style={{ padding: '4px 10px', fontSize: '.72rem' }}
                              onClick={() => { setSelectedEnr(e); setTab('enrollments'); }}
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
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
                <thead><tr><th>ID</th><th>Label</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {categories.map((c, i) => (
                    <tr key={c.id}>
                      <td><code>{c.id}</code></td>
                      <td>{c.label}</td>
                      <td>
                        <label className="toggle-switch">
                          <input type="checkbox" checked={c.enabled !== false} onChange={() => toggleCategory(i)} />
                          <span className="toggle-slider"></span>
                        </label>
                      </td>
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

        {tab === 'images' && (
          <div className="tab-content">
            <div className="tab-header">
              <h2 className="tab-title">Product Images</h2>
            </div>

            <div className="img-section">
              <h3 className="img-section-title"><i className="fas fa-layer-group"></i> Bulk Upload</h3>
              <p className="img-upload-hint">Upload multiple images at once. Each filename (without extension) must match a product SKU. For example: <code>CAMBO-CAM.jpg</code> assigns to SKU <code>CAMBO-CAM</code>.</p>
              <label className="img-file-label bulk-label">
                <i className="fas fa-cloud-upload-alt"></i> Choose Images
                <input type="file" accept="image/*" multiple onChange={handleBulkImgUpload} disabled={bulkImgUploading} />
              </label>
              {bulkImgUploading && (
                <div className="bulk-progress">
                  <div className="bulk-spinner"><i className="fas fa-spinner fa-spin"></i> Uploading {bulkImgProgress?.done || 0} of {bulkImgProgress?.total || 0}...</div>
                </div>
              )}
              {bulkImgProgress && !bulkImgUploading && (
                <div className="bulk-results">
                  <span className="bulk-ok"><i className="fas fa-check-circle"></i> {bulkImgProgress.matched} matched</span>
                  <span className="bulk-skip"><i className="fas fa-minus-circle"></i> {bulkImgProgress.skipped} skipped</span>
                  {bulkImgProgress.errors.length > 0 && <span className="bulk-err"><i className="fas fa-exclamation-circle"></i> {bulkImgProgress.errors.length} errors</span>}
                </div>
              )}
            </div>

            <div className="img-divider"></div>

            <div className="img-section">
              <h3 className="img-section-title"><i className="fas fa-image"></i> Single Upload</h3>
              <p className="img-upload-hint">Select a product and upload an image to assign it.</p>
              <div className="img-upload-card">
                <label className="img-sku-label">
                  Select Product
                  <select className="img-sku-select" value={imgSku} onChange={e => setImgSku(e.target.value)}>
                    <option value="">-- Choose SKU --</option>
                    {products.map(p => (
                      <option key={p.sku} value={p.sku}>{p.sku} — {p.name}</option>
                    ))}
                  </select>
                </label>
                {imgSku && (
                  <div className="img-preview-row">
                    {products.find(p => p.sku === imgSku)?.img && (
                      <div className="img-preview">
                        <img src={imgUrl(products.find(p => p.sku === imgSku).img)} alt="current" />
                        <span>Current</span>
                      </div>
                    )}
                    {imgPreview && (
                      <div className="img-preview">
                        <img src={imgPreview} alt="new" />
                        <span>New</span>
                      </div>
                    )}
                  </div>
                )}
                <label className="img-file-label">
                  <i className="fas fa-cloud-upload-alt"></i> Choose Image
                  <input type="file" accept="image/*" onChange={handleImgUpload} disabled={!imgSku} />
                </label>
                {imgUploading && <div className="img-uploading"><i className="fas fa-spinner fa-spin"></i> Uploading...</div>}
              </div>
            </div>
          </div>
        )}

        {tab === 'downloads' && (
          <div className="tab-content">
            <div className="tab-header">
              <h2 className="tab-title">Downloads</h2>
            </div>
            <div className="img-section">
              <h3 className="img-section-title"><i className="fas fa-cloud-upload-alt"></i> Upload Document</h3>
              <p className="img-upload-hint">Upload PDFs, DOCs, XLS, PPT, or ZIP files. Choose a category and give it a title.</p>
              <div className="modal-grid" style={{ marginBottom: 16 }}>
                <label>Category
                  <select value={dlCategory} onChange={e => setDlCategory(e.target.value)}>
                    <option value="product-catalogue">Product Catalogue</option>
                    <option value="product-datasheets">Product Datasheets</option>
                    <option value="technical-datasheets">Technical Datasheets</option>
                    <option value="installation-guides">Installation Guides</option>
                    <option value="product-certifications">Product Certifications</option>
                    <option value="compliance-documents">Compliance Documents</option>
                    <option value="brochures">Brochures</option>
                    <option value="company-profile">Company Profile</option>
                    <option value="marketing-resources">Marketing Resources</option>
                  </select>
                </label>
                <label>Title <input value={dlTitle} onChange={e => setDlTitle(e.target.value)} placeholder="Document title" /></label>
              </div>
              <label className="img-file-label bulk-label">
                <i className="fas fa-cloud-upload-alt"></i> Choose File (PDF, DOC, XLS, PPT, ZIP)
                <input type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.rar" onChange={async (e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  if (!dlTitle.trim()) { showToast('Please enter a title first', 'error'); return; }
                  setDlUploading(true);
                  try {
                    const res = await uploadDocument(file);
                    await addDownload({ title: dlTitle.trim(), category: dlCategory, fileUrl: res.url, fileName: file.name, fileSize: file.size });
                    await loadData();
                    setDlTitle('');
                    showToast('Document uploaded successfully');
                  } catch (err) { showToast(err.message, 'error'); }
                  setDlUploading(false);
                  e.target.value = '';
                }} />
              </label>
              {dlUploading && <div className="img-uploading"><i className="fas fa-spinner fa-spin"></i> Uploading...</div>}
            </div>

            <div className="img-divider"></div>

            <div className="table-wrap">
              <table className="admin-table">
                <thead><tr><th>Title</th><th>Category</th><th>File</th><th>Date</th><th>Actions</th></tr></thead>
                <tbody>
                  {downloads.map(d => (
                    <tr key={d.id}>
                      <td><strong>{d.title}</strong></td>
                      <td><span className="dl-cat-badge">{d.category}</span></td>
                      <td><a href={imgUrl(d.fileUrl)} target="_blank" rel="noreferrer" style={{ fontSize: '.78rem', color: 'var(--purple)' }}>{d.fileName || 'View'}</a></td>
                      <td style={{ fontSize: '.75rem', color: 'var(--gray-400)' }}>{d.created_at ? new Date(d.created_at).toLocaleDateString() : '-'}</td>
                      <td className="actions-col">
                        <button className="btn-sm delete" onClick={async () => {
                          if (!confirm('Delete this document?')) return;
                          try { await deleteDownload(d.id); await loadData(); showToast('Deleted'); } catch (err) { showToast(err.message, 'error'); }
                        }}><i className="fas fa-trash"></i></button>
                      </td>
                    </tr>
                  ))}
                  {downloads.length === 0 && <tr><td colSpan="5" style={{ textAlign: 'center', padding: 32, color: 'var(--gray-400)' }}>No documents uploaded yet</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'banner' && (
          <div className="tab-content">
            <h2 className="tab-title">Hero Banner Carousel</h2>
            <p className="img-upload-hint">Upload multiple banner images — they'll rotate automatically in the hero section. Upload in the order you want them to appear.</p>
            <p className="img-upload-hint" style={{color:'var(--orange)',fontWeight:600,marginBottom:16}}>Recommended size: 1920 x 600 px (JPG/PNG, max 2MB each)</p>

            {bannerSlides.length > 0 && (
              <div className="banner-slides-list">
                {bannerSlides.map((img, i) => (
                  <div className="banner-slide-item" key={i}>
                    <span className="banner-slide-num">{i + 1}</span>
                    <img src={imgUrl(img)} alt={`Banner slide ${i + 1}`} />
                    <div className="banner-slide-actions">
                      <button className="btn btn-outline" onClick={() => moveBannerSlide(i, -1)} disabled={i === 0} aria-label="Move up"><i className="fas fa-chevron-up"></i></button>
                      <button className="btn btn-outline" onClick={() => moveBannerSlide(i, 1)} disabled={i === bannerSlides.length - 1} aria-label="Move down"><i className="fas fa-chevron-down"></i></button>
                      <button className="btn btn-danger" onClick={() => removeBannerSlide(i)}><i className="fas fa-trash"></i></button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="img-upload-card">
              <label className="img-file-label">
                <i className="fas fa-cloud-upload-alt"></i> Add Banner Slide
                <input type="file" accept="image/*" onChange={handleBannerUpload} />
              </label>
              {bannerLoading && <div className="img-uploading"><i className="fas fa-spinner fa-spin"></i> Uploading...</div>}
            </div>
          </div>
        )}

        {tab === 'enrollments' && (
          <div className="tab-content">
            <div className="tab-header">
              <div>
                <h2 className="tab-title">ADORN Academy Enrollments</h2>
                <p style={{ margin: '4px 0 0', fontSize: '.84rem', color: 'var(--gray-500)' }}>
                  Manage candidate registrations for courses and certifications across Dubai &amp; the GCC.
                </p>
              </div>
              <div className="tab-actions">
                <button className="btn btn-outline" onClick={loadData}>
                  <i className="fas fa-sync-alt"></i> Refresh
                </button>
                <button className="btn btn-primary" onClick={exportEnrollmentsCSV}>
                  <i className="fas fa-file-csv"></i> Export CSV
                </button>
              </div>
            </div>

            {/* Counters */}
            <div className="dash-grid" style={{ marginBottom: 20 }}>
              <div className="dash-card">
                <i className="fas fa-users" style={{ color: '#6d3bff' }}></i>
                <strong style={{ color: '#6d3bff' }}>{enrollments.length}</strong>
                <span>Total Registrations</span>
              </div>
              <div className="dash-card">
                <i className="fas fa-clock" style={{ color: '#f59e0b' }}></i>
                <strong style={{ color: '#f59e0b' }}>{enrollments.filter(e => e.status === 'Pending').length}</strong>
                <span>Pending Confirmation</span>
              </div>
              <div className="dash-card">
                <i className="fas fa-check-circle" style={{ color: '#10b981' }}></i>
                <strong style={{ color: '#10b981' }}>{enrollments.filter(e => e.status === 'Confirmed').length}</strong>
                <span>Confirmed Seats</span>
              </div>
              <div className="dash-card">
                <i className="fas fa-map-marker-alt" style={{ color: '#2563eb' }}></i>
                <strong style={{ color: '#2563eb' }}>{enrollments.filter(e => e.emirate === 'Dubai').length}</strong>
                <span>Dubai Based</span>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="enr-admin-filter-bar">
              <div className="enr-admin-search">
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Search candidate name, email, phone, company, course, or ID..."
                  value={enrSearch}
                  onChange={e => setEnrSearch(e.target.value)}
                />
                {enrSearch && (
                  <button type="button" className="enr-search-clear" onClick={() => setEnrSearch('')}>
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </div>

              <div className="enr-admin-selects">
                <select value={enrFilterStatus} onChange={e => setEnrFilterStatus(e.target.value)}>
                  <option value="all">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="In-Training">In-Training</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                <select value={enrFilterEmirate} onChange={e => setEnrFilterEmirate(e.target.value)}>
                  <option value="all">All Emirates</option>
                  <option value="Dubai">Dubai</option>
                  <option value="Abu Dhabi">Abu Dhabi</option>
                  <option value="Sharjah">Sharjah</option>
                  <option value="Ajman">Ajman</option>
                  <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                  <option value="Fujairah">Fujairah</option>
                  <option value="Umm Al Quwain">Umm Al Quwain</option>
                  <option value="Other GCC / International">Other GCC</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Ref ID &amp; Date</th>
                    <th>Candidate Contact</th>
                    <th>Course &amp; Training Mode</th>
                    <th>Emirate &amp; Company</th>
                    <th>Preferred Batch</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEnrollments.map(e => {
                    const cleanPhone = (e.phone || '').replace(/[^0-9]/g, '');
                    return (
                      <tr key={e.id}>
                        <td>
                          <code>{e.id}</code>
                          <div style={{ fontSize: '.72rem', color: 'var(--gray-400)', marginTop: 2 }}>
                            {e.created_at ? new Date(e.created_at).toLocaleDateString() : '-'}
                          </div>
                        </td>
                        <td>
                          <strong>{e.fullName}</strong>
                          <div style={{ fontSize: '.74rem', color: 'var(--gray-600)', marginTop: 2 }}>
                            <i className="fas fa-envelope" style={{ marginRight: 4, color: 'var(--gray-400)' }}></i>
                            <a href={`mailto:${e.email}`}>{e.email}</a>
                          </div>
                          <div style={{ fontSize: '.74rem', color: '#16a34a', marginTop: 2 }}>
                            <i className="fab fa-whatsapp" style={{ marginRight: 4 }}></i>
                            {e.phone}
                          </div>
                        </td>
                        <td>
                          <strong style={{ color: 'var(--purple)' }}>{e.courseName}</strong>
                          <div style={{ fontSize: '.74rem', color: 'var(--gray-600)', marginTop: 2 }}>
                            <i className="fas fa-chalkboard-teacher" style={{ marginRight: 4 }}></i>
                            {e.trainingMode}
                          </div>
                        </td>
                        <td>
                          <span className="badge-emirate">{e.emirate}</span>
                          <div style={{ fontSize: '.74rem', color: 'var(--gray-600)', marginTop: 3 }}>
                            {e.company || 'Individual'} &bull; <small>{e.designation}</small>
                          </div>
                        </td>
                        <td>
                          <span style={{ fontSize: '.76rem', color: 'var(--gray-700)' }}>{e.preferredBatch}</span>
                        </td>
                        <td>
                          <select
                            className={`inline-select status-select status-${(e.status || 'pending').toLowerCase()}`}
                            value={e.status || 'Pending'}
                            onChange={evt => handleUpdateEnrollmentStatus(e.id, evt.target.value)}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="In-Training">In-Training</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="actions-col">
                          <button
                            className="btn-sm"
                            title="View Full Details"
                            onClick={() => setSelectedEnr(e)}
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                          {cleanPhone && (
                            <a
                              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hello ${e.fullName}, this is ADORN Academy Dubai regarding your registration for ${e.courseName} (Ref: ${e.id}).`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-sm btn-wa-sm"
                              title="Chat on WhatsApp"
                            >
                              <i className="fab fa-whatsapp"></i>
                            </a>
                          )}
                          <button
                            className="btn-sm delete"
                            title="Delete"
                            onClick={() => handleDeleteEnrollment(e.id)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredEnrollments.length === 0 && (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center', padding: 36, color: 'var(--gray-400)' }}>
                        <i className="fas fa-user-graduate" style={{ fontSize: '2rem', marginBottom: 8, display: 'block' }}></i>
                        No course enrollments matching filter
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'certificates' && (
          <div className="tab-content">
            <div className="tab-header">
              <div>
                <h2 className="tab-title">ADORN Academy Certificates</h2>
                <p style={{ margin: '4px 0 0', fontSize: '.84rem', color: 'var(--gray-500)' }}>
                  Issue and manage accredited technical certifications with 12-digit verification numbers and scannable QR codes.
                </p>
              </div>
              <div className="tab-actions">
                <button className="btn btn-outline" onClick={loadData}>
                  <i className="fas fa-sync-alt"></i> Refresh
                </button>
                <button className="btn btn-primary" onClick={openNewCert}>
                  <i className="fas fa-plus-circle"></i> Issue New Certificate
                </button>
              </div>
            </div>

            {/* Counters */}
            <div className="dash-grid" style={{ marginBottom: 20 }}>
              <div className="dash-card">
                <i className="fas fa-certificate" style={{ color: '#6d3bff' }}></i>
                <strong style={{ color: '#6d3bff' }}>{certificates.length}</strong>
                <span>Total Issued</span>
              </div>
              <div className="dash-card">
                <i className="fas fa-check-circle" style={{ color: '#10b981' }}></i>
                <strong style={{ color: '#10b981' }}>{certificates.filter(c => c.status === 'Active').length}</strong>
                <span>Active &amp; Valid</span>
              </div>
              <div className="dash-card">
                <i className="fas fa-clock" style={{ color: '#f59e0b' }}></i>
                <strong style={{ color: '#f59e0b' }}>{certificates.filter(c => c.status === 'Expired').length}</strong>
                <span>Expired</span>
              </div>
              <div className="dash-card">
                <i className="fas fa-ban" style={{ color: '#ef4444' }}></i>
                <strong style={{ color: '#ef4444' }}>{certificates.filter(c => c.status === 'Revoked').length}</strong>
                <span>Revoked</span>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="enr-admin-filter-bar">
              <div className="enr-admin-search">
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Search by 12-digit number, candidate, course, company..."
                  value={certSearch}
                  onChange={e => setCertSearch(e.target.value)}
                />
                {certSearch && (
                  <button className="enr-search-clear" onClick={() => setCertSearch('')}>
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </div>
              <div className="enr-admin-selects">
                <select value={certFilterStatus} onChange={e => setCertFilterStatus(e.target.value)}>
                  <option value="all">All Statuses ({certificates.length})</option>
                  <option value="Active">Active ({certificates.filter(c => c.status === 'Active').length})</option>
                  <option value="Expired">Expired ({certificates.filter(c => c.status === 'Expired').length})</option>
                  <option value="Revoked">Revoked ({certificates.filter(c => c.status === 'Revoked').length})</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>12-Digit Certificate ID</th>
                    <th>Candidate</th>
                    <th>Course / Certification</th>
                    <th>Issue Date</th>
                    <th>Validity</th>
                    <th>Status</th>
                    <th className="actions-col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCertificates.map((c, idx) => (
                    <tr key={c.id || idx}>
                      <td>
                        <div className="cert-number-cell">
                          <span className="cert-num-code">{format12(c.certNumber)}</span>
                          <button
                            type="button"
                            className="btn-copy-num"
                            title="Copy 12-digit ID"
                            onClick={() => {
                              navigator.clipboard?.writeText(c.certNumber);
                              showToast('12-digit ID copied: ' + c.certNumber);
                            }}
                          >
                            <i className="fas fa-copy"></i>
                          </button>
                        </div>
                      </td>
                      <td>
                        <strong>{c.candidateName}</strong>
                        {c.company && (
                          <div style={{ fontSize: '.74rem', color: 'var(--gray-600)', marginTop: 2 }}>
                            {c.company}
                          </div>
                        )}
                        {c.email && (
                          <div style={{ fontSize: '.72rem', color: 'var(--gray-500)' }}>
                            {c.email}
                          </div>
                        )}
                      </td>
                      <td>
                        <strong style={{ color: 'var(--purple)', fontSize: '.84rem' }}>{c.courseName}</strong>
                        {c.grade && (
                          <div style={{ fontSize: '.74rem', color: 'var(--gray-600)', marginTop: 2 }}>
                            Grade: <span style={{ fontWeight: 600, color: '#92400e' }}>{c.grade}</span>
                          </div>
                        )}
                      </td>
                      <td>
                        <span style={{ fontSize: '.78rem', color: 'var(--gray-700)' }}>{c.issueDate || '—'}</span>
                      </td>
                      <td>
                        <span style={{ fontSize: '.78rem', color: 'var(--gray-700)' }}>{c.expiryDate || 'Lifetime'}</span>
                      </td>
                      <td>
                        <select
                          className={`inline-select status-select status-${(c.status || 'active').toLowerCase()}`}
                          value={c.status || 'Active'}
                          onChange={evt => handleUpdateCertStatus(c.id, evt.target.value)}
                        >
                          <option value="Active">Active</option>
                          <option value="Expired">Expired</option>
                          <option value="Revoked">Revoked</option>
                        </select>
                      </td>
                      <td className="actions-col">
                        <button
                          className="btn-sm btn-print-sm"
                          title="View &amp; Print Official Certificate"
                          onClick={() => setSelectedPrintCert(c)}
                        >
                          <i className="fas fa-print"></i> Print
                        </button>
                        <a
                          href={`/verify?cert=${c.certNumber}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-sm"
                          title="Open Online Verification Page"
                        >
                          <i className="fas fa-external-link-alt"></i>
                        </a>
                        <button
                          className="btn-sm"
                          title="Copy Verification Link"
                          onClick={() => copyCertLink(c.certNumber)}
                        >
                          <i className={`fas ${copiedCertNum === c.certNumber ? 'fa-check' : 'fa-link'}`}></i>
                        </button>
                        <button
                          className="btn-sm"
                          title="Edit Certificate"
                          onClick={() => openEditCert(idx)}
                        >
                          <i className="fas fa-pen"></i>
                        </button>
                        <button
                          className="btn-sm delete"
                          title="Delete Certificate"
                          onClick={() => removeCert(c.id, c.certNumber)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredCertificates.length === 0 && (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center', padding: 36, color: 'var(--gray-400)' }}>
                        <i className="fas fa-certificate" style={{ fontSize: '2rem', marginBottom: 8, display: 'block', color: 'var(--gray-300)' }}></i>
                        No certificates matching filter.{' '}
                        <button
                          onClick={openNewCert}
                          style={{ background: 'none', border: 'none', color: 'var(--purple)', fontWeight: 700, cursor: 'pointer' }}
                        >
                          Issue the first certificate &rarr;
                        </button>
                      </td>
                    </tr>
                  )}
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
            </div>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setShowCModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={saveCategory}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Enrollment Detail Modal */}
      {selectedEnr && (
        <div className="modal-overlay" onClick={() => setSelectedEnr(null)}>
          <div className="modal modal-wide" onClick={e => e.stopPropagation()}>
            <div className="modal-header-enr" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--gray-200)', paddingBottom: 14, marginBottom: 18 }}>
              <div>
                <span className="badge-emirate" style={{ fontSize: '.72rem', background: '#6d3bff', color: '#fff' }}>Ref: {selectedEnr.id}</span>
                <h3 style={{ margin: '8px 0 2px', fontSize: '1.25rem' }}>Enrollment Details</h3>
                <span style={{ fontSize: '.76rem', color: 'var(--gray-500)' }}>
                  Registered on: {selectedEnr.created_at ? new Date(selectedEnr.created_at).toLocaleString() : '-'}
                </span>
              </div>
              <button className="btn btn-outline" style={{ padding: '4px 10px' }} onClick={() => setSelectedEnr(null)}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 18 }}>
              <div style={{ background: 'var(--gray-50)', padding: 16, borderRadius: 10, display: 'flex', flexDirection: 'column', gap: 8, fontSize: '.84rem' }}>
                <h4 style={{ margin: '0 0 6px', fontSize: '.9rem', color: 'var(--gray-800)' }}>
                  <i className="fas fa-user" style={{ color: '#6d3bff', marginRight: 6 }}></i> Candidate Information
                </h4>
                <div><span style={{ color: 'var(--gray-500)' }}>Full Name:</span> <strong>{selectedEnr.fullName}</strong></div>
                <div><span style={{ color: 'var(--gray-500)' }}>Email:</span> <a href={`mailto:${selectedEnr.email}`}>{selectedEnr.email}</a></div>
                <div><span style={{ color: 'var(--gray-500)' }}>WhatsApp / Phone:</span> <strong>{selectedEnr.phone}</strong></div>
                <div><span style={{ color: 'var(--gray-500)' }}>Emirate / Location:</span> <strong className="badge-emirate">{selectedEnr.emirate}</strong></div>
                <div><span style={{ color: 'var(--gray-500)' }}>Company:</span> <strong>{selectedEnr.company || 'Individual / Self-Sponsored'}</strong></div>
                <div><span style={{ color: 'var(--gray-500)' }}>Professional Role:</span> <strong>{selectedEnr.designation}</strong></div>
              </div>

              <div style={{ background: 'var(--gray-50)', padding: 16, borderRadius: 10, display: 'flex', flexDirection: 'column', gap: 8, fontSize: '.84rem' }}>
                <h4 style={{ margin: '0 0 6px', fontSize: '.9rem', color: 'var(--gray-800)' }}>
                  <i className="fas fa-graduation-cap" style={{ color: '#6d3bff', marginRight: 6 }}></i> Course &amp; Schedule
                </h4>
                <div><span style={{ color: 'var(--gray-500)' }}>Course / Program:</span> <strong style={{ color: 'var(--purple)' }}>{selectedEnr.courseName}</strong></div>
                <div><span style={{ color: 'var(--gray-500)' }}>Training Mode:</span> <strong>{selectedEnr.trainingMode}</strong></div>
                <div><span style={{ color: 'var(--gray-500)' }}>Batch Preference:</span> <strong>{selectedEnr.preferredBatch}</strong></div>
                <div><span style={{ color: 'var(--gray-500)' }}>SIRA / TDRA License:</span> <span>{selectedEnr.siraLicense || 'None'}</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                  <span style={{ color: 'var(--gray-500)' }}>Status:</span>
                  <select
                    className="inline-select"
                    value={selectedEnr.status || 'Pending'}
                    onChange={evt => handleUpdateEnrollmentStatus(selectedEnr.id, evt.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="In-Training">In-Training</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {selectedEnr.notes && (
                <div style={{ gridColumn: '1 / -1', background: 'var(--gray-50)', padding: 14, borderRadius: 10, fontSize: '.84rem' }}>
                  <h4 style={{ margin: '0 0 6px', fontSize: '.88rem', color: 'var(--gray-800)' }}>
                    <i className="fas fa-comment-alt" style={{ color: '#6d3bff', marginRight: 6 }}></i> Candidate Notes
                  </h4>
                  <p style={{ margin: 0, color: 'var(--gray-700)', lineHeight: 1.5 }}>{selectedEnr.notes}</p>
                </div>
              )}
            </div>

            <div className="modal-actions" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <a
                  href={`https://wa.me/${(selectedEnr.phone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${selectedEnr.fullName}, this is ADORN Academy Dubai regarding your enrollment in ${selectedEnr.courseName} (Ref: ${selectedEnr.id}).`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25D366', color: '#fff', textDecoration: 'none', padding: '10px 18px', borderRadius: 8, fontWeight: 700, fontSize: '.84rem' }}
                >
                  <i className="fab fa-whatsapp" style={{ fontSize: '1.1rem' }}></i> Chat on WhatsApp
                </a>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-outline" onClick={() => setSelectedEnr(null)}>Close</button>
                <button className="btn btn-danger" onClick={() => handleDeleteEnrollment(selectedEnr.id)}>
                  <i className="fas fa-trash"></i> Delete Registration
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Issue/Edit Modal */}
      {showCertModal && (
        <div className="modal-overlay" onClick={() => setShowCertModal(false)}>
          <div className="modal" style={{ maxWidth: 640 }} onClick={e => e.stopPropagation()}>
            <h3>
              <i className="fas fa-certificate" style={{ color: '#ff9a3d', marginRight: 8 }}></i>
              {editCertIdx >= 0 ? 'Edit Certificate' : 'Issue New Accredited Certificate'}
            </h3>
            <div className="modal-grid">
              <label className="full">
                Candidate Full Name *
                <input
                  value={certForm.candidateName}
                  onChange={e => setCertForm({ ...certForm, candidateName: e.target.value })}
                  placeholder="e.g. Riyaz Ahamed"
                  required
                />
              </label>

              <label className="full">
                12-Digit Certificate Number *
                <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                  <input
                    value={certForm.certNumber}
                    onChange={e => {
                      const digits = e.target.value.replace(/\D/g, '').slice(0, 12);
                      setCertForm({ ...certForm, certNumber: digits });
                    }}
                    placeholder="12 digits (e.g. 849201837462)"
                    maxLength={12}
                    style={{ fontFamily: 'monospace', letterSpacing: 1, fontWeight: 700 }}
                  />
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setCertForm({ ...certForm, certNumber: generateRandom12Digits() })}
                    title="Generate unique 12-digit number"
                    style={{ whiteSpace: 'nowrap', padding: '0 12px' }}
                  >
                    <i className="fas fa-random"></i> Auto Generate
                  </button>
                </div>
                <small style={{ color: 'var(--gray-500)', fontSize: '.72rem', display: 'block', marginTop: 4 }}>
                  Must be exactly 12 numeric digits. This number is used for online verification and encoded in the printed QR code.
                </small>
              </label>

              <label className="full">
                Course / Program *
                <input
                  list="courseList"
                  value={certForm.courseName}
                  onChange={e => setCertForm({ ...certForm, courseName: e.target.value })}
                  placeholder="Select or type certification title"
                />
                <datalist id="courseList">
                  {STANDARD_COURSES.map((cn, i) => (
                    <option key={i} value={cn} />
                  ))}
                </datalist>
              </label>

              <label>
                Company / Organization
                <input
                  value={certForm.company}
                  onChange={e => setCertForm({ ...certForm, company: e.target.value })}
                  placeholder="e.g. Adorn Telecommunications LLC"
                />
              </label>

              <label>
                Grade / Performance
                <input
                  value={certForm.grade}
                  onChange={e => setCertForm({ ...certForm, grade: e.target.value })}
                  placeholder="e.g. Distinction (95%), Certified"
                />
              </label>

              <label>
                Candidate Email
                <input
                  type="email"
                  value={certForm.email}
                  onChange={e => setCertForm({ ...certForm, email: e.target.value })}
                  placeholder="candidate@company.ae"
                />
              </label>

              <label>
                Candidate Phone
                <input
                  value={certForm.phone}
                  onChange={e => setCertForm({ ...certForm, phone: e.target.value })}
                  placeholder="+971 50 123 4567"
                />
              </label>

              <label>
                Issue Date
                <input
                  type="date"
                  value={certForm.issueDate}
                  onChange={e => setCertForm({ ...certForm, issueDate: e.target.value })}
                />
              </label>

              <label>
                Expiry Date / Validity
                <input
                  value={certForm.expiryDate}
                  onChange={e => setCertForm({ ...certForm, expiryDate: e.target.value })}
                  placeholder="e.g. 2029-11-20 or Lifetime"
                />
              </label>

              <label>
                Trainer / Instructor Name
                <input
                  value={certForm.trainerName}
                  onChange={e => setCertForm({ ...certForm, trainerName: e.target.value })}
                  placeholder="e.g. Eng. Tariq Al Nuaimi"
                />
              </label>

              <label>
                Credential Status
                <select
                  value={certForm.status}
                  onChange={e => setCertForm({ ...certForm, status: e.target.value })}
                >
                  <option value="Active">Active &amp; Valid</option>
                  <option value="Expired">Expired</option>
                  <option value="Revoked">Revoked</option>
                </select>
              </label>

              <label className="full">
                Internal Assessment Notes
                <textarea
                  value={certForm.notes}
                  onChange={e => setCertForm({ ...certForm, notes: e.target.value })}
                  placeholder="Practical assessment scores, exam batch details, or special honors..."
                  rows={2}
                />
              </label>
            </div>

            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setShowCertModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={saveCert}>
                <i className="fas fa-check"></i> {editCertIdx >= 0 ? 'Update Certificate' : 'Issue Certificate'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Printable Certificate Modal with QR Code */}
      {selectedPrintCert && (
        <div className="cert-modal-overlay" onClick={() => setSelectedPrintCert(null)}>
          <div className="cert-modal-toolbar" onClick={e => e.stopPropagation()}>
            <div className="cert-modal-toolbar-title">
              <i className="fas fa-award"></i>
              <span>Official Certificate Preview — {format12(selectedPrintCert.certNumber)}</span>
            </div>
            <div className="cert-modal-toolbar-actions">
              <button
                className="btn-toolbar btn-tb-print"
                onClick={() => window.print()}
              >
                <i className="fas fa-print"></i> Print Certificate (A4 Landscape)
              </button>
              <button
                className="btn-toolbar btn-tb-link"
                onClick={() => copyCertLink(selectedPrintCert.certNumber)}
              >
                <i className={`fas ${copiedCertNum === selectedPrintCert.certNumber ? 'fa-check' : 'fa-link'}`}></i>
                {copiedCertNum === selectedPrintCert.certNumber ? 'Copied!' : 'Copy Verify URL'}
              </button>
              <a
                href={`/verify?cert=${selectedPrintCert.certNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-toolbar btn-tb-link"
              >
                <i className="fas fa-external-link-alt"></i> Open Public Verification
              </a>
              <button
                className="btn-toolbar btn-tb-close"
                onClick={() => setSelectedPrintCert(null)}
              >
                <i className="fas fa-times"></i> Close
              </button>
            </div>
          </div>

          <div className="cert-modal-content" onClick={e => e.stopPropagation()}>
            <div className="certificate-print-frame">
              <div className="cert-sheet">
                <div className="cert-border-outer">
                  <div className="cert-border-inner">
                    <div className="cert-corner corner-tl"></div>
                    <div className="cert-corner corner-tr"></div>
                    <div className="cert-corner corner-bl"></div>
                    <div className="cert-corner corner-br"></div>

                    <div className="cert-header">
                      <div className="cert-logo-wrap">
                        <img src="https://adorn.ae/wp-content/uploads/2026/04/Adorn_Logo_Print_RGB-01.jpg" alt="ADORN" className="cert-logo" />
                      </div>
                      <div className="cert-org-title">
                        ADORN ACADEMY OF NETWORK &amp; INFRASTRUCTURE TECHNOLOGY
                      </div>
                      <div className="cert-reg-sub">
                        DUBAI, UNITED ARAB EMIRATES &bull; ACCREDITED TECHNICAL TRAINING
                      </div>
                      <div className="cert-divider-line"></div>
                      <h1 className="cert-award-title">CERTIFICATE OF ACHIEVEMENT</h1>
                      <p className="cert-award-sub">THIS IS TO OFFICIALLY CERTIFY THAT</p>
                    </div>

                    <div className="cert-candidate-block">
                      <div className="cert-candidate-name">{selectedPrintCert.candidateName}</div>
                      {selectedPrintCert.company && (
                        <div className="cert-candidate-company">Representing: {selectedPrintCert.company}</div>
                      )}
                    </div>

                    <p className="cert-body-text">
                      has successfully satisfied all rigorous curriculum benchmarks, practical lab assessments, and examination requirements prescribed for the certification of
                    </p>

                    <div className="cert-course-block">
                      <div className="cert-course-title">{selectedPrintCert.courseName}</div>
                      <div className="cert-grade-tag">Performance: {selectedPrintCert.grade || 'Certified Practitioner'}</div>
                    </div>

                    <div className="cert-footer-row">
                      <div className="cert-col cert-sig-col">
                        <div className="cert-sig-line">
                          <span className="cert-sig-hand">{selectedPrintCert.trainerName || 'Eng. Tariq Al Nuaimi'}</span>
                        </div>
                        <div className="cert-sig-title">Head of Technical Training</div>
                        <div className="cert-sig-sub">ADORN Academy, Dubai</div>
                      </div>

                      <div className="cert-col cert-seal-col">
                        <div className="cert-official-seal">
                          <div className="seal-ring-outer">
                            <div className="seal-ring-inner">
                              <i className="fas fa-award seal-icon"></i>
                              <span className="seal-txt">ADORN CERTIFIED</span>
                              <span className="seal-sub">DUBAI &bull; UAE</span>
                            </div>
                          </div>
                        </div>
                        <div className="cert-meta-info">
                          <div><strong>Certificate ID:</strong> {format12(selectedPrintCert.certNumber)}</div>
                          <div><strong>Issue Date:</strong> {selectedPrintCert.issueDate} &bull; <strong>Valid:</strong> {selectedPrintCert.expiryDate || 'Lifetime'}</div>
                        </div>
                      </div>

                      <div className="cert-col cert-qr-col">
                        <div className="cert-qr-box">
                          <QRCodeView
                            value={`${window.location.origin}/verify?cert=${selectedPrintCert.certNumber}`}
                            size={110}
                            color="#322160"
                          />
                        </div>
                        <div className="cert-qr-label">
                          <i className="fas fa-qrcode"></i> Scan to Verify Credential
                        </div>
                        <div className="cert-qr-url">adornconnect.com/verify</div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
