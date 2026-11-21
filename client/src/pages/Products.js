import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts, fetchCategories } from '../api';
import ProductCard from '../components/ProductCard';
import { ProductsSEO } from '../components/SEO';
import './Products.css';

export default function Products() {
  const [params, setParams] = useSearchParams();
  const [allProducts, setAllProducts] = useState([]);
  const [cats, setCats] = useState([]);
  const [search, setSearch] = useState(params.get('q') || '');
  const [activeCat, setActiveCat] = useState(params.get('cat') || '');

  useEffect(() => {
    setSearch(params.get('q') || '');
    setActiveCat(params.get('cat') || '');
  }, [params]);

  useEffect(() => {
    fetchCategories().then(setCats).catch(() => {});
    fetchProducts().then(setAllProducts).catch(() => setAllProducts([]));
  }, []);

  const handleCatSelect = (catId) => {
    setActiveCat(catId);
    const nextParams = {};
    if (catId) nextParams.cat = catId;
    if (search.trim()) nextParams.q = search.trim();
    setParams(nextParams, { replace: true });
  };

  const handleSearchChange = (val) => {
    setSearch(val);
    const nextParams = {};
    if (activeCat) nextParams.cat = activeCat;
    if (val.trim()) nextParams.q = val.trim();
    setParams(nextParams, { replace: true });
  };

  const clearAllFilters = () => {
    setSearch('');
    setActiveCat('');
    setParams({}, { replace: true });
  };

  // Filtered products for main display
  const displayedProducts = useMemo(() => {
    return allProducts.filter(p => {
      const matchesCat = !activeCat || p.cat === activeCat;
      if (!matchesCat) return false;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        const nameMatch = p.name && p.name.toLowerCase().includes(q);
        const skuMatch = p.sku && p.sku.toLowerCase().includes(q);
        const descMatch = p.desc && p.desc.toLowerCase().includes(q);
        return nameMatch || skuMatch || descMatch;
      }
      return true;
    });
  }, [allProducts, activeCat, search]);

  // Category counts always represent total products in each category
  const countInCat = (catId) => allProducts.filter(p => p.cat === catId).length;

  const activeCategoryObj = cats.find(c => c.id === activeCat);

  return (
    <div className="container products-page">
      <ProductsSEO category={activeCategoryObj?.label || ''} />
      <aside className="sidebar-filter">
        <div className="filter-search">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          {search && (
            <button
              className="filter-search-clear"
              onClick={() => handleSearchChange('')}
              aria-label="Clear search"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
        <h3><i className="fas fa-list"></i> Categories</h3>
        <div className="filter-cats">
          <button
            className={`filter-cat ${!activeCat ? 'active' : ''}`}
            onClick={() => handleCatSelect('')}
          >
            <i className="fas fa-th-large"></i>
            <span className="cat-label">All</span>
            <span className="cat-count">{allProducts.length}</span>
          </button>
          {cats.map(c => (
            <button
              key={c.id}
              className={`filter-cat ${activeCat === c.id ? 'active' : ''}`}
              onClick={() => handleCatSelect(c.id)}
            >
              {c.icon && <i className={c.icon}></i>}
              <span className="cat-label">{c.label}</span>
              <span className="cat-count">{countInCat(c.id)}</span>
            </button>
          ))}
        </div>
      </aside>

      <section className="products-content">
        <div className="products-header">
          <h1>
            {activeCategoryObj ? activeCategoryObj.label : 'All Products'}
          </h1>
          <span className="products-count">
            {displayedProducts.length} product{displayedProducts.length !== 1 ? 's' : ''}
            {activeCat && allProducts.length > 0 && ` (of ${allProducts.length} total)`}
          </span>
        </div>
        {displayedProducts.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-box-open"></i>
            <p>No products found matching your selection.</p>
            {(activeCat || search) && (
              <button className="btn btn-outline" onClick={clearAllFilters} style={{ marginTop: 12 }}>
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="prod-grid">
            {displayedProducts.map(p => (
              <ProductCard key={p.sku} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
