import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts, fetchCategories } from '../api';
import ProductCard from '../components/ProductCard';
import './Home.css';

const BANNER = 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1920&auto=format&fit=crop';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [bestselling, setBestselling] = useState([]);
  const [cats, setCats] = useState([]);

  useEffect(() => {
    Promise.all([fetchProducts(), fetchCategories()]).then(([products, categories]) => {
      setCats(categories);
      const catMap = {};
      categories.forEach(c => { catMap[c.id] = c; });

      const f = products.filter(p => p.tags && p.tags.includes('featured'));
      const b = products.filter(p => p.tags && p.tags.includes('bestseller'));

      setFeatured(f);
      setBestselling(b);
    }).catch(() => {});
  }, []);

  const catIcon = (id) => {
    const c = cats.find(x => x.id === id);
    return c ? c.icon : 'fas fa-box';
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section className="hero">
        <div className="hero-bg" style={{ backgroundImage: `url(${BANNER})` }}></div>
        <div className="hero-overlay"></div>
        <div className="hero-orbs">
          <div className="hero-orb hero-orb-1"></div>
          <div className="hero-orb hero-orb-2"></div>
          <div className="hero-orb hero-orb-3"></div>
        </div>
        <div className="hero-grid"></div>
        <div className="container hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            Premium Manufacturer & Supplier
          </div>
          <h1>Structured Cabling &amp; <span className="hero-hl">Security</span> Solutions</h1>
          <p>Premium networking infrastructure, surveillance, and access control products for commercial, industrial, and residential projects across the UAE.</p>
          <div className="hero-search">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Search products..." onKeyDown={e => { if (e.key === 'Enter' && e.target.value.trim()) window.location.href = '/products?search=' + encodeURIComponent(e.target.value.trim()); }} />
            <Link to="/products" className="hero-search-btn"><i className="fas fa-arrow-right"></i></Link>
          </div>
          <div className="hero-btns">
            <Link to="/products" className="hero-btn hero-btn-primary">
              <i className="fas fa-th-large"></i> Browse All Products
            </Link>
            <a href="#contact" className="hero-btn hero-btn-outline" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>
              <i className="fas fa-envelope"></i> Get a Quote
            </a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hs-num">65+</span>
              <span className="hs-label">Products</span>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat">
              <span className="hs-num">14</span>
              <span className="hs-label">Categories</span>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat">
              <span className="hs-num">10+</span>
              <span className="hs-label">Years Exp.</span>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat">
              <span className="hs-num">500+</span>
              <span className="hs-label">Clients</span>
            </div>
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="container" id="featured">
          <h2 className="section-title"><i className="fas fa-star"></i> Featured Products</h2>
          <div className="prod-grid">
            {featured.map(p => (
              <ProductCard key={p.sku} product={p} icon={catIcon(p.cat)} />
            ))}
          </div>
        </section>
      )}

      {bestselling.length > 0 && (
        <section className="container">
          <h2 className="section-title"><i className="fas fa-fire"></i> Best Selling</h2>
          <div className="prod-grid">
            {bestselling.map(p => (
              <ProductCard key={p.sku} product={p} icon={catIcon(p.cat)} />
            ))}
          </div>
        </section>
      )}

      <section className="about-bridge" id="contact">
        <div className="container">
          <div className="ab-head">
            <span className="ab-badge">Contact</span>
            <h2>Get in Touch With ADORN</h2>
            <p>Reach out for product inquiries, project consultations, or technical support.</p>
          </div>
          <div className="about-contact">
            <div className="about-card">
              <div className="ac-icon"><i className="fas fa-building"></i></div>
              <h3>About ADORN</h3>
              <p>ADORN is a leading UAE-based provider of structured cabling, security surveillance, networking infrastructure, and access control solutions. We supply high-quality products suitable for commercial, industrial, and residential projects across the region.</p>
              <div className="ac-features">
                <span><i className="fas fa-check-circle"></i> Premium quality products</span>
                <span><i className="fas fa-check-circle"></i> Competitive trade pricing</span>
                <span><i className="fas fa-check-circle"></i> Fast UAE-wide delivery</span>
                <span><i className="fas fa-check-circle"></i> Dedicated technical support</span>
              </div>
            </div>
            <div className="contact-card">
              <div className="ac-icon"><i className="fas fa-headset"></i></div>
              <h3>Get In Touch</h3>
              <div className="cc-items">
                <div className="cc-item">
                  <span className="cc-icn"><i className="fas fa-phone-alt"></i></span>
                  <div><strong>Phone</strong><span>+971 4 338 1499</span></div>
                </div>
                <div className="cc-item">
                  <span className="cc-icn"><i className="fas fa-envelope"></i></span>
                  <div><strong>Email</strong><span>info@adorn.ae</span></div>
                </div>
                <div className="cc-item">
                  <span className="cc-icn"><i className="fas fa-map-marker-alt"></i></span>
                  <div><strong>Location</strong><span>Dubai, UAE</span></div>
                </div>
                <div className="cc-item">
                  <span className="cc-icn"><i className="fas fa-clock"></i></span>
                  <div><strong>Working Hours</strong><span>Sat–Thu: 8:00 AM – 6:00 PM</span></div>
                </div>
              </div>
              <a href="https://wa.me/971526387275" className="btn btn-primary btn-wa" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-whatsapp"></i> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
