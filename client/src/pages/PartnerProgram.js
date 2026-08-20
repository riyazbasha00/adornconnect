import React, { useState } from 'react';
import { SEO } from '../components/SEO';
import './PartnerProgram.css';

const PARTNER_TYPES = [
  {
    icon: 'fas fa-user-graduate',
    label: 'Individual Partner',
    desc: 'For students and fresh graduates looking to start their career in networking and infrastructure.',
    sub: [
      { icon: 'fas fa-book-reader', label: 'Student', desc: 'Enrolled students in networking, IT, or engineering programs seeking hands-on experience and industry exposure.' },
      { icon: 'fas fa-user-tie', label: 'Fresh Graduate', desc: 'Recently graduated professionals ready to enter the networking and structured cabling industry.' },
    ]
  },
  {
    icon: 'fas fa-store',
    label: 'Reseller Partner',
    desc: 'Distributors, retailers, and channel partners who sell ADORN products to end customers.',
    sub: []
  },
  {
    icon: 'fas fa-project-diagram',
    label: 'System Integrator Partner',
    desc: 'Contractors, consultants, and integrators who design and deploy infrastructure projects using ADORN solutions.',
    sub: []
  },
];

const BENEFITS = [
  { icon: 'fas fa-percentage', title: 'Competitive Margins', desc: 'Attractive pricing and margins tailored to your business model.' },
  { icon: 'fas fa-graduation-cap', title: 'Training & Certification', desc: 'Access to ADORN Academy courses, technical training, and certification programs.' },
  { icon: 'fas fa-boxes', title: 'Product Access', desc: 'Priority access to new products, sample units, and demo kits.' },
  { icon: 'fas fa-bullhorn', title: 'Marketing Support', desc: 'Co-branded materials, product catalogs, and digital marketing assets.' },
  { icon: 'fas fa-headset', title: 'Dedicated Support', desc: 'Technical support hotline and dedicated account manager for your projects.' },
  { icon: 'fas fa-handshake', title: 'Partner Network', desc: 'Join a growing ecosystem of distributors, integrators, and technology professionals across the GCC.' },
];

export default function PartnerProgram() {
  const [partnerType, setPartnerType] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!partnerType || !name.trim() || !phone.trim()) return;
    const msg = `Hi ADORN, I'd like to become a partner.\n\nPartner Type: ${partnerType}\nName: ${name.trim()}\nPhone: ${phone.trim()}`;
    window.open('https://wa.me/971526387275?text=' + encodeURIComponent(msg), '_blank');
  };

  return (
    <>
      <SEO
        title="Partner Program"
        description="Join the ADORN Partner Program. Become a reseller, system integrator, or individual partner and access training, competitive pricing, and growth opportunities."
        url="/partner-program"
      />

      <section className="pp-hero">
        <div className="container">
          <span className="pp-badge">Grow With Us</span>
          <h1>Partner <span className="hl">Program</span></h1>
          <p>Join our growing network of technology professionals and build the connected world together.</p>
        </div>
      </section>

      <section className="pp-section">
        <div className="container">
          <div className="pp-head">
            <span className="pp-count">3 Partner Types</span>
            <h2>Become a Partner</h2>
            <p>Choose the partnership model that fits your business and goals.</p>
          </div>
          <div className="pp-types">
            {PARTNER_TYPES.map((p, i) => (
              <div className="pp-type-card" key={i}>
                <div className="pp-type-header">
                  <div className="pp-type-icon"><i className={p.icon}></i></div>
                  <div>
                    <h3>{p.label}</h3>
                    <p>{p.desc}</p>
                  </div>
                </div>
                {p.sub.length > 0 && (
                  <div className="pp-sub-cards">
                    {p.sub.map((s, si) => (
                      <div className="pp-sub-card" key={si}>
                        <div className="pp-sub-icon"><i className={s.icon}></i></div>
                        <div>
                          <h4>{s.label}</h4>
                          <p>{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pp-section pp-benefits">
        <div className="container">
          <div className="pp-head">
            <span className="pp-count">{BENEFITS.length} Benefits</span>
            <h2>Partner Benefits</h2>
            <p>What you get when you join the ADORN Partner Program.</p>
          </div>
          <div className="pp-benefits-grid">
            {BENEFITS.map((b, i) => (
              <div className="pp-benefit-card" key={i}>
                <div className="pp-benefit-icon"><i className={b.icon}></i></div>
                <h4>{b.title}</h4>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pp-form-section">
        <div className="container">
          <div className="pp-form-card">
            <div className="pp-form-left">
              <span className="pp-badge">Get Started</span>
              <h2>Become a <span className="hl">Partner</span></h2>
              <p>Fill out the form and our team will reach out to you on WhatsApp to discuss partnership opportunities.</p>
              <ul className="pp-form-perks">
                <li><i className="fas fa-check-circle"></i> Quick onboarding process</li>
                <li><i className="fas fa-check-circle"></i> Dedicated partner support</li>
                <li><i className="fas fa-check-circle"></i> Access to training & resources</li>
                <li><i className="fas fa-check-circle"></i> Competitive partner pricing</li>
              </ul>
            </div>
            <form className="pp-form-right" onSubmit={handleSubmit}>
              <h3>Partner Application</h3>
              <div className="pp-field">
                <label>Partner Type</label>
                <select value={partnerType} onChange={e => setPartnerType(e.target.value)} required>
                  <option value="" disabled>Select partner type</option>
                  <option value="Student">Student</option>
                  <option value="Fresh Graduate">Fresh Graduate</option>
                  <option value="Reseller Partner">Reseller Partner</option>
                  <option value="System Integrator Partner">System Integrator Partner</option>
                </select>
              </div>
              <div className="pp-field">
                <label>Full Name</label>
                <input type="text" placeholder="Enter your full name" value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div className="pp-field">
                <label>Phone Number</label>
                <input type="tel" placeholder="+971 50 000 0000" value={phone} onChange={e => setPhone(e.target.value)} required />
              </div>
              <button type="submit" className="pp-submit">
                <i className="fab fa-whatsapp"></i> Submit via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
