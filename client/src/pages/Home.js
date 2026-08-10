import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts, fetchCategories, fetchBanner, imgUrl } from '../api';
import ProductCard from '../components/ProductCard';
import { HomeSEO } from '../components/SEO';
import './Home.css';

const DEFAULT_BANNERS = [];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [bestselling, setBestselling] = useState([]);
  const [banners, setBanners] = useState(DEFAULT_BANNERS);
  const [current, setCurrent] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    fetchBanner().then(b => {
      if (b && Array.isArray(b.images) && b.images.length) setBanners(b.images);
    }).catch(() => {});
    Promise.all([fetchProducts(), fetchCategories()]).then(([products]) => {

      const f = products.filter(p => p.tags && p.tags.includes('featured'));
      const b = products.filter(p => p.tags && p.tags.includes('bestseller'));

      setFeatured(f);
      setBestselling(b);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;
    timer.current = setInterval(() => {
      setCurrent(c => (c + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer.current);
  }, [banners.length]);

  const goTo = (i) => {
    setCurrent(i);
    if (timer.current) { clearInterval(timer.current); timer.current = null; }
  };

  return (
    <>
      <HomeSEO />
      <section className="hero" style={banners.length ? {} : { background: '#f5f5f5' }}>
        {banners.map((b, i) => (
          <div key={i} className={`hero-bg ${i === current ? 'active' : ''}`} style={{ backgroundImage: `url(${imgUrl(b)})` }}></div>
        ))}
        {banners.length > 1 && (
          <>
            <button className="hero-arrow hero-arrow-prev" onClick={() => goTo((current - 1 + banners.length) % banners.length)} aria-label="Previous banner">
              <i className="fas fa-chevron-left"></i>
            </button>
            <button className="hero-arrow hero-arrow-next" onClick={() => goTo((current + 1) % banners.length)} aria-label="Next banner">
              <i className="fas fa-chevron-right"></i>
            </button>
            <div className="hero-dots">
              {banners.map((_, i) => (
                <button key={i} className={`hero-dot ${i === current ? 'active' : ''}`} onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}`}></button>
              ))}
            </div>
          </>
        )}
        <div className="container hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            Premium Manufacturer & Supplier
          </div>
          <h1>Structured Cabling &amp; <span className="hero-hl">Security</span> Solutions</h1>
          <p className="hero-desc-desktop">Premium networking infrastructure, surveillance, and access control products for commercial, industrial, and residential projects across the UAE.</p>
          <p className="hero-desc-mobile">Premium networking, surveillance &amp; access control products across the UAE.</p>
          <div className="hero-search">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Search products..." onKeyDown={e => { if (e.key === 'Enter' && e.target.value.trim()) window.location.href = '/products?search=' + encodeURIComponent(e.target.value.trim()); }} />
            <Link to="/products" className="hero-search-btn"><i className="fas fa-arrow-right"></i></Link>
          </div>
          <div className="hero-btns">
            <Link to="/products" className="hero-btn hero-btn-primary">
              <i className="fas fa-th-large"></i> Browse All Products
            </Link>
            <a href="https://wa.me/971526387275" className="hero-btn hero-btn-outline" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i> Get a Quote
            </a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hs-num">15+</span>
              <span className="hs-label">Years Experience</span>
            </div>
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="container" id="featured">
          <h2 className="section-title"><i className="fas fa-star"></i> Featured Products</h2>
          <div className="prod-grid">
            {featured.map(p => (
              <ProductCard key={p.sku} product={p} />
            ))}
          </div>
        </section>
      )}

      {bestselling.length > 0 && (
        <section className="container">
          <h2 className="section-title"><i className="fas fa-fire"></i> Best Selling</h2>
          <div className="prod-grid">
            {bestselling.map(p => (
              <ProductCard key={p.sku} product={p} />
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
