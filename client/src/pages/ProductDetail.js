import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchProducts, fetchCategories, imgUrl } from '../api';
import './ProductDetail.css';

export default function ProductDetail() {
  const [params] = useSearchParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [catNames, setCatNames] = useState({});
  const [icons, setIcons] = useState({});
  const [notFound, setNotFound] = useState(false);

  const sku = params.get('sku');

  useEffect(() => {
    if (!sku) { setNotFound(true); return; }

    Promise.all([fetchProducts(), fetchCategories()]).then(([products, cats]) => {
      const cn = {}, ic = {};
      cats.forEach(c => { cn[c.id] = c.label; ic[c.id] = c.icon || 'fas fa-box'; });
      setCatNames(cn);
      setIcons(ic);

      const p = products.find(x => x.sku === sku);
      if (!p) { setNotFound(true); return; }
      setProduct(p);

      const rel = products.filter(x => x.cat === p.cat && x.sku !== p.sku).slice(0, 4);
      setRelated(rel);
    }).catch(() => setNotFound(true));
  }, [sku]);

  if (notFound) {
    return (
      <div className="container not-found-page">
        <i className="fas fa-exclamation-circle"></i>
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products" className="btn btn-primary">Browse Products</Link>
      </div>
    );
  }

  if (!product) {
    return <div className="container loading-page"><i className="fas fa-spinner fa-spin"></i> Loading...</div>;
  }

  const catLabel = catNames[product.cat] || product.cat;
  const catIcon = icons[product.cat] || 'fas fa-box';
  const tags = product.tags || [];
  const whatsappMsg = `Hi, I am interested in ${product.name} (SKU: ${product.sku}). Please send me a quote.`;

  return (
    <div className="container detail-page">
      <nav className="breadcrumb">
        <Link to="/">Home</Link> / <Link to="/products">Products</Link> / <Link to={`/products?cat=${product.cat}`}>{catLabel}</Link> / <span>{product.sku}</span>
      </nav>

      <div className="detail-wrap">
        <div className="detail-img">
          {product.img ? (
            <img src={imgUrl(product.img)} alt={product.name} />
          ) : (
            <i className={catIcon}></i>
          )}
          <div className="detail-tags">
            {tags.includes('featured') && <span className="tag tag-featured">Featured</span>}
            {tags.includes('bestseller') && <span className="tag tag-bestseller">Best Seller</span>}
          </div>
        </div>

        <div className="detail-info">
          <div className="detail-cat"><i className={catIcon}></i> {catLabel}</div>
          <div className="detail-sku">SKU: {product.sku}</div>
          <h1 className="detail-name">{product.name}</h1>
          {product.price && (
            <div className="detail-price">{product.price} {product.unit || ''}</div>
          )}
          <p className="detail-desc">{product.desc}</p>
          <a
            href={`https://wa.me/971526387275?text=${encodeURIComponent(whatsappMsg)}`}
            className="btn btn-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-whatsapp"></i> Enquire on WhatsApp
          </a>
        </div>
      </div>

      {related.length > 0 && (
        <section className="related">
          <h2 className="section-title"><i className="fas fa-link"></i> Related Products</h2>
          <div className="related-grid">
            {related.map(p => (
              <Link key={p.sku} to={`/product?sku=${encodeURIComponent(p.sku)}`} className="rel-card">
                <div className="rel-img">
                  {p.img ? <img src={imgUrl(p.img)} alt={p.name} /> : <i className={icons[p.cat] || 'fas fa-box'}></i>}
                </div>
                <div className="rel-body">
                  <h4>{p.name}</h4>
                  <div className="rel-sku">{p.sku}</div>
                  {p.price && <div className="rel-price">{p.price} {p.unit || ''}</div>}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
