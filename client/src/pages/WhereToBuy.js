import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import './WhereToBuy.css';

const UAE_DISTRIBUTION = [
  { city: 'Dubai', role: 'Commercial Hub & Stocking Hub', icon: 'fa-city' },
  { city: 'Abu Dhabi', role: 'Capital & Infrastructure Distribution', icon: 'fa-landmark' },
  { city: 'Sharjah', role: 'Northern Emirates Channel Hub', icon: 'fa-building' },
  { city: 'Ajman', role: 'Trade & Installer Resellers', icon: 'fa-store' },
  { city: 'Fujairah', role: 'East Coast Distribution', icon: 'fa-water' },
  { city: 'Ras Al Khaimah', role: 'Industrial & Project Fulfillment', icon: 'fa-industry' },
];

const GCC_DISTRIBUTION = [
  { country: 'Saudi Arabia', hub: 'Riyadh & Eastern Province Distribution', flag: '🇸🇦' },
  { country: 'Kuwait', hub: 'Kuwait City Channel Network', flag: '🇰🇼' },
  { country: 'Qatar', hub: 'Doha Enterprise Distribution', flag: '🇶🇦' },
  { country: 'Bahrain', hub: 'Manama Commercial Network', flag: '🇧🇭' },
  { country: 'Oman', hub: 'Muscat Regional Fulfillment', flag: '🇴🇲' },
];

export default function WhereToBuy() {
  return (
    <div className="wtb-page">
      <SEO
        title="Where to Buy — Authorized Distributors & Resellers"
        description="Find ADORN structured cabling, fiber, cabinets, and ELV products through authorized distributors and resellers across UAE and the GCC."
        url="/where-to-buy"
      />

      {/* Hero */}
      <section className="wtb-hero">
        <div className="container">
          <div className="wtb-hero-content">
            <span className="wtb-badge">
              <i className="fas fa-map-marked-alt"></i> Distribution Network
            </span>
            <h1>
              Find <span className="hl">ADORN Products</span>
            </h1>
            <p className="wtb-hero-lead">
              ADORN products are available through authorized distributors and resellers across the UAE and GCC.
            </p>
            <div className="wtb-hero-tags">
              <span className="w-tag"><i className="fas fa-check-circle"></i> UAE Authorized Stockists</span>
              <span className="w-tag"><i className="fas fa-check-circle"></i> GCC Regional Distribution</span>
              <span className="w-tag"><i className="fas fa-check-circle"></i> Registered Partner Portal</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container wtb-body">
        {/* ══════════════════════════════════════════════
            1. HEAD OFFICE CARD
        ══════════════════════════════════════════════ */}
        <section className="wtb-office-section">
          <div className="office-card">
            <div className="office-card-left">
              <span className="office-tag">Regional Headquarters</span>
              <h2>ADORN UAE &mdash; Head Office</h2>
              <div className="office-meta-list">
                <div className="om-item">
                  <i className="fas fa-building"></i>
                  <div>
                    <strong>Company Entity:</strong>
                    <span>ADORN Information Technology Systems LLC</span>
                  </div>
                </div>
                <div className="om-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <div>
                    <strong>Location:</strong>
                    <span>Jumeirah Lake Towers, Dubai, UAE</span>
                  </div>
                </div>
                <div className="om-item">
                  <i className="fas fa-envelope"></i>
                  <div>
                    <strong>Email:</strong>
                    <a href="mailto:info@adornconnect.com">info@adornconnect.com</a>
                  </div>
                </div>
                <div className="om-item">
                  <i className="fas fa-globe"></i>
                  <div>
                    <strong>Official Website:</strong>
                    <a href="https://www.adornconnect.com" target="_blank" rel="noopener noreferrer">www.adornconnect.com</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="office-card-right">
              <div className="order-portal-box">
                <div className="opb-icon"><i className="fas fa-shopping-cart"></i></div>
                <h3>Online Ordering</h3>
                <p>Dedicated ordering portal for registered partners, certified integrators, and authorized distributors.</p>
                <div className="portal-link-wrap">
                  <a href="https://adornconnect.com/products" className="portal-url" target="_blank" rel="noopener noreferrer">
                    <i className="fas fa-external-link-alt"></i> adornconnect.com/order
                  </a>
                  <span className="portal-note">(registered partners)</span>
                </div>
                <a
                  href="https://wa.me/971526387275?text=Hello%20ADORN%2C%20I%20would%20like%20to%20place%20an%20order%20or%20find%20my%20nearest%20distributor"
                  className="order-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-whatsapp"></i> Inquire for Local Stock
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            2. UAE DISTRIBUTION
        ══════════════════════════════════════════════ */}
        <section className="wtb-dist-section">
          <div className="wtb-section-header">
            <div className="wtb-sec-icon"><i className="fas fa-flag"></i></div>
            <div>
              <span className="wtb-sub-tag">United Arab Emirates</span>
              <h2>UAE Distribution</h2>
              <p>Comprehensive availability across all 6 Emirates via authorized stockists and local distributors.</p>
            </div>
          </div>

          <div className="uae-grid">
            {UAE_DISTRIBUTION.map((d, i) => (
              <div key={i} className="uae-card">
                <div className="uae-icon"><i className={`fas ${d.icon}`}></i></div>
                <h3>{d.city}</h3>
                <p>{d.role}</p>
                <a
                  href={`https://wa.me/971526387275?text=Hello%20ADORN%2C%20I%20am%20looking%20for%20an%20authorized%20distributor%20in%20${encodeURIComponent(d.city)}`}
                  className="uae-dist-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Find {d.city} Stockist &rarr;
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            3. GCC REGIONAL DISTRIBUTION
        ══════════════════════════════════════════════ */}
        <section className="wtb-dist-section">
          <div className="wtb-section-header">
            <div className="wtb-sec-icon"><i className="fas fa-globe-asia"></i></div>
            <div>
              <span className="wtb-sub-tag">Gulf Cooperation Council</span>
              <h2>GCC Distribution</h2>
              <p>Regional partner network serving key markets across the Gulf digital economy.</p>
            </div>
          </div>

          <div className="gcc-grid">
            {GCC_DISTRIBUTION.map((g, i) => (
              <div key={i} className="gcc-card">
                <div className="gcc-flag">{g.flag}</div>
                <h3>{g.country}</h3>
                <p>{g.hub}</p>
                <a
                  href={`https://wa.me/971526387275?text=Hello%20ADORN%2C%20I%20am%20inquiring%20about%20distribution%20in%20${encodeURIComponent(g.country)}`}
                  className="gcc-dist-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact {g.country} Desk &rarr;
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            4. BECOME A DISTRIBUTOR BANNER
        ══════════════════════════════════════════════ */}
        <div className="wtb-cta-banner">
          <div className="wtb-cta-content">
            <h3>Interested in Becoming an Authorized ADORN Distributor?</h3>
            <p>
              We welcome established IT distributors, electrical trading companies, and procurement houses across the UAE and GCC to join our channel network.
            </p>
          </div>
          <div className="wtb-cta-actions">
            <Link to="/partner-network" className="hero-btn hero-btn-primary">
              <i className="fas fa-handshake"></i> Partner Program
            </Link>
            <a
              href="https://wa.me/971526387275?text=Hello%20ADORN%2C%20we%20would%20like%20to%20apply%20as%20an%20authorized%20reseller%2Fdistributor"
              className="hero-btn hero-btn-outline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-whatsapp"></i> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

