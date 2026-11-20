import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { fetchBanner, imgUrl } from '../api';
import { HomeSEO } from '../components/SEO';
import useScrollReveal from '../hooks/useScrollReveal';
import './Home.css';

const DEFAULT_BANNERS = [];

const WHY_ADORN_ITEMS = [
  {
    icon: 'fa-medal',
    reason: 'Quality Without Compromise',
    means: 'Products manufactured with selected materials and tested for consistent, long-term reliability',
  },
  {
    icon: 'fa-layer-group',
    reason: 'Complete Infrastructure Portfolio',
    means: 'One brand for structured cabling, fiber, cabinets, connectivity, and accessories',
  },
  {
    icon: 'fa-tools',
    reason: 'Built for System Integrators',
    means: 'Designed with installers, engineers, and consultants in mind',
  },
  {
    icon: 'fa-graduation-cap',
    reason: 'Technical Knowledge & Support',
    means: 'Training, guidance, and educational resources for professionals',
  },
  {
    icon: 'fa-handshake',
    reason: 'Growing Partner Network',
    means: 'Strong relationships with distributors, resellers, and contractors across the GCC',
  },
  {
    icon: 'fa-rocket',
    reason: 'Future Ready',
    means: 'Designed for AI infrastructure, smart buildings, PoE, IoT, and next-gen enterprise',
  },
];

const INTERNATIONAL_STANDARDS = [
  { standard: 'ANSI/TIA-568.2-D', desc: 'Balanced Twisted-Pair Cabling Performance', icon: 'fa-network-wired' },
  { standard: 'ANSI/TIA-568.3-D', desc: 'Optical Fiber Cabling Performance', icon: 'fa-bolt' },
  { standard: 'ISO/IEC 11801 Ed.3', desc: 'Generic Cabling for Customer Premises', icon: 'fa-globe' },
  { standard: 'EN 50173', desc: 'European Cabling Standard', icon: 'fa-shield-alt' },
  { standard: 'IEEE 802.3bt', desc: 'PoE Standard (up to 90W)', icon: 'fa-plug' },
  { standard: 'TIA-942-B', desc: 'Data Centre Telecommunications Infrastructure', icon: 'fa-server' },
  { standard: 'IEC 61935', desc: 'Cabling Testing Standard', icon: 'fa-check-double' },
];

const REGIONAL_COMPLIANCE = [
  { authority: 'TDRA', relevance: 'UAE Telecommunications Infrastructure', icon: 'fa-broadcast-tower' },
  { authority: 'Dubai Municipality', relevance: 'Building & MEP Cabling Standards', icon: 'fa-city' },
  { authority: 'SIRA (Dubai)', relevance: 'ELV & Security System Compliance', icon: 'fa-user-shield' },
  { authority: 'UAE Civil Defense', relevance: 'LSZH Fire-Rated Cabling Requirements', icon: 'fa-fire-extinguisher' },
  { authority: 'Etisalat/e&', relevance: 'FTTH Fiber Infrastructure Standards', icon: 'fa-wifi' },
  { authority: 'Estidama Pearl', relevance: 'Sustainable Infrastructure, Abu Dhabi', icon: 'fa-leaf' },
  { authority: 'ADORN ISO Certifications', relevance: 'ISO 9001, 14001, 27001, 45001 (LEMS-certified, 2026)', icon: 'fa-award', highlight: true },
];

const ISO_CERT_BADGES = [
  { code: 'ISO 9001', label: 'Quality Management', icon: 'fa-award' },
  { code: 'ISO 14001', label: 'Environmental Management', icon: 'fa-leaf' },
  { code: 'ISO 27001', label: 'Information Security', icon: 'fa-shield-alt' },
  { code: 'ISO 45001', label: 'Health & Safety', icon: 'fa-heartbeat' },
];

