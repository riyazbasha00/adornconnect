import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import './PartnerNetwork.css';

const PARTNERSHIP_PROGRAMS = [
  {
    id: 'student',
    title: 'Student Partner',
    badge: 'Academic & Emerging Talent',
    icon: 'fa-user-graduate',
    color: 'blue',
    target: 'For university/college students in networking, electrical engineering, IT, or related disciplines.',
    benefits: [
      'Free ADORN Academy learning resources and digital library access',
      'Discounted professional certification examination vouchers',
      'Direct mentorship from certified UAE infrastructure engineers',
      'Career access and internship pathways with leading GCC integrators',
    ],
    tiers: null,
  },
  {
    id: 'fresh-grad',
    title: 'Fresh Graduate Partner',
    badge: 'Career Launchpad',
    icon: 'fa-user-tie',
    color: 'teal',
    target: 'For recent graduates within 2 years of completing their degree or diploma.',
    benefits: [
      'Free ACPIS Level 1 (Passive Infrastructure Foundation) course enrollment',
      'Subsidized certification examinations and lab practicals',
      'Exclusive job referral program across our UAE partner network',
      'Continuous mentorship and technical skill assessment access',
    ],
    tiers: null,
  },
  {
    id: 'reseller',
    title: 'Reseller Partner',
    badge: 'Commercial & Distribution',
    icon: 'fa-store',
    color: 'purple',
    target: 'For trading companies, IT distributors, and procurement companies across the GCC.',
    benefits: [
      'Competitive trade pricing with healthy margin structures',
      'Comprehensive marketing and collateral co-branding support',
      'Official Authorized ADORN Reseller certification and listing',
      'Dedicated partner account management and stock priority',
    ],
    tiers: [
      { name: 'Authorized Reseller', desc: 'Standard trade discounts & product access' },
      { name: 'Preferred Reseller', desc: 'Volume rebate incentives & joint marketing' },
      { name: 'Elite Reseller', desc: 'Maximum margin tiers & dedicated inventory allocation' },
    ],
  },
  {
    id: 'system-integrator',
    title: 'System Integrator Partner',
    badge: 'Engineering & Integration',
    icon: 'fa-project-diagram',
    color: 'indigo',
    target: 'For companies that design, install, and commission structured cabling, ELV, and network infrastructure projects.',
    benefits: [
      'Preferential project pricing on full BOM requirements',
      'Technical pre-sales support (design review, BOQ assistance)',
      'Access to ADORN Certified Installer program and warranty backing',
      'Project registration for price protection against tender competition',
      'Co-marketing and project case study opportunities',
      'CPD (Continuing Professional Development) training credits',
    ],
    tiers: [
      { name: 'Authorized SI', desc: 'Project pricing & technical pre-sales support' },
      { name: 'Gold SI', desc: 'Price protection & Certified Installer warranty backing' },
      { name: 'Platinum SI', desc: 'Priority engineering, CPD credits & joint case studies' },
    ],
  },
];

