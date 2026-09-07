import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import './Maintenance.css';

export default function Maintenance({ title = 'This Page' }) {
  return (
    <>
      <SEO title={`${title} — Coming Soon`} description={`${title} page is under maintenance. ADORN's complete infrastructure solutions will be available here soon.`} />

      <section className="mnt-hero">
        <div className="mnt-orb mnt-orb-1"></div>
        <div className="mnt-orb mnt-orb-2"></div>
        <div className="container mnt-inner">
          <div className="mnt-icon">
            <i className="fas fa-hard-hat"></i>
          </div>
          <span className="ab-badge">Under Maintenance</span>
          <h1>{title}</h1>
          <p>
            We're currently building this section to bring you even better products and
            resources. Please check back soon — great things are on the way!
          </p>
          <div className="mnt-loader">
            <span></span><span></span><span></span>
          </div>
          <div className="mnt-btns">
            <Link to="/" className="hero-btn hero-btn-primary hero-btn-grow">
              <i className="fas fa-home"></i> Back to Home
            </Link>
            <a href="https://wa.me/971526387275" className="hero-btn hero-btn-outline hero-btn-grow" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i> Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}