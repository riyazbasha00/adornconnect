const BASE = '/api';

export function imgUrl(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return '/' + path.replace(/^\//, '');
}

export async function fetchProducts(params = {}) {
  const qs = new URLSearchParams(params).toString();
  return api(`${BASE}/products${qs ? '?' + qs : ''}`);
}

export async function fetchProduct(sku) {
  return api(`${BASE}/products?sku=${encodeURIComponent(sku)}`);
}

async function parseRes(res) {
  const text = await res.text();
  try { return JSON.parse(text); }
  catch { throw new Error(res.ok ? 'Invalid response' : (text.startsWith('<') ? 'Server error (received HTML)' : text)); }
}

async function api(url, opts = {}) {
  const res = await fetch(url, opts);
  const data = await parseRes(res);
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export async function createProduct(data) {
  return api(`${BASE}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function updateProduct(sku, data) {
  return api(`${BASE}/products?sku=${encodeURIComponent(sku)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function deleteProduct(sku) {
  return api(`${BASE}/products?sku=${encodeURIComponent(sku)}`, { method: 'DELETE' });
}

export async function fetchCategories() {
  return api(`${BASE}/categories`);
}

export async function createCategory(data) {
  return api(`${BASE}/categories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function updateCategory(id, data) {
  return api(`${BASE}/categories?id=${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function deleteCategory(id) {
  return api(`${BASE}/categories?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
}

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append('image', file);
  return api(`${BASE}/upload`, { method: 'POST', body: formData });
}