export default function PartnerNetwork() {
  const [selectedProgram, setSelectedProgram] = useState('System Integrator Partner');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    notes: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    const text = `Hello ADORN Team, I would like to apply for the Partner Network.\n\n*Program:* ${selectedProgram}\n*Full Name:* ${formData.name}\n*Company/Institute:* ${formData.company || 'N/A'}\n*Email:* ${formData.email}\n*Phone/WhatsApp:* ${formData.phone}\n*Details:* ${formData.notes || 'Interested in joining the ADORN partner network'}`;
    window.open(`https://wa.me/971526387275?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="partner-network-page">
      <SEO
        title="PARTNER NETWORK — Partnership Programs"
        description="Grow Together. Build Together. Succeed Together. ADORN Partner Network programs for Students, Fresh Graduates, Resellers, and System Integrators."
        url="/partner-network"
      />

      {/* Hero */}
      <section className="pn-hero">
        <div className="container">
          <div className="pn-hero-content">
            <span className="pn-badge">
              <i className="fas fa-handshake"></i> Partnership Programs
            </span>
            <h1>
              PARTNER <span className="hl">NETWORK</span>
            </h1>
            <p className="pn-hero-headline">
              Grow Together. Build Together. Succeed Together.
            </p>
            <p className="pn-hero-lead">
              ADORN’s partner network connects technology students, emerging engineering graduates, regional distributors, and premier system integrators across the United Arab Emirates and GCC.
            </p>
            <div className="pn-hero-actions">
              <a href="#programs" className="hero-btn hero-btn-primary">
                <i className="fas fa-layer-group"></i> Explore Programs
              </a>
              <a href="#apply" className="hero-btn hero-btn-outline">
                <i className="fas fa-user-plus"></i> Apply to Join
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="container pn-body">
        {/* ══════════════════════════════════════════════
            1. PARTNERSHIP PROGRAMS
        ══════════════════════════════════════════════ */}
        <section id="programs" className="pn-section">
          <div className="pn-section-head">
            <span className="pn-sub-tag">Program Tracks</span>
            <h2>Partnership Programs</h2>
            <p>Designed to support technology talent at every stage &mdash; from academic study to high-value enterprise delivery.</p>
          </div>

          <div className="programs-grid">
            {PARTNERSHIP_PROGRAMS.map((prog) => (
              <div key={prog.id} className={`program-card prog-border-${prog.color}`}>
                <div className="prog-card-top">
                  <div className="prog-icon-wrap">
                    <i className={`fas ${prog.icon}`}></i>
                  </div>
                  <span className="prog-badge">{prog.badge}</span>
                </div>

                <h3>{prog.title}</h3>
                <p className="prog-target">{prog.target}</p>

                <div className="prog-benefits-wrap">
                  <h4><i className="fas fa-check-circle"></i> Program Benefits:</h4>
                  <ul className="prog-benefits-list">
                    {prog.benefits.map((b, bi) => (
                      <li key={bi}>{b}</li>
                    ))}
                  </ul>
                </div>

                {prog.tiers && (
                  <div className="prog-tiers-wrap">
                    <h4><i className="fas fa-layer-group"></i> Partner Tiers:</h4>
                    <div className="tiers-list">
                      {prog.tiers.map((t, ti) => (
                        <div key={ti} className="tier-item">
                          <span className="tier-name">{t.name}</span>
                          <span className="tier-desc">{t.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="prog-card-footer">
                  <a
                    href="#apply"
                    className="prog-apply-btn"
                    onClick={() => setSelectedProgram(prog.title)}
                  >
                    Apply as {prog.title} &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            2. APPLICATION SECTION
        ══════════════════════════════════════════════ */}
        <section id="apply" className="pn-apply-section">
          <div className="pn-apply-card">
            <div className="pn-apply-left">
              <span className="pn-sub-tag">Get Onboarded</span>
              <h2>Join the <span className="hl">ADORN Partner Network</span></h2>
              <p>
                Whether you are a university student launching your engineering career, an authorized distributor, or a certified system integrator building critical networks &mdash; we provide the commercial and technical support to help you scale.
              </p>

              <div className="pn-perks-list">
                <div className="pn-perk-item">
                  <i className="fas fa-shield-alt"></i>
                  <div>
                    <strong>Price Protection &amp; Deal Registration</strong>
                    <span>Lock in project discounts for registered enterprise opportunities.</span>
                  </div>
                </div>
                <div className="pn-perk-item">
                  <i className="fas fa-graduation-cap"></i>
                  <div>
                    <strong>Direct ADORN Academy Credits</strong>
                    <span>Upskill team members with recognized ACPIS &amp; ACSIS certifications.</span>
                  </div>
                </div>
                <div className="pn-perk-item">
                  <i className="fas fa-headset"></i>
                  <div>
                    <strong>Pre-Sales Engineering Support</strong>
                    <span>Direct engineering consultation on complex BOQs, fiber budgets, and SIRA submittals.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pn-apply-right">
              <form className="pn-form" onSubmit={handleApplySubmit}>
                <h3>Partner Application Form</h3>
                <p className="form-note">Your application is reviewed by our channel partnership team in Dubai.</p>

                <div className="form-group">
                  <label>Select Partnership Track</label>
                  <select
                    value={selectedProgram}
                    onChange={(e) => setSelectedProgram(e.target.value)}
                    required
                  >
                    <option value="Student Partner">Student Partner</option>
                    <option value="Fresh Graduate Partner">Fresh Graduate Partner</option>
                    <option value="Reseller Partner">Reseller Partner</option>
                    <option value="System Integrator Partner">System Integrator Partner</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g. Tariq Mansoor"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Company / University Name</label>
                  <input
                    type="text"
                    name="company"
                    placeholder="e.g. Alpha System Integration LLC"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>WhatsApp / Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+971 50 123 4567"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Project Scope or Requirements</label>
                  <textarea
                    name="notes"
                    rows="3"
                    placeholder="Tell us about your business, upcoming projects, or expected certification needs..."
                    value={formData.notes}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button type="submit" className="pn-submit-btn">
                  <i className="fab fa-whatsapp"></i> Submit Application via WhatsApp
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            3. PARTNER SUPPORT BANNER
        ══════════════════════════════════════════════ */}
        <div className="pn-cta-banner">
          <div className="pn-cta-content">
            <h3>Need Dedicated Pre-Sales Assistance for an Active Project?</h3>
            <p>
              Our regional technical team in Dubai assists System Integrators with tender review, product equivalents, Fluke test warranty documentation, and distributor fulfillment.
            </p>
          </div>
          <div className="pn-cta-actions">
            <a
              href="https://wa.me/971526387275?text=Hello%20ADORN%20Partnership%20Team%2C%20I%20have%20an%20active%20project%20inquiry"
              className="hero-btn hero-btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-whatsapp"></i> Direct WhatsApp Line
            </a>
            <Link to="/resources" className="hero-btn hero-btn-outline">
              <i className="fas fa-folder-open"></i> Resource Library
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

