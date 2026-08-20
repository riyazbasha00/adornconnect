import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import './Solutions.css';

const SOLUTIONS = [
  {
    icon: 'fas fa-sitemap',
    label: 'Structured Cabling',
    desc: 'Complete structured cabling systems for reliable, high-speed connectivity across all environments.',
    features: ['Cat5e / Cat6 / Cat6A / Cat8 Cabling', 'Fiber Optic (Single & Multi-mode)', 'Patch Panels & Cable Management', 'Testing & Certification', 'End-to-End Warranty']
  },
  {
    icon: 'fas fa-server',
    label: 'Data Centre Infrastructure',
    desc: 'High-performance cabling and cooling solutions for modern data centers.',
    features: ['High-Density Fiber & Copper', 'Pre-terminated Trunk Assemblies', 'Raised Floor & Containment', 'Hot/Cold Aisle Containment', 'UPS & Power Distribution']
  },
  {
    icon: 'fas fa-network-wired',
    label: 'Enterprise Networking',
    desc: 'Scalable network infrastructure for large organizations.',
    features: ['LAN & WAN Design', 'Switch & Router Setup', 'Wi-Fi Deployment', 'Network Monitoring', 'SD-WAN Solutions']
  },
  {
    icon: 'fas fa-building',
    label: 'Smart Buildings',
    desc: 'Intelligent building automation and connected systems.',
    features: ['IoT Sensor Networks', 'Building Management Systems', 'IP-based Intercom', 'Smart Lighting Control', 'Integrated Platform']
  },
  {
    icon: 'fas fa-shield-alt',
    label: 'Security Infrastructure',
    desc: 'CCTV, access control, and surveillance solutions.',
    features: ['IP CCTV & NVR Systems', 'Biometric Access Control', 'Intrusion Detection', 'Video Analytics', '24/7 Monitoring']
  },
  {
    icon: 'fas fa-bolt',
    label: 'Power & PoE Infrastructure',
    desc: 'Power over Ethernet and uninterruptible power systems.',
    features: ['PoE Switches & Injectors', 'UPS Systems', 'PDUs & Power Panels', 'Battery Backup', 'Energy Management']
  },
];

const INDUSTRIES = [
  { icon: 'fas fa-graduation-cap', label: 'Education', desc: 'Smart campus and e-learning infrastructure.' },
  { icon: 'fas fa-heartbeat', label: 'Healthcare', desc: 'Reliable connectivity for hospitals and clinics.' },
  { icon: 'fas fa-hotel', label: 'Hospitality', desc: 'Guest-ready networking for hotels and resorts.' },
  { icon: 'fas fa-landmark', label: 'Government', desc: 'Secure and compliant government facilities.' },
  { icon: 'fas fa-store', label: 'Retail', desc: 'POS, Wi-Fi, and digital signage infrastructure.' },
  { icon: 'fas fa-industry', label: 'Industrial', desc: 'Rugged networking for factories and warehouses.' },
  { icon: 'fas fa-home', label: 'Residential', desc: 'Smart home and structured cabling for villas.' },
];

export default function Solutions() {
  return (
    <>
      <SEO
        title="Solutions"
        description="ADORN provides end-to-end structured cabling, security, and networking solutions for data centers, enterprises, and smart buildings across Dubai and the UAE."
        url="/solutions"
      />

      <section className="sol-hero">
        <div className="container">
          <span className="sol-badge">What We Do</span>
          <h1>Our <span className="hl">Solutions</span></h1>
          <p>End-to-end infrastructure solutions designed for performance, reliability, and scalability.</p>
        </div>
      </section>

      <section className="sol-section">
        <div className="container">
          <div className="sol-head">
            <span className="sol-count">{SOLUTIONS.length} Solutions</span>
            <h2>Solutions</h2>
            <p>Comprehensive infrastructure solutions for every environment.</p>
          </div>
          <div className="sol-grid">
            {SOLUTIONS.map((s, i) => (
              <div key={i} className="sol-card">
                <div className="sol-card-icon"><i className={s.icon}></i></div>
                <h3>{s.label}</h3>
                <p>{s.desc}</p>
                {s.features && (
                  <ul className="sol-features">
                    {s.features.map((f, fi) => (
                      <li key={fi}><i className="fas fa-check-circle"></i> {f}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sol-section sol-industries">
        <div className="container">
          <div className="sol-head">
            <span className="sol-count">{INDUSTRIES.length} Industries</span>
            <h2>Industries</h2>
            <p>Tailored solutions for the industries we serve.</p>
          </div>
          <div className="sol-grid">
            {INDUSTRIES.map((s, i) => (
              <div key={i} className="sol-card">
                <div className="sol-card-icon"><i className={s.icon}></i></div>
                <h3>{s.label}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sol-cta">
        <div className="container">
          <h2>Need the right solution for your project?</h2>
          <p>Our experts help you choose the best infrastructure for your needs.</p>
          <div className="sol-cta-btns">
            <a href="https://wa.me/971526387275" target="_blank" rel="noreferrer" className="btn btn-primary">Talk to an Expert <i className="fas fa-arrow-right"></i></a>
            <Link to="/products" className="btn btn-outline">View Products</Link>
          </div>
        </div>
      </section>
    </>
  );
}