const FEATURED_PROJECTS = [
  {
    project: 'Corporate Tower',
    location: 'Dubai, UAE',
    solution: 'Structured Cabling, Fiber, Cabinets',
    icon: 'fa-building',
    tags: ['Structured Cabling', 'Fiber', 'Cabinets'],
  },
  {
    project: 'University Campus',
    location: 'Abu Dhabi, UAE',
    solution: 'Campus Cabling, Wi-Fi, Security',
    icon: 'fa-university',
    tags: ['Campus Cabling', 'Wi-Fi', 'Security'],
  },
  {
    project: 'Government Complex',
    location: 'Sharjah, UAE',
    solution: 'Cabling, Fiber, Access Control, CCTV',
    icon: 'fa-landmark',
    tags: ['Cabling', 'Fiber', 'Access Control', 'CCTV'],
  },
  {
    project: 'Hospital Network',
    location: 'Dubai, UAE',
    solution: 'Structured Cabling, Nurse Call, CCTV',
    icon: 'fa-hospital',
    tags: ['Structured Cabling', 'Nurse Call', 'CCTV'],
  },
  {
    project: '5-Star Hotel',
    location: 'Dubai Marina',
    solution: 'GRMS, CCTV, Access Control, Guest Network',
    icon: 'fa-hotel',
    tags: ['GRMS', 'CCTV', 'Access Control', 'Guest Network'],
  },
  {
    project: 'Data Centre',
    location: 'Dubai, UAE',
    solution: 'High-density Cabling, Fiber, Power (TIA-942)',
    icon: 'fa-server',
    tags: ['High-density Cabling', 'Fiber', 'Power (TIA-942)'],
  },
];

