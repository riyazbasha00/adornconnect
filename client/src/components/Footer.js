import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-pattern"></div>

      <div className="container">
        <div className="footer-newsletter">
          <div className="fn-icon"><i className="fas fa-paper-plane"></i></div>
          <div className="fn-text">
            <h4>Stay in the Loop</h4>
            <p>Subscribe for exclusive deals, new arrivals, and industry insights.</p>
          </div>
          <form className="fn-form" onSubmit={e => { e.preventDefault(); setEmail(''); }}>
            <div className="fn-input-wrap">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <button type="submit">Subscribe <i className="fas fa-arrow-right"></i></button>
          </form>
        </div>
      </div>

      <div className="container footer-inner">
        <div className="footer-col brand-col">
          <h3 className="footer-logo">
            <span className="fl-grad">ADORN</span>
            <span className="fl-dot">.</span>
          </h3>
          <p className="footer-desc">
            ADORN is a leading UAE-based provider of structured cabling, security surveillance, networking infrastructure, and access control solutions. We supply high-quality products suitable for commercial, industrial, and residential projects across the region.
          </p>

          <div className="about-tags">
            <span className="atag"><i className="fas fa-shield-alt"></i> Trusted Supplier</span>
            <span className="atag"><i className="fas fa-trophy"></i> Premium Quality</span>
            <span className="atag"><i className="fas fa-headset"></i> 24/7 Support</span>
            <span className="atag"><i className="fas fa-truck"></i> UAE Delivery</span>
          </div>

          <div className="footer-social">
            <a href="#!" aria-label="Facebook" className="social-link">
              <i className="fab fa-facebook-f"></i>
              <span className="social-label">Facebook</span>
            </a>
            <a href="#!" aria-label="Instagram" className="social-link">
              <i className="fab fa-instagram"></i>
              <span className="social-label">Instagram</span>
            </a>
            <a href="#!" aria-label="LinkedIn" className="social-link">
              <i className="fab fa-linkedin-in"></i>
              <span className="social-label">LinkedIn</span>
            </a>
            <a href="#!" aria-label="YouTube" className="social-link">
              <i className="fab fa-youtube"></i>
              <span className="social-label">YouTube</span>
            </a>
            <a href="https://wa.me/971526387275" aria-label="WhatsApp" className="social-link" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i>
              <span className="social-label">WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links <span className="h4-line"></span></h4>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/admin">Admin</Link>
          </nav>
        </div>

        <div className="footer-col">
          <h4>Categories <span className="h4-line"></span></h4>
          <nav>
            <Link to="/products?cat=cat6-cables">CAT6 Cables</Link>
            <Link to="/products?cat=fiber-cables">Fiber Optic</Link>
            <Link to="/products?cat=surveillance">Surveillance</Link>
            <Link to="/products?cat=access-control">Access Control</Link>
            <Link to="/products?cat=network-cabinets">Cabinets & Racks</Link>
            <Link to="/products" className="view-all">View All &rarr;</Link>
          </nav>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span className="fb-copy">&copy; {new Date().getFullYear()} <strong>ADORN</strong>. All rights reserved.</span>
          <div className="fb-contact">
            <span><i className="fas fa-phone-alt"></i> +971 4 338 1499</span>
            <span className="fb-dot">&middot;</span>
            <span><i className="fas fa-envelope"></i> info@adorn.ae</span>
            <span className="fb-dot">&middot;</span>
            <span><i className="fas fa-map-marker-alt"></i> Dubai, UAE</span>
          </div>
          <div className="fb-links">
            <a href="#!">Privacy</a>
            <span className="fb-dot">&middot;</span>
            <a href="#!">Terms</a>
          </div>
        </div>
      </div>

      <button className="footer-back-top" onClick={scrollTop} aria-label="Back to top">
        <i className="fas fa-arrow-up"></i>
      </button>
    </footer>
  );
}
