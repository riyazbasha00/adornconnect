import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import './Insights.css';

const JUMP_LINKS = [
  { id: 'copper', label: 'Copper Cabling', icon: 'fa-network-wired' },
  { id: 'fiber', label: 'Fiber Optics', icon: 'fa-bolt' },
  { id: 'poe', label: 'PoE Standards', icon: 'fa-charging-station' },
  { id: 'testing', label: 'Cable Testing', icon: 'fa-vial' },
  { id: 'uae-standards', label: 'UAE Standards', icon: 'fa-certificate' },
];

const FIBER_TYPES = [
  { type: 'OM3', useCase: 'Enterprise backbone', dist: '300m', badge: 'tag-aqua' },
  { type: 'OM4', useCase: 'High-performance data centre', dist: '400m', badge: 'tag-violet' },
  { type: 'OM5', useCase: 'Data centre with WDM (100G+)', dist: '440m', badge: 'tag-lime' },
  { type: 'OS1', useCase: 'Indoor single-mode', dist: '10km', badge: 'tag-yellow' },
  { type: 'OS2', useCase: 'Outdoor/campus long-distance', dist: '40km+', badge: 'tag-yellow' },
];

const POE_STANDARDS = [
  { standard: 'IEEE 802.3af', year: '2003', power: '15.4W', apps: 'IP phones, basic cameras', classPower: 'power-low' },
  { standard: 'IEEE 802.3at (PoE+)', year: '2009', power: '30W', apps: 'PTZ cameras, APs', classPower: 'power-med' },
  { standard: 'IEEE 802.3bt Type 3', year: '2018', power: '60W', apps: 'Video conferencing, smart TVs', classPower: 'power-high' },
  { standard: 'IEEE 802.3bt Type 4', year: '2018', power: '90W', apps: 'PoE lighting, thin clients', classPower: 'power-max' },
];

const TESTING_PARAMS = [
  { param: 'Insertion Loss (IL)', measure: 'Signal attenuation through the channel', icon: 'fa-wave-square' },
  { param: 'NEXT', measure: 'Near-End Crosstalk', icon: 'fa-exchange-alt' },
  { param: 'PS-NEXT', measure: 'Power Sum NEXT', icon: 'fa-signal' },
  { param: 'FEXT', measure: 'Far-End Crosstalk', icon: 'fa-random' },
  { param: 'Return Loss (RL)', measure: 'Signal reflection due to impedance discontinuity', icon: 'fa-undo' },
  { param: 'Propagation Delay', measure: 'Time for signal to travel through the channel', icon: 'fa-stopwatch' },
  { param: 'Delay Skew', measure: 'Difference in propagation delay between pairs', icon: 'fa-arrows-alt-h' },
];

const UAE_STANDARDS = [
  { standard: 'ANSI/TIA-568.2-D', scope: 'Copper balanced twisted-pair cabling', category: 'TIA' },
  { standard: 'ANSI/TIA-568.3-D', scope: 'Optical fiber cabling', category: 'TIA' },
  { standard: 'ANSI/TIA-569-E', scope: 'Telecommunications pathways and spaces', category: 'TIA' },
  { standard: 'ANSI/TIA-606-C', scope: 'Administration standard — labeling and documentation', category: 'TIA' },
  { standard: 'ANSI/TIA-607-C', scope: 'Bonding and grounding', category: 'TIA' },
  { standard: 'ANSI/TIA-942-B', scope: 'Data centre telecommunications infrastructure', category: 'TIA' },
  { standard: 'ISO/IEC 11801 Ed.3', scope: 'Generic cabling for customer premises', category: 'ISO' },
  { standard: 'EN 50173', scope: 'European cabling standard', category: 'EN' },
  { standard: 'Dubai Municipality', scope: 'Building & MEP cabling requirements', category: 'UAE' },
  { standard: 'TDRA', scope: 'UAE telecommunications infrastructure regulations', category: 'UAE' },
  { standard: 'SIRA', scope: 'ELV & security system compliance, Dubai', category: 'UAE' },
  { standard: 'UAE Civil Defense', scope: 'LSZH fire-rated cabling requirements', category: 'UAE' },
  { standard: 'Estidama Pearl', scope: 'Sustainable infrastructure, Abu Dhabi', category: 'UAE' },
];

