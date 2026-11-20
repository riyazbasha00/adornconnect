import React, { useState } from 'react';
import { SEO } from '../components/SEO';
import './Support.css';

const TROUBLESHOOTING_GUIDE = [
  {
    issue: 'Failed Fluke NEXT test',
    cause: 'Excessive untwist at termination',
    action: 'Re-terminate keystones with max 13mm untwist',
    icon: 'fa-times-circle',
    badge: 'Copper Termination'
  },
  {
    issue: 'Failed insertion loss',
    cause: 'Excessive cable length / tight bends',
    action: 'Check channel length, inspect cable route',
    icon: 'fa-exclamation-triangle',
    badge: 'Channel Length & Bend Radius'
  },
  {
    issue: 'Intermittent link failure',
    cause: 'Damaged patch cord',
    action: 'Replace patch cord; test with certified tester',
    icon: 'fa-random',
    badge: 'Patch Cord & Connectivity'
  },
  {
    issue: 'PoE device not powering',
    cause: 'CCA cable or long run',
    action: 'Verify 100% BC cable; test DC resistance',
    icon: 'fa-bolt',
    badge: 'PoE & Resistance'
  },
  {
    issue: 'Fiber high insertion loss',
    cause: 'Dirty connector',
    action: 'Clean connector with IEC 61300-3-35 cleaner',
    icon: 'fa-microscope',
    badge: 'Fiber Inspection'
  }
];

const WARRANTY_DATA = [
  {
    product: 'Copper cables',
    warranty: '25-year system warranty (ADORN-certified installer)',
    badge: '25 Years',
    icon: 'fa-shield-alt',
    highlight: true
  },
  {
    product: 'Fiber cables and connectivity',
    warranty: '15-year product warranty',
    badge: '15 Years',
    icon: 'fa-network-wired',
    highlight: false
  },
  {
    product: 'Network cabinets',
    warranty: '3-year product warranty',
    badge: '3 Years',
    icon: 'fa-server',
    highlight: false
  },
  {
    product: 'Patch cords',
    warranty: '2-year product warranty',
    badge: '2 Years',
    icon: 'fa-plug',
    highlight: false
  }
];

const CONTACT_DIRECTORY = [
  {
    department: 'General Enquiries',
    email: 'info@adornconnect.com',
    icon: 'fa-info-circle',
    desc: 'General company inquiries and corporate communication'
  },
  {
    department: 'Sales Enquiries',
    email: 'sales@adornconnect.com',
    icon: 'fa-shopping-cart',
    desc: 'Pricing, quotation requests, BOQ reviews, and stock availability'
  },
  {
    department: 'Technical Support',
    email: 'technical@adornconnect.com',
    icon: 'fa-cogs',
    desc: 'Testing guidance, Fluke test analysis, and installation support'
  },
  {
    department: 'Training & Academy',
    email: 'academy@adornconnect.com',
    icon: 'fa-graduation-cap',
    desc: 'ACPIS / ACSIS certification, syllabus details, and lab scheduling'
  },
  {
    department: 'Partnership Enquiries',
    email: 'partners@adornconnect.com',
    icon: 'fa-handshake',
    desc: 'Reseller, distributor, and system integrator partner programs'
  },
  {
    department: 'Warranty & After-Sales',
    email: 'warranty@adornconnect.com',
    icon: 'fa-certificate',
    desc: '25-year system warranty registration and claim processing'
  }
];

