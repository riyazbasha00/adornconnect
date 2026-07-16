import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts, fetchCategories } from '../api';
import ProductCard from '../components/ProductCard';
import './Products.css';

export default function Products() {
  const [params] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [cats, setCats] = useState([]);
  const [search, setSearch] = useState(params.get('q') || '');
  const [activeCat, setActiveCat] = useState(params.get('cat') || '');

  useEffect(() => {
    setSearch(params.get('q') || '');
    setActiveCat(params.get('cat') || '');
  }, [params]);

  useEffect(() => {
    fetchCategories().then(setCats).catch(() => {});
  }, []);

  useEffect(() => {
    const opts = {};
    if (activeCat) opts.cat = activeCat;
    if (search) opts.q = search;
    fetchProducts(opts).then(setProducts).catch(() => setProducts([]));
  }, [activeCat, search]);

  const catIcon = (id) => {
    const c = cats.find(x => x.id === id);
    return c ? c.icon : 'fas fa-box';
  };

  const countInCat = (catId) => products.filter(p => p.cat === catId).length;

  return (
    <div className="container products-page">
      <aside className="sidebar-filter">
        <div className="filter-search">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <h3><i className="fas fa-list"></i> Categories</h3>
        <div className="filter-cats">
          <button
            className={`filter-cat ${!activeCat ? 'active' : ''}`}
            onClick={() => setActiveCat('')}
          >
            <i className="fas fa-th-large"></i> All
            <span className="cat-count">{products.length}</span>
          </button>
          {cats.map(c => (
            <button
              key={c.id}
              className={`filter-cat ${activeCat === c.id ? 'active' : ''}`}
              onClick={() => setActiveCat(c.id)}
            >
              <i className={c.icon || 'fas fa-box'}></i> {c.label}
              <span className="cat-count">{countInCat(c.id)}</span>
            </button>
          ))}
        </div>
      </aside>

      <section className="products-content">
        <div className="products-header">
          <h1>
            {activeCat
              ? (cats.find(c => c.id === activeCat)?.label || 'Products')
              : 'All Products'}
          </h1>
          <span className="products-count">{products.length} product{products.length !== 1 ? 's' : ''}</span>
        </div>
        {products.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-box-open"></i>
            <p>No products found.</p>
          </div>
        ) : (
          <div className="prod-grid">
            {products.map(p => (
              <ProductCard key={p.sku} product={p} icon={catIcon(p.cat)} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