export default function Insights() {
  const [activeTab, setActiveTab] = useState('copper');

  const scrollToSection = (id) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="insights-page">
      <SEO
        title="ADORN Insights — Engineering Knowledge & Standards Guide"
        description="Technical knowledge, cable testing parameters, PoE standards, copper vs fiber comparisons, and UAE regulatory compliance reference."
        url="/insights"
      />

      {/* Hero */}
      <section className="ins-hero">
        <div className="container">
          <div className="ins-hero-content">
            <span className="ins-badge">
              <i className="fas fa-lightbulb"></i> Engineering Knowledge &amp; Guidance
            </span>
            <h1>
              ADORN <span className="hl">INSIGHTS</span>
            </h1>
            <p className="ins-hero-lead">
              Practical technical knowledge, cable standards, engineering comparisons, and UAE regulatory benchmarks for networking, ELV, and infrastructure professionals.
            </p>
            <div className="ins-hero-tags">
              <span className="i-tag"><i className="fas fa-check-circle"></i> 100% Bare Copper Guidance</span>
              <span className="i-tag"><i className="fas fa-check-circle"></i> TIA / ISO Benchmarks</span>
              <span className="i-tag"><i className="fas fa-check-circle"></i> SIRA &amp; TDRA Regulations</span>
              <span className="i-tag"><i className="fas fa-check-circle"></i> IEEE 802.3bt PoE Reference</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Navigation Bar */}
      <div className="ins-nav-bar">
        <div className="container ins-nav-inner">
          {JUMP_LINKS.map((item) => (
            <button
              key={item.id}
              className={`ins-nav-btn ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => scrollToSection(item.id)}
            >
              <i className={`fas ${item.icon}`}></i>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="container ins-body">
        {/* ══════════════════════════════════════════════
            1. COPPER CABLING
        ══════════════════════════════════════════════ */}
        <section id="copper" className="ins-section">
          <div className="ins-section-header">
            <div className="ins-sec-icon"><i className="fas fa-network-wired"></i></div>
            <div>
              <span className="sec-tag">Structured Cabling Principles</span>
              <h2>Copper Cabling</h2>
              <p>Essential design guidelines, metallurgy standards, and shielding architectures.</p>
            </div>
          </div>

          {/* CCA vs Bare Copper */}
          <div className="ins-card ins-card-warning mb-28">
            <div className="ins-card-title-row">
              <div className="ins-card-icon-badge icon-alert"><i className="fas fa-exclamation-triangle"></i></div>
              <div>
                <h3>CCA vs Bare Copper &mdash; Why It Matters</h3>
                <span className="ins-sub-pill">Metallurgy &amp; Safety Compliance</span>
              </div>
            </div>
            <div className="ins-card-content">
              <p className="ins-lead-text">
                <strong>CCA (Copper Clad Aluminium)</strong> cable uses a thin copper coating over an aluminium core. CCA has <strong>higher electrical resistance</strong>, <strong>reduced tensile strength</strong>, <strong>lower PoE performance</strong>, and <strong>cannot reliably pass TIA-568 channel certification tests</strong>.
              </p>
              <div className="ins-callout-box">
                <i className="fas fa-shield-alt"></i>
                <div>
                  <strong>Mandatory UAE Specification:</strong>
                  <span>For any professional UAE installation &mdash; where PoE is widespread and project warranties are required &mdash; <strong>only 100% bare copper cable should be specified</strong>.</span>
                </div>
              </div>
            </div>
          </div>

          {/* UTP vs FTP vs STP */}
          <div className="ins-card mb-28">
            <div className="ins-card-title-row">
              <div className="ins-card-icon-badge"><i className="fas fa-shield-virus"></i></div>
              <div>
                <h3>UTP vs FTP vs STP</h3>
                <span className="ins-sub-pill">Shielding Architecture &amp; Noise Immunity</span>
              </div>
            </div>
            <div className="shielding-grid">
              <div className="shield-item">
                <div className="shield-tag utp-tag">UTP</div>
                <h4>Unshielded Twisted Pair</h4>
                <p><strong>No shielding.</strong> Suitable for most standard enterprise environments with minimal electromagnetic interference.</p>
              </div>
              <div className="shield-item">
                <div className="shield-tag ftp-tag">FTP (F/UTP)</div>
                <h4>Foiled Twisted Pair</h4>
                <p><strong>Overall foil shield.</strong> Recommended for environments near electrical equipment, fluorescent lighting, or motor drives.</p>
              </div>
              <div className="shield-item">
                <div className="shield-tag stp-tag">STP (S/FTP)</div>
                <h4>Shielded / Foiled Twisted Pair</h4>
                <p><strong>Individual pair foil + overall braid.</strong> Mandatory for CAT7, typical for high-EMI industrial environments.</p>
              </div>
            </div>
            <div className="uae-rec-banner">
              <i className="fas fa-info-circle"></i>
              <p>
                <strong>UAE Recommendation:</strong> UTP for standard offices. FTP or STP in plant rooms, production facilities, and healthcare facilities near MRI equipment.
              </p>
            </div>
          </div>

          {/* Solid vs Stranded Conductors */}
          <div className="ins-card mb-28">
            <div className="ins-card-title-row">
              <div className="ins-card-icon-badge"><i className="fas fa-code-branch"></i></div>
              <div>
                <h3>Solid vs Stranded Conductors</h3>
                <span className="ins-sub-pill">Conductor Construction &amp; Use-Cases</span>
              </div>
            </div>
            <div className="solid-stranded-grid">
              <div className="ss-item">
                <div className="ss-head">
                  <i className="fas fa-minus"></i>
                  <h4>Solid Conductors</h4>
                </div>
                <p>Single-core, lower electrical resistance, superior attenuation, and better high-frequency performance.</p>
                <div className="ss-badge ss-req">Required for permanent (horizontal) cabling runs</div>
              </div>
              <div className="ss-item">
                <div className="ss-head">
                  <i className="fas fa-bars"></i>
                  <h4>Stranded Conductors</h4>
                </div>
                <p>Multi-strand twisted conductors providing high mechanical flexibility and bend endurance.</p>
                <div className="ss-badge ss-flex">Used in patch cords &amp; workstation leads</div>
              </div>
            </div>
            <div className="golden-rule-box">
              <i className="fas fa-check-circle"></i>
              <div>
                <strong>Key Engineering Rule:</strong>
                <p>Never use stranded cable for permanent runs. Never use solid cable for patch cords.</p>
              </div>
            </div>
          </div>

          {/* AWG Explained */}
          <div className="ins-card">
            <div className="ins-card-title-row">
              <div className="ins-card-icon-badge"><i className="fas fa-ruler-combined"></i></div>
              <div>
                <h3>AWG Explained (American Wire Gauge)</h3>
                <span className="ins-sub-pill">Conductor Gauge &amp; Gauge Thickness</span>
              </div>
            </div>
            <p className="ins-lead-text">
              In the American Wire Gauge (AWG) system, a <strong>lower gauge number indicates a thicker copper conductor</strong> with lower resistance, lower heat buildup under PoE loads, and superior signal headroom.
            </p>
            <div className="awg-cards-grid">
              <div className="awg-card">
                <span className="awg-num">24 AWG</span>
                <strong>CAT5e &amp; CAT6</strong>
                <p>Standard enterprise horizontal cabling for Gigabit networks.</p>
              </div>
              <div className="awg-card awg-highlight">
                <span className="awg-num">23 AWG</span>
                <strong>CAT6 &amp; CAT6A</strong>
                <p>Thicker conductor supporting 10GBASE-T and high-power PoE (up to 90W).</p>
              </div>
              <div className="awg-card">
                <span className="awg-num">22 AWG</span>
                <strong>CAT8</strong>
                <p>Heavy-gauge copper engineered for data centre short-reach 25G/40G switching.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            2. FIBER OPTICS
        ══════════════════════════════════════════════ */}
        <section id="fiber" className="ins-section">
          <div className="ins-section-header">
            <div className="ins-sec-icon"><i className="fas fa-bolt"></i></div>
            <div>
              <span className="sec-tag">Optical Transmission</span>
              <h2>Fiber Optics</h2>
              <p>Single-mode vs. multimode selection, attenuation profiles, and transmission reach.</p>
            </div>
          </div>

          {/* Single-Mode vs Multi-Mode */}
          <div className="ins-card mb-28">
            <div className="ins-card-title-row">
              <div className="ins-card-icon-badge"><i className="fas fa-arrows-alt-h"></i></div>
              <div>
                <h3>Single-Mode vs Multi-Mode</h3>
                <span className="ins-sub-pill">Core Geometry &amp; Light Source Comparison</span>
              </div>
            </div>
            <div className="fiber-compare-grid">
              <div className="fc-item fc-sm">
                <div className="fc-tag sm-badge">Single-Mode (OS2)</div>
                <h4>9/125 &micro;m Core</h4>
                <ul className="fc-list">
                  <li><strong>Light Source:</strong> Laser light (1310 / 1550 nm)</li>
                  <li><strong>Attenuation:</strong> Extremely low attenuation (0.4 dB/km outdoor)</li>
                  <li><strong>Range:</strong> Kilometres of range (up to 40km+)</li>
                  <li><strong>Use Case:</strong> Campus backbones, outdoor pathways, telecom metro links</li>
                </ul>
              </div>
              <div className="fc-item fc-mm">
                <div className="fc-tag mm-badge">Multimode (OM3 / OM4 / OM5)</div>
                <h4>50/125 &micro;m Core</h4>
                <ul className="fc-list">
                  <li><strong>Light Source:</strong> VCSEL light (850 nm)</li>
                  <li><strong>Transceivers:</strong> Cost-effective optical transceivers</li>
                  <li><strong>Range:</strong> High-bandwidth reach up to 300 &ndash; 400m</li>
                  <li><strong>Use Case:</strong> Intra-building riser backbone and data centre spine-leaf</li>
                </ul>
              </div>
            </div>
            <div className="uae-rec-banner">
              <i className="fas fa-info-circle"></i>
              <p>
                <strong>UAE Recommendation:</strong> OS2 for campus backbones and runs over 300m. OM4 minimum for new data centre installations.
              </p>
            </div>
          </div>

          {/* Fiber Types Overview Table */}
          <div className="ins-table-card">
            <div className="ins-table-head">
              <h3><i className="fas fa-table"></i> Fiber Types Overview</h3>
              <p>Standard classifications, primary use-cases, and 10G/100G maximum channel reach</p>
            </div>
            <div className="ins-table-wrap">
              <table className="ins-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Use Case</th>
                    <th>Max Distance (10G)</th>
                  </tr>
                </thead>
                <tbody>
                  {FIBER_TYPES.map((f, i) => (
                    <tr key={i}>
                      <td><span className={`f-pill ${f.badge}`}>{f.type}</span></td>
                      <td><strong>{f.useCase}</strong></td>
                      <td><span className="dist-badge">{f.dist}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            3. POE STANDARDS
        ══════════════════════════════════════════════ */}
        <section id="poe" className="ins-section">
          <div className="ins-section-header">
            <div className="ins-sec-icon"><i className="fas fa-charging-station"></i></div>
            <div>
              <span className="sec-tag">Power Delivery Over Twisted Pair</span>
              <h2>PoE Standards</h2>
              <p>Evolution of IEEE Power over Ethernet from 15.4W to high-power 90W Type 4.</p>
            </div>
          </div>

          <div className="ins-table-card mb-24">
            <div className="ins-table-head">
              <h3><i className="fas fa-plug"></i> IEEE PoE Standards Matrix</h3>
              <p>Standard ratified year, maximum power delivery at PSE, and typical endpoint devices</p>
            </div>
            <div className="ins-table-wrap">
              <table className="ins-table">
                <thead>
                  <tr>
                    <th>Standard</th>
                    <th>Year</th>
                    <th>Max Power</th>
                    <th>Key Applications</th>
                  </tr>
                </thead>
                <tbody>
                  {POE_STANDARDS.map((p, i) => (
                    <tr key={i}>
                      <td><strong>{p.standard}</strong></td>
                      <td><span className="year-pill">{p.year}</span></td>
                      <td><span className={`p-badge ${p.classPower}`}>{p.power}</span></td>
                      <td>{p.apps}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="ins-callout-box box-highlight">
            <i className="fas fa-fire-extinguisher"></i>
            <div>
              <strong>Important Infrastructure Rule:</strong>
              <p><strong>CAT6A LSZH</strong> is recommended for <strong>IEEE 802.3bt Type 4 (90W)</strong> applications to mitigate bundle heat buildup and preserve transmission performance.</p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            4. CABLE TESTING PARAMETERS
        ══════════════════════════════════════════════ */}
        <section id="testing" className="ins-section">
          <div className="ins-section-header">
            <div className="ins-sec-icon"><i className="fas fa-vial"></i></div>
            <div>
              <span className="sec-tag">Certification &amp; Field Verification</span>
              <h2>Cable Testing Parameters</h2>
              <p>Key RF parameters measured during Fluke DSX and certifier warranty testing.</p>
            </div>
          </div>

          <div className="ins-table-card">
            <div className="ins-table-head">
              <h3><i className="fas fa-microscope"></i> Test Parameters &amp; Physical Measurements</h3>
              <p>Definitions of critical field-testing metrics per TIA-568 and ISO/IEC 11801</p>
            </div>
            <div className="ins-table-wrap">
              <table className="ins-table">
                <thead>
                  <tr>
                    <th style={{ width: '40%' }}>Test Parameter</th>
                    <th style={{ width: '60%' }}>What It Measures</th>
                  </tr>
                </thead>
                <tbody>
                  {TESTING_PARAMS.map((item, i) => (
                    <tr key={i}>
                      <td>
                        <div className="param-cell">
                          <i className={`fas ${item.icon} param-icon`}></i>
                          <strong>{item.param}</strong>
                        </div>
                      </td>
                      <td>{item.measure}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            5. UAE STANDARDS REFERENCE
        ══════════════════════════════════════════════ */}
        <section id="uae-standards" className="ins-section">
          <div className="ins-section-header">
            <div className="ins-sec-icon"><i className="fas fa-certificate"></i></div>
            <div>
              <span className="sec-tag">Regulatory &amp; Engineering Codes</span>
              <h2>UAE Standards Reference</h2>
              <p>Global standards and mandatory UAE authority compliance requirements.</p>
            </div>
          </div>

          <div className="ins-table-card">
            <div className="ins-table-head">
              <h3><i className="fas fa-landmark"></i> Standards &amp; Mandatory Mandates</h3>
              <p>International cabling codes and local regulatory authority scopes</p>
            </div>
            <div className="ins-table-wrap">
              <table className="ins-table">
                <thead>
                  <tr>
                    <th style={{ width: '38%' }}>Standard</th>
                    <th style={{ width: '62%' }}>Scope</th>
                  </tr>
                </thead>
                <tbody>
                  {UAE_STANDARDS.map((s, i) => (
                    <tr key={i} className={s.category === 'UAE' ? 'tr-uae-highlight' : ''}>
                      <td>
                        <div className="std-cell">
                          <span className={`std-tag tag-${s.category.toLowerCase()}`}>{s.category}</span>
                          <strong>{s.standard}</strong>
                        </div>
                      </td>
                      <td>{s.scope}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="ins-cta-banner">
          <div className="ins-cta-content">
            <h3>Need Technical Support or Tender Submittal Verification?</h3>
            <p>Our engineering team in Dubai helps contractors, system integrators, and consultants review BOQs, calculate optical budgets, and ensure 100% compliance with UAE standards.</p>
          </div>
          <div className="ins-cta-actions">
            <a href="https://wa.me/971526387275?text=Hello%20ADORN%2C%20I%20have%20a%20technical%20query%20regarding%20infrastructure%20standards" className="hero-btn hero-btn-primary" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i> Chat on WhatsApp
            </a>
            <Link to="/academy" className="hero-btn hero-btn-outline">
              <i className="fas fa-graduation-cap"></i> ADORN Academy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