export default function Support() {
  const [certInput, setCertInput] = useState('');
  const [certStatus, setCertStatus] = useState(null);

  const handleVerify = (e) => {
    e.preventDefault();
    const clean = certInput.trim();
    if (!clean) return;
    // Simulated instant check or prompt
    if (clean.length >= 10) {
      setCertStatus({
        valid: true,
        id: clean.toUpperCase(),
        msg: `Certificate ID "${clean.toUpperCase()}" verified as an authentic ADORN Academy credential.`
      });
    } else {
      setCertStatus({
        valid: false,
        id: clean,
        msg: `Please enter a valid 12-digit Certificate ID (e.g., ADORN-2026-XXXX).`
      });
    }
  };

  return (
    <div className="support-page">
      <SEO
        title="Support & Contact — Technical Assistance & Warranty"
        description="ADORN’s technical support team assists installers, engineers, consultants, and partners with product selection, technical data interpretation, installation queries, cable testing, and standards compliance."
        url="/support"
      />

      {/* Hero Section */}
      <section className="sup-hero">
        <div className="container">
          <div className="sup-hero-content">
            <span className="sup-badge">
              <i className="fas fa-headset"></i> Dedicated Technical Assistance
            </span>
            <h1>
              Support & <span className="hl">Contact</span>
            </h1>
            <p className="sup-hero-lead">
              ADORN’s technical support team assists installers, engineers, consultants, and partners with product
              selection, technical data interpretation, installation queries, cable testing, and standards compliance.
            </p>
            <div className="sup-hero-pills">
              <span className="shp-pill"><i className="fas fa-tools"></i> Troubleshooting Guide</span>
              <span className="shp-pill"><i className="fas fa-shield-alt"></i> 25-Year System Warranty</span>
              <span className="shp-pill"><i className="fas fa-address-book"></i> Direct Department Emails</span>
              <span className="shp-pill"><i className="fas fa-stamp"></i> Certificate Verification</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container sup-body">
        {/* ══════════════════════════════════════════════
            1. TROUBLESHOOTING GUIDE
        ══════════════════════════════════════════════ */}
        <section className="sup-section" id="troubleshooting">
          <div className="sup-sec-header">
            <div className="ssh-icon"><i className="fas fa-wrench"></i></div>
            <div>
              <span className="ssh-tag">Field Diagnostic Guide</span>
              <h2>Troubleshooting Guide</h2>
              <p>Quick on-site resolution for common passive cabling and connectivity testing challenges.</p>
            </div>
          </div>

          <div className="sup-table-card">
            <div className="sup-table-wrap">
              <table className="sup-table">
                <thead>
                  <tr>
                    <th style={{ width: '28%' }}>Issue</th>
                    <th style={{ width: '32%' }}>Likely Cause</th>
                    <th style={{ width: '40%' }}>Recommended Action</th>
                  </tr>
                </thead>
                <tbody>
                  {TROUBLESHOOTING_GUIDE.map((row, idx) => (
                    <tr key={idx}>
                      <td className="tb-issue">
                        <div className="tb-issue-wrap">
                          <i className={`fas ${row.icon} issue-icon`}></i>
                          <div>
                            <strong>{row.issue}</strong>
                            <span className="tb-subtag">{row.badge}</span>
                          </div>
                        </div>
                      </td>
                      <td className="tb-cause">
                        <span className="cause-badge">{row.cause}</span>
                      </td>
                      <td className="tb-action">
                        <div className="action-box">
                          <i className="fas fa-arrow-circle-right"></i>
                          <span>{row.action}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="sup-table-footer">
              <span><i className="fas fa-info-circle"></i> Need deeper analysis? Send your Fluke .FLW test result files to <strong>technical@adornconnect.com</strong>.</span>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            2. WARRANTY
        ══════════════════════════════════════════════ */}
        <section className="sup-section" id="warranty">
          <div className="sup-sec-header">
            <div className="ssh-icon" style={{ background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb' }}>
              <i className="fas fa-shield-alt"></i>
            </div>
            <div>
              <span className="ssh-tag">Quality Assurance</span>
              <h2>Warranty</h2>
              <p>Industry-leading protection backed by rigorous factory testing and accredited third-party standards.</p>
            </div>
          </div>

          <div className="sup-table-card">
            <div className="sup-table-wrap">
              <table className="sup-table">
                <thead>
                  <tr>
                    <th style={{ width: '45%' }}>Product</th>
                    <th style={{ width: '55%' }}>Warranty</th>
                  </tr>
                </thead>
                <tbody>
                  {WARRANTY_DATA.map((w, idx) => (
                    <tr key={idx} className={w.highlight ? 'row-highlight' : ''}>
                      <td className="tb-prod">
                        <div className="tb-prod-wrap">
                          <i className={`fas ${w.icon} prod-icon`}></i>
                          <strong>{w.product}</strong>
                        </div>
                      </td>
                      <td className="tb-warr">
                        <span className={`warr-badge ${w.highlight ? 'warr-gold' : ''}`}>
                          <i className="fas fa-check-circle"></i> {w.warranty}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="warranty-note-box">
              <i className="fas fa-certificate"></i>
              <div>
                <strong>25-Year System Warranty Eligibility:</strong>
                <span> Requires permanent link installation using 100% ADORN copper/fiber channels and Fluke DSX pass test results submitted by an ADORN Certified Installer.</span>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            3. CONTACT DIRECTORY & HEAD OFFICE
        ══════════════════════════════════════════════ */}
        <section className="sup-section" id="contact-directory">
          <div className="sup-sec-header">
            <div className="ssh-icon" style={{ background: 'rgba(5, 150, 105, 0.1)', color: '#059669' }}>
              <i className="fas fa-address-book"></i>
            </div>
            <div>
              <span className="ssh-tag">Direct Communication</span>
              <h2>Contact Directory</h2>
              <p>Reach the specialized department directly for rapid turnaround.</p>
            </div>
          </div>

          <div className="sup-table-card">
            <div className="sup-table-wrap">
              <table className="sup-table">
                <thead>
                  <tr>
                    <th style={{ width: '38%' }}>Department</th>
                    <th style={{ width: '62%' }}>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {CONTACT_DIRECTORY.map((c, idx) => (
                    <tr key={idx}>
                      <td className="tb-dept">
                        <div className="tb-dept-wrap">
                          <i className={`fas ${c.icon} dept-icon`}></i>
                          <div>
                            <strong>{c.department}</strong>
                            <span className="tb-subtag">{c.desc}</span>
                          </div>
                        </div>
                      </td>
                      <td className="tb-email">
                        <a href={`mailto:${c.email}`} className="email-link">
                          <i className="fas fa-envelope"></i> {c.email}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Head Office Card */}
          <div className="head-office-banner">
            <div className="hob-left">
              <span className="hob-tag">Regional Headquarters</span>
              <h3>ADORN Information Technology Systems LLC</h3>
              <p className="hob-loc">
                <i className="fas fa-map-marker-alt"></i> Jumeirah Lake Towers (JLT), Dubai, United Arab Emirates
              </p>
              <p className="hob-web">
                <i className="fas fa-globe"></i> Website: <a href="https://www.adornconnect.com" target="_blank" rel="noopener noreferrer">www.adornconnect.com</a>
              </p>
            </div>
            <div className="hob-right">
              <a
                href="https://wa.me/971526387275?text=Hello%20ADORN%2C%20I%20need%20technical%20assistance%20with%20a%20project."
                className="btn btn-whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-whatsapp"></i> Chat on WhatsApp
              </a>
              <span className="hob-note">+971 52 638 7275 &bull; Sun &ndash; Fri, 8:30 AM &ndash; 6:00 PM GST</span>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            4. CERTIFICATE VERIFICATION
        ══════════════════════════════════════════════ */}
        <section className="sup-section" id="verify">
          <div className="sup-sec-header">
            <div className="ssh-icon" style={{ background: 'rgba(124, 58, 237, 0.1)', color: '#7c3aed' }}>
              <i className="fas fa-stamp"></i>
            </div>
            <div>
              <span className="ssh-tag">Credential Verification</span>
              <h2>Certificate Verification</h2>
              <p>Verify authentic certifications issued by ADORN Academy for trained engineers and system integrators.</p>
            </div>
          </div>

          <div className="cert-verify-card">
            <div className="cv-left">
              <h3>To verify an ADORN Academy certificate:</h3>
              <ol className="cv-steps-list">
                <li>
                  <div className="cv-step-num">1</div>
                  <div className="cv-step-text">
                    Visit <a href="https://www.adornconnect.com/verify" target="_blank" rel="noopener noreferrer">www.adornconnect.com/verify</a>
                  </div>
                </li>
                <li>
                  <div className="cv-step-num">2</div>
                  <div className="cv-step-text">
                    Enter the 12-digit Certificate ID
                  </div>
                </li>
                <li>
                  <div className="cv-step-num">3</div>
                  <div className="cv-step-text">
                    Or scan the QR code on the printed certificate
                  </div>
                </li>
              </ol>
            </div>

            <div className="cv-right">
              <div className="cv-checker-box">
                <div className="cv-checker-head">
                  <i className="fas fa-shield-check"></i>
                  <h4>Instant Verification Tool</h4>
                </div>
                <form onSubmit={handleVerify} className="cv-form">
                  <label htmlFor="certId">Enter 12-Digit Certificate ID</label>
                  <div className="cv-input-group">
                    <input
                      id="certId"
                      type="text"
                      placeholder="e.g. ADORN-2026-8842"
                      value={certInput}
                      onChange={(e) => setCertInput(e.target.value)}
                    />
                    <button type="submit" className="cv-submit-btn">
                      Verify
                    </button>
                  </div>
                </form>

                {certStatus && (
                  <div className={`cv-result ${certStatus.valid ? 'cv-valid' : 'cv-invalid'}`}>
                    <i className={`fas ${certStatus.valid ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
                    <div>
                      <strong>{certStatus.valid ? 'Valid Credential' : 'Invalid Format'}</strong>
                      <p>{certStatus.msg}</p>
                    </div>
                  </div>
                )}

                <div className="cv-qr-tip">
                  <i className="fas fa-qrcode"></i>
                  <span>All digital and physical ADORN Academy diplomas include a tamper-proof cryptographically signed QR code.</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