export default function Home() {
  const [banners, setBanners] = useState(DEFAULT_BANNERS);
  const [current, setCurrent] = useState(0);
  const timer = useRef(null);
  const revealRef = useScrollReveal();

  useEffect(() => {
    fetchBanner().then(b => {
      if (b && Array.isArray(b.images) && b.images.length) setBanners(b.images);
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

      {/* ─── Hero ─── */}
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
        <div className="hero-orb hero-orb-1"></div>
        <div className="hero-orb hero-orb-2"></div>

        <div className="container hero-content">
          <h1 className="animate-rise" style={{ animationDelay: '.15s' }}>
            Building the Future of <span className="hero-hl">Network Infrastructure</span>
          </h1>
          <p className="hero-subheadline animate-rise" style={{ animationDelay: '.35s' }}>
            Delivering innovative, high-performance structured cabling and passive networking solutions that power smart buildings, enterprise networks, data centres, and the connected world of tomorrow.
          </p>
          <p className="hero-brand-statement animate-rise" style={{ animationDelay: '.45s' }}>
            ADORN is a UAE-based technology brand specializing in structured cabling, fiber optic connectivity, network cabinets, passive networking solutions, and ELV infrastructure products. Designed for reliability, engineered for performance, and backed by technical expertise, ADORN helps businesses, contractors, system integrators, and consultants build secure, scalable, and future-ready network infrastructures.
          </p>
          <div className="hero-btns animate-rise" style={{ animationDelay: '.55s' }}>
            <Link to="/products" className="hero-btn hero-btn-primary hero-btn-grow">
              <i className="fas fa-th-large"></i> Explore Products
            </Link>
            <Link to="/partner-program" className="hero-btn hero-btn-outline hero-btn-grow">
              <i className="fas fa-handshake"></i> Become a Partner
            </Link>
          </div>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1000 100" preserveAspectRatio="none">
            <path d="M0,10 C150,90 350,0 500,30 C650,60 850,15 1000,45 L1000,100 L0,100 Z" fill="white"></path>
          </svg>
        </div>
      </section>

      <div ref={revealRef}>

        {/* ─── About ADORN & Who We Are (Left & Right Layout) ─── */}
        <section className="web-about-who">
          <div className="floating-shape floating-shape-1"></div>
          <div className="floating-shape floating-shape-2"></div>
          <div className="container">
            <div className="about-who-grid">
              {/* Left Column: About ADORN */}
              <div className="about-who-card about-card reveal reveal-left">
                <div className="aw-card-accent"></div>
                <div className="aw-badge-wrap">
                  <span className="ab-badge">
                    <i className="fas fa-building"></i> About ADORN
                  </span>
                </div>
                <h2>Building the Foundation for a <span className="hl">Connected World</span></h2>
                <p className="web-about-lead">
                  ADORN is a UAE-based technology brand specializing in structured cabling, fiber optic connectivity, network cabinets, passive networking solutions, and ELV infrastructure products.
                </p>
                <p className="aw-desc">
                  Designed for reliability, engineered for performance, and backed by technical expertise, ADORN helps businesses, contractors, system integrators, and consultants build secure, scalable, and future-ready network infrastructures.
                </p>
                <div className="aw-tags">
                  <span className="aw-tag"><i className="fas fa-certificate"></i> ISO Certified</span>
                  <span className="aw-tag"><i className="fas fa-network-wired"></i> Passive &amp; ELV</span>
                  <span className="aw-tag"><i className="fas fa-shield-alt"></i> Proven Reliability</span>
                  <span className="aw-tag"><i className="fas fa-map-marker-alt"></i> UAE Stock &amp; Support</span>
                </div>
              </div>

              {/* Right Column: Who We Are */}
              <div className="about-who-card who-card reveal reveal-right">
                <div className="aw-card-accent"></div>
                <div className="aw-badge-wrap">
                  <span className="ab-badge">
                    <i className="fas fa-users"></i> Who We Are
                  </span>
                </div>
                <h2>Building Connections That Power <span className="hl">Tomorrow</span></h2>
                <p className="web-about-lead">
                  Technology is transforming the way people live, work, communicate, and do business. Behind every successful digital transformation lies a reliable network infrastructure that connects people, devices, applications, and data.
                </p>
                <p className="aw-desc">
                  At ADORN, we believe network infrastructure is more than cables and connectivity. It is the foundation of every intelligent building, enterprise network, and digital ecosystem.
                </p>
                <div className="aw-tags">
                  <span className="aw-tag"><i className="fas fa-building"></i> Intelligent Buildings</span>
                  <span className="aw-tag"><i className="fas fa-server"></i> Enterprise Networks</span>
                  <span className="aw-tag"><i className="fas fa-network-wired"></i> Digital Ecosystems</span>
                  <span className="aw-tag"><i className="fas fa-project-diagram"></i> Scalable Infrastructure</span>
                </div>
              </div>
            </div>

            {/* ─── Why ADORN Exists (Single Center View Section) ─── */}
            <div className="web-why-center reveal reveal-fade-up">
              <span className="ab-badge">
                <i className="fas fa-bullseye"></i> Why ADORN Exists
              </span>
              <h2>Why ADORN <span className="hl">Exists</span></h2>
              <p className="why-lead">
                ADORN was established with a simple purpose: To empower businesses and technology professionals with reliable infrastructure solutions, practical technical knowledge, and trusted partnerships that enable them to build the connected world of tomorrow.
              </p>
              <p>
                We understand that success is not achieved by supplying products alone. It is built through confidence, consistency, education, and long-term relationships. Every cable, cabinet, fiber solution, connectivity product, and accessory we develop is designed to help our partners deliver dependable and scalable infrastructure that stands the test of time.
              </p>
              <p>
                Our commitment extends beyond manufacturing and distribution. We believe our responsibility is to contribute to the growth of the industry by sharing knowledge, supporting system integrators, empowering channel partners, and investing in the development of future technology professionals.
              </p>
              <p>
                As technology continues to evolve, so will ADORN &mdash; innovating, expanding, strengthening partnerships, and raising the standards of networking and ELV infrastructure across the region.
              </p>
              <div className="why-quote-banner">
                <i className="fas fa-quote-left why-quote-icon"></i>
                <p className="why-quote-text">
                  Because every great network begins with a strong foundation.<br />
                  And every strong foundation begins with <span className="hl">trust</span>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Our Story ─── */}
        <section className="web-story">
          <div className="container">
            <div className="web-story-header reveal reveal-fade-up">
              <span className="ab-badge">
                <i className="fas fa-landmark"></i> Our Story
              </span>
              <h2>Rooted in the UAE. <span className="hl">Built for the Region.</span></h2>
            </div>

            <div className="web-story-grid">
              <div className="story-col reveal reveal-left">
                <div className="story-card">
                  <div className="story-card-icon"><i className="fas fa-flag"></i></div>
                  <h3>Homegrown Vision &amp; Digital Growth</h3>
                  <p className="story-lead">
                    ADORN was founded in the United Arab Emirates with a clear vision: to create a trusted, homegrown technology infrastructure brand that serves the evolving needs of the GCC’s rapidly growing digital economy.
                  </p>
                  <p>
                    The UAE has established itself as one of the world’s most connected and technology-forward nations. With ambitious initiatives such as the <strong>UAE Digital Economy Strategy</strong>, <strong>Dubai Smart City</strong>, and <strong>Vision 2031</strong>, the demand for reliable, high-performance network infrastructure has never been greater.
                  </p>
                  <div className="story-badges">
                    <span className="story-badge"><i className="fas fa-city"></i> Dubai Smart City</span>
                    <span className="story-badge"><i className="fas fa-chart-line"></i> UAE Digital Economy</span>
                    <span className="story-badge"><i className="fas fa-compass"></i> Vision 2031</span>
                  </div>
                </div>
              </div>

              <div className="story-col reveal reveal-right">
                <div className="story-card">
                  <div className="story-card-icon"><i className="fas fa-hand-holding-heart"></i></div>
                  <h3>Solving Fragmentation &amp; Empowering Teams</h3>
                  <p>
                    Yet the market was fragmented. Contractors, system integrators, and consultants were navigating a complex landscape of brands and distributors &mdash; often without a single reliable partner. ADORN was established to change that.
                  </p>
                  <p>
                    We started with a foundational belief: a great infrastructure brand does more than manufacture and supply products. It empowers the professionals who install, design, and maintain those products. It provides technical knowledge. It builds communities of skilled professionals. And it stands behind every project, every time.
                  </p>
                  <div className="story-footer-note">
                    <i className="fas fa-map-marked-alt"></i>
                    <span>
                      From our base in Dubai, ADORN serves system integrators, distributors, contractors, engineers, and consultants across commercial, enterprise, education, healthcare, hospitality, government, and industrial sectors &mdash; across the UAE and GCC.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-wave section-wave-white">
          <svg viewBox="0 0 1000 100" preserveAspectRatio="none">
            <path d="M0,80 C150,30 350,90 500,50 C650,10 850,70 1000,40 L1000,100 L0,100 Z" fill="#322160" fillOpacity=".03"></path>
          </svg>
        </div>

        {/* ─── Purpose, Vision & Mission ─── */}
        <section className="web-pvm">
          <div className="container">
            <div className="web-pvm-grid">
              <div className="web-pvm-card reveal reveal-left">
                <div className="web-pvm-num">01</div>
                <h3>Purpose</h3>
                <p>To empower the people who build the world's digital infrastructure through trusted products, technical knowledge, and lasting partnerships.</p>
              </div>
              <div className="web-pvm-card reveal reveal-up">
                <div className="web-pvm-num">02</div>
                <h3>Vision</h3>
                <p>To become one of the GCC's most trusted infrastructure technology brands, recognized for quality, innovation, technical excellence, and developing the next generation of networking professionals.</p>
              </div>
              <div className="web-pvm-card reveal reveal-right">
                <div className="web-pvm-num">03</div>
                <h3>Mission</h3>
                <p>We design, develop, and deliver reliable passive networking and ELV infrastructure solutions while supporting our partners through technical expertise, education, and exceptional customer service, enabling them to build secure, scalable, and future-ready networks.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Why ADORN (Reason & What This Means For You) ─── */}
        <section className="web-why-adorn">
          <div className="container">
            <div className="web-why-adorn-head reveal reveal-fade-up">
              <span className="ab-badge">
                <i className="fas fa-check-circle"></i> Why ADORN
              </span>
              <h2>Why <span className="hl">ADORN</span></h2>
              <p className="why-adorn-sub">
                Clear infrastructure advantages designed for contractors, system integrators, and consultants.
              </p>
            </div>

            <div className="why-adorn-table-wrap reveal reveal-up">
              <div className="why-adorn-accent"></div>
              <table className="why-adorn-table">
                <thead>
                  <tr>
                    <th className="th-reason">
                      <span className="th-badge"><i className="fas fa-bullseye"></i> Reason</span>
                    </th>
                    <th className="th-means">
                      <span className="th-badge"><i className="fas fa-user-check"></i> What This Means For You</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {WHY_ADORN_ITEMS.map((item, i) => (
                    <tr key={i} className="why-adorn-row">
                      <td className="td-reason">
                        <div className="reason-cell">
                          <div className="reason-icon">
                            <i className={`fas ${item.icon}`}></i>
                          </div>
                          <strong>{item.reason}</strong>
                        </div>
                      </td>
                      <td className="td-means">
                        <div className="means-cell">
                          <span className="means-mobile-tag">What This Means For You:</span>
                          <div className="means-content">
                            <i className="fas fa-check-circle means-check"></i>
                            <span>{item.means}</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ─── Core Values ─── */}
        <section className="web-values">
          <div className="container">
            <div className="web-pvm-card reveal reveal-fade-up" style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 40px' }}>
              <span className="ab-badge">Core Values</span>
              <h2 style={{ fontSize: '1.4rem', marginTop: 12 }}>What Drives Everything We Do</h2>
            </div>
            <div className="web-values-grid">
              {[
                { icon: 'fa-shield-alt', title: 'Trust', desc: 'We build lasting relationships through honesty, transparency, and reliability.' },
                { icon: 'fa-award', title: 'Quality', desc: 'We never compromise on the performance, durability, or reliability of our products.' },
                { icon: 'fa-book-open', title: 'Knowledge', desc: 'We believe education creates stronger professionals, stronger partnerships, and better infrastructure.' },
                { icon: 'fa-lightbulb', title: 'Innovation', desc: 'We continuously evolve our products and solutions to meet the changing demands of technology.' },
                { icon: 'fa-users', title: 'Partnership', desc: 'Our success is built on the success of our customers, channel partners, consultants, and system integrators.' },
                { icon: 'fa-heart', title: 'Commitment', desc: 'We stand behind every product, every partner, and every project with dedication and accountability.' },
              ].map((item, i) => (
                <div className={`web-value-card reveal reveal-${i % 3 === 0 ? 'left' : i % 3 === 2 ? 'right' : 'up'}`} key={i}>
                  <div className="web-value-icon"><i className={`fas ${item.icon}`}></i></div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Certifications & Standards ─── */}
        <section className="web-certs">
          <div className="container">
            <div className="web-certs-head reveal reveal-fade-up">
              <span className="ab-badge">
                <i className="fas fa-certificate"></i> Certifications &amp; Standards
              </span>
              <h2>Infrastructure You Can Trust. <span className="hl">Standards You Can Verify.</span></h2>
              <p className="web-certs-sub">
                Our infrastructure solutions comply with rigorous global engineering benchmarks and UAE regulatory mandates.
              </p>
            </div>

            <div className="web-certs-grid">
              {/* International Standards */}
              <div className="certs-card reveal reveal-left">
                <div className="certs-card-head">
                  <div className="certs-card-icon"><i className="fas fa-globe"></i></div>
                  <div>
                    <h3>International Standards</h3>
                    <p>Global specifications for copper, fiber, PoE, and data centres</p>
                  </div>
                </div>
                <div className="certs-table-wrap">
                  <table className="certs-table">
                    <thead>
                      <tr>
                        <th className="th-standard">International Standard</th>
                        <th className="th-desc">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {INTERNATIONAL_STANDARDS.map((item, idx) => (
                        <tr key={idx} className="certs-row">
                          <td className="td-standard">
                            <div className="cert-std-cell">
                              <i className={`fas ${item.icon} cert-icon`}></i>
                              <strong>{item.standard}</strong>
                            </div>
                          </td>
                          <td className="td-desc">
                            <span className="mobile-std-label">Description:</span>
                            <span className="desc-text">{item.desc}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* UAE & Regional Compliance */}
              <div className="certs-card reveal reveal-right">
                <div className="certs-card-head">
                  <div className="certs-card-icon"><i className="fas fa-shield-alt"></i></div>
                  <div>
                    <h3>UAE &amp; Regional Compliance</h3>
                    <p>Mandatory standards and authority approvals across the UAE</p>
                  </div>
                </div>
                <div className="certs-table-wrap">
                  <table className="certs-table">
                    <thead>
                      <tr>
                        <th className="th-standard">UAE/Regional Compliance</th>
                        <th className="th-desc">Relevance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {REGIONAL_COMPLIANCE.map((item, idx) => (
                        <tr key={idx} className={`certs-row ${item.highlight ? 'certs-row-highlight' : ''}`}>
                          <td className="td-standard">
                            <div className="cert-std-cell">
                              <i className={`fas ${item.icon} cert-icon`}></i>
                              <strong>{item.authority}</strong>
                            </div>
                          </td>
                          <td className="td-desc">
                            <span className="mobile-std-label">Relevance:</span>
                            <span className="desc-text">{item.relevance}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* ADORN ISO Certifications Banner */}
            <div className="certs-iso-banner reveal reveal-fade-up">
              <div className="iso-banner-accent"></div>
              <div className="iso-banner-left">
                <div className="iso-badge-tag">
                  <i className="fas fa-medal"></i> Governance &amp; Excellence
                </div>
                <h3>ADORN ISO Certifications</h3>
                <p className="iso-audit-info">
                  <i className="fas fa-check-double"></i> ISO 9001, 14001, 27001, 45001 &bull; <strong>LEMS-certified (2026)</strong>
                </p>
              </div>
              <div className="iso-badges-grid">
                {ISO_CERT_BADGES.map((b, i) => (
                  <div className="iso-badge-item" key={i}>
                    <div className="iso-code-wrap">
                      <i className={`fas ${b.icon}`}></i>
                      <span className="iso-code">{b.code}</span>
                    </div>
                    <span className="iso-label">{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Featured Solutions ─── */}
        <section className="web-solutions">
          <div className="container">
            <div className="web-pvm-card reveal reveal-fade-up" style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 40px' }}>
              <span className="ab-badge">Featured Solutions</span>
              <h2 style={{ fontSize: '1.4rem', marginTop: 12 }}>Infrastructure Solutions for a Connected World</h2>
              <p style={{ color: 'var(--gray-500)', marginTop: 8 }}>ADORN provides infrastructure solutions designed to support modern digital environments across commercial, enterprise, and technology applications.</p>
            </div>
            <div className="web-solutions-grid">
              {[
                { icon: 'fa-building', title: 'Smart Buildings', desc: 'Infrastructure solutions supporting intelligent, connected, and automated building environments.' },
                { icon: 'fa-network-wired', title: 'Enterprise Networks', desc: 'Reliable structured cabling and passive networking solutions for modern business networks.' },
                { icon: 'fa-server', title: 'Data Centres', desc: 'High-performance connectivity and infrastructure solutions for critical data centre environments.' },
                { icon: 'fa-plug', title: 'Structured Cabling', desc: 'Reliable copper cabling solutions designed for scalable and dependable network performance.' },
                { icon: 'fa-bolt', title: 'Fiber Optic Systems', desc: 'High-speed fiber connectivity solutions for reliable data transmission and modern network infrastructure.' },
                { icon: 'fa-th-large', title: 'Passive Networking', desc: 'Essential connectivity products and accessories for building organized, reliable network infrastructure.' },
                { icon: 'fa-broadcast-tower', title: 'ELV Infrastructure', desc: 'Infrastructure solutions supporting modern low-voltage technology and building systems.' },
              ].map((item, i) => (
                <div className={`web-solution-card reveal reveal-${i % 4 === 0 ? 'left' : i % 4 === 3 ? 'right' : 'up'}`} key={i}>
                  <div className="web-solution-icon"><i className={`fas ${item.icon}`}></i></div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Featured Projects ─── */}
        <section className="web-projects">
          <div className="container">
            <div className="web-projects-head reveal reveal-fade-up">
              <span className="ab-badge">
                <i className="fas fa-project-diagram"></i> Featured Projects
              </span>
              <h2>Proven Deployments. <span className="hl">Critical Infrastructure.</span></h2>
              <p className="web-projects-sub">
                Explore key reference projects engineered with ADORN structured cabling, fiber optic, and ELV solutions across the UAE and GCC.
              </p>
            </div>

            <div className="web-projects-table-wrap reveal reveal-up">
              <div className="projects-table-accent"></div>
              <table className="web-projects-table">
                <thead>
                  <tr>
                    <th className="th-proj-name">
                      <span className="th-badge"><i className="fas fa-building"></i> Project</span>
                    </th>
                    <th className="th-proj-loc">
                      <span className="th-badge"><i className="fas fa-map-marker-alt"></i> Location</span>
                    </th>
                    <th className="th-proj-sol">
                      <span className="th-badge"><i className="fas fa-tools"></i> Solution</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {FEATURED_PROJECTS.map((item, idx) => (
                    <tr key={idx} className="web-project-row">
                      <td className="td-proj-name">
                        <div className="proj-name-cell">
                          <div className="proj-icon">
                            <i className={`fas ${item.icon}`}></i>
                          </div>
                          <div>
                            <strong>{item.project}</strong>
                            <span className="proj-mobile-loc">
                              <i className="fas fa-map-marker-alt"></i> {item.location}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="td-proj-loc">
                        <span className="loc-badge">
                          <i className="fas fa-map-marker-alt"></i> {item.location}
                        </span>
                      </td>
                      <td className="td-proj-sol">
                        <div className="proj-sol-wrap">
                          <span className="sol-text-main">{item.solution}</span>
                          <div className="sol-tags">
                            {item.tags.map((t, ti) => (
                              <span key={ti} className="sol-tag">{t}</span>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

      </div>

      {/* ─── Contact ─── */}
      <section className="about-bridge" id="contact">
        <div className="container">
          <div className="ab-head">
            <span className="ab-badge">Contact</span>
            <h2>Get in Touch With ADORN</h2>
            <p>Reach out for product inquiries, project consultations, or technical support.</p>
          </div>
          <div className="about-contact">
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
