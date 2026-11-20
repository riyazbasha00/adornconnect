import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import './Portfolio.css';

const SECTIONS = [
  { id: 'copper', label: 'Copper Networking', icon: 'fa-network-wired', badge: 'CAT5e – CAT8' },
  { id: 'fiber', label: 'Fiber Optic', icon: 'fa-bolt', badge: 'Single & Multimode' },
  { id: 'cabinets', label: 'Network Cabinets', icon: 'fa-server', badge: 'Wall & Floor' },
  { id: 'connectivity', label: 'Connectivity', icon: 'fa-plug', badge: 'Panels & Outlets' },
  { id: 'elv', label: 'ELV Systems', icon: 'fa-shield-alt', badge: 'CCTV & Access' },
];

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('copper');

  const scrollToSection = (id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="portfolio-page">
      <SEO
        title="Product Portfolio & Technical Specifications"
        description="ADORN structured cabling, copper networking (CAT5e-CAT8), fiber optic, network cabinets, patch panels, connectivity and ELV infrastructure specifications."
        url="/portfolio"
      />

      {/* Hero */}
      <section className="port-hero">
        <div className="container">
          <div className="port-hero-content">
            <span className="port-badge">
              <i className="fas fa-layer-group"></i> Complete Infrastructure Portfolio
            </span>
            <h1>
              Engineering <span className="hl">Portfolio</span> &amp; Specifications
            </h1>
            <p className="port-hero-lead">
              Delivering high-performance structured cabling, optical connectivity, network cabinets, and ELV infrastructure engineered for reliability, certified for compliance, and built for the region.
            </p>
            <div className="port-hero-tags">
              <span className="p-tag"><i className="fas fa-check-circle"></i> 100% Bare Copper</span>
              <span className="p-tag"><i className="fas fa-check-circle"></i> ANSI/TIA-568.2-D Compliant</span>
              <span className="p-tag"><i className="fas fa-check-circle"></i> ISO/IEC 11801 Class EA/I/II</span>
              <span className="p-tag"><i className="fas fa-check-circle"></i> SIRA &amp; TDRA Certified</span>
              <span className="p-tag"><i className="fas fa-check-circle"></i> IEEE 802.3bt (90W PoE)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Category Jump Bar */}
      <div className="port-nav-bar">
        <div className="container port-nav-inner">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              className={`port-nav-btn ${activeSection === s.id ? 'active' : ''}`}
              onClick={() => scrollToSection(s.id)}
            >
              <i className={`fas ${s.icon}`}></i>
              <span className="pnav-label">{s.label}</span>
              <span className="pnav-badge">{s.badge}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="container port-body">
        {/* ══════════════════════════════════════════════
            1. COPPER NETWORKING
        ══════════════════════════════════════════════ */}
        <section id="copper" className="port-section">
          <div className="sec-header">
            <div className="sec-header-icon"><i className="fas fa-network-wired"></i></div>
            <div>
              <span className="sec-badge">Structured Cabling</span>
              <h2>Copper Networking</h2>
              <p className="sec-lead">
                ADORN’s copper networking portfolio covers CAT5e through CAT8, all manufactured with <strong>100% bare copper conductors</strong>, complying with TIA-568.2-D and ISO/IEC 11801.
              </p>
            </div>
          </div>

          <div className="cables-grid">
            {/* CAT5e */}
            <div className="cable-card">
              <div className="cable-card-head">
                <div className="cable-title-wrap">
                  <span className="cable-pill pill-gray">Category 5 Enhanced</span>
                  <h3>CAT5e</h3>
                </div>
                <div className="cable-bw-badge">100 MHz</div>
              </div>
              <p className="cable-desc">
                Entry-level structured cabling for standard enterprise networking. Supports 100 MHz bandwidth and Gigabit Ethernet (1 Gbps) up to 100m.
              </p>

              <div className="spec-table-wrap">
                <table className="spec-table">
                  <thead>
                    <tr><th>Specification</th><th>Detail</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Bandwidth</td><td><strong>100 MHz</strong></td></tr>
                    <tr><td>Max Data Rate</td><td>1000BASE-T (1 Gbps)</td></tr>
                    <tr><td>Channel Length</td><td>100m</td></tr>
                    <tr><td>Conductor</td><td>24 AWG, 100% Bare Copper</td></tr>
                    <tr><td>Construction</td><td>UTP / FTP</td></tr>
                    <tr><td>Jacket</td><td>PVC / LSZH</td></tr>
                    <tr><td>PoE Support</td><td>IEEE 802.3af (15.4W), 802.3at (30W)</td></tr>
                    <tr><td>Standards</td><td>TIA-568.2-D, ISO/IEC 11801, EN 50173</td></tr>
                    <tr><td>Reel</td><td>305m / 500m / 1000m</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="cable-meta-block">
                <div className="meta-row">
                  <strong><i className="fas fa-check-circle"></i> Applications:</strong>
                  <span>General enterprise LAN, SOHO networks, PoE devices (IP phones, APs), standard office structured cabling, BMS connectivity</span>
                </div>
                <div className="meta-row">
                  <strong><i className="fas fa-layer-group"></i> Variants:</strong>
                  <div className="variant-chips">
                    <span className="v-chip">UTP PVC</span>
                    <span className="v-chip">UTP LSZH</span>
                    <span className="v-chip">FTP LSZH</span>
                    <span className="v-chip">External/Outdoor</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CAT6 */}
            <div className="cable-card">
              <div className="cable-card-head">
                <div className="cable-title-wrap">
                  <span className="cable-pill pill-blue">Category 6</span>
                  <h3>CAT6</h3>
                </div>
                <div className="cable-bw-badge">250 MHz</div>
              </div>
              <p className="cable-desc">
                250 MHz bandwidth with improved NEXT performance. Supports 10GBASE-T up to 55m and 1GBASE-T up to 100m.
              </p>

              <div className="spec-table-wrap">
                <table className="spec-table">
                  <thead>
                    <tr><th>Specification</th><th>Detail</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Bandwidth</td><td><strong>250 MHz</strong></td></tr>
                    <tr><td>Max Data Rate</td><td>10GBASE-T (55m); 1GBASE-T (100m)</td></tr>
                    <tr><td>Conductor</td><td>23 AWG, 100% Bare Copper</td></tr>
                    <tr><td>Construction</td><td>UTP with internal spline / FTP</td></tr>
                    <tr><td>PoE Support</td><td>IEEE 802.3at (30W), 802.3bt (60/90W)</td></tr>
                    <tr><td>Standards</td><td>TIA-568.2-D, ISO/IEC 11801 Class E</td></tr>
                    <tr><td>Reel</td><td>305m / 500m / 1000m</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="cable-meta-block">
                <div className="meta-row">
                  <strong><i className="fas fa-check-circle"></i> Applications:</strong>
                  <span>Enterprise LAN (primary recommendation for standard projects), PoE+ devices, AV installations, education and hospitality networks</span>
                </div>
                <div className="meta-row">
                  <strong><i className="fas fa-layer-group"></i> Variants:</strong>
                  <div className="variant-chips">
                    <span className="v-chip">UTP PVC</span>
                    <span className="v-chip">UTP LSZH</span>
                    <span className="v-chip">FTP LSZH</span>
                    <span className="v-chip">External Outdoor</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CAT6A — RECOMMENDED STANDARD */}
            <div className="cable-card cable-card-featured">
              <div className="featured-ribbon">
                <i className="fas fa-star"></i> RECOMMENDED MINIMUM STANDARD
              </div>
              <div className="cable-card-head">
                <div className="cable-title-wrap">
                  <span className="cable-pill pill-purple">Category 6A (Augmented)</span>
                  <h3>CAT6A</h3>
                </div>
                <div className="cable-bw-badge">500 MHz</div>
              </div>
              <p className="cable-desc">
                The recommended minimum for all new structured cabling installations per ANSI/TIA-568.2-D and ISO/IEC 11801 Class EA. Supports 500 MHz bandwidth and 10GBASE-T over the full 100m channel.
              </p>

              <div className="spec-table-wrap">
                <table className="spec-table">
                  <thead>
                    <tr><th>Specification</th><th>Detail</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Bandwidth</td><td><strong>500 MHz</strong></td></tr>
                    <tr><td>Max Data Rate</td><td><strong>10GBASE-T (10 Gbps) over 100m</strong></td></tr>
                    <tr><td>Conductor</td><td>23 AWG, 100% Bare Copper</td></tr>
                    <tr><td>Construction</td><td>U/UTP or F/UTP (AXT mitigated)</td></tr>
                    <tr><td>Alien Crosstalk</td><td>Compliant with TIA-568.2-D AXT requirements</td></tr>
                    <tr><td>Jacket</td><td>LSZH (standard)</td></tr>
                    <tr><td>PoE Support</td><td>IEEE 802.3bt Type 4 (90W)</td></tr>
                    <tr><td>Standards</td><td>TIA-568.2-D, ISO/IEC 11801 Class EA, EN 50173-1</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="cable-meta-block">
                <div className="meta-row meta-highlight">
                  <strong><i className="fas fa-clipboard-check"></i> When to specify CAT6A:</strong>
                  <ul className="specify-list">
                    <li>All new enterprise structured cabling projects</li>
                    <li>Data centre horizontal cabling to ToR switches</li>
                    <li>Healthcare (10G to workstation)</li>
                    <li>High-density PoE (IEEE 802.3bt Type 3 &amp; 4)</li>
                    <li>Smart building infrastructure (PoE lighting, cameras, APs)</li>
                  </ul>
                </div>
                <div className="meta-row">
                  <strong><i className="fas fa-layer-group"></i> Variants:</strong>
                  <div className="variant-chips">
                    <span className="v-chip v-highlight">U/UTP LSZH</span>
                    <span className="v-chip v-highlight">F/UTP LSZH</span>
                    <span className="v-chip v-highlight">S/FTP LSZH (high EMI)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CAT7 */}
            <div className="cable-card">
              <div className="cable-card-head">
                <div className="cable-title-wrap">
                  <span className="cable-pill pill-indigo">Category 7</span>
                  <h3>CAT7</h3>
                </div>
                <div className="cable-bw-badge">600 MHz</div>
              </div>
              <p className="cable-desc">
                ISO/IEC 11801 Class F. Fully shielded (S/FTP) at 600 MHz. Provides exceptional EMI immunity for industrial and high-interference environments.
              </p>

              <div className="spec-table-wrap">
                <table className="spec-table">
                  <thead>
                    <tr><th>Specification</th><th>Detail</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Bandwidth</td><td><strong>600 MHz</strong></td></tr>
                    <tr><td>Max Data Rate</td><td>10GBASE-T over 100m</td></tr>
                    <tr><td>Construction</td><td>S/FTP (individual pair foil + overall braid)</td></tr>
                    <tr><td>Standards</td><td>ISO/IEC 11801 Class F, EN 50173</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="cable-meta-block">
                <div className="meta-row">
                  <strong><i className="fas fa-check-circle"></i> Applications:</strong>
                  <span>Industrial/manufacturing environments, broadcast/media facilities, healthcare near MRI equipment</span>
                </div>
              </div>
            </div>

            {/* CAT8 */}
            <div className="cable-card">
              <div className="cable-card-head">
                <div className="cable-title-wrap">
                  <span className="cable-pill pill-teal">Category 8</span>
                  <h3>CAT8</h3>
                </div>
                <div className="cable-bw-badge">2000 MHz</div>
              </div>
              <p className="cable-desc">
                Highest-performance copper cabling. 2000 MHz bandwidth supporting 25GBASE-T and 40GBASE-T. Designed for data centre short-reach applications (30m maximum channel).
              </p>

              <div className="spec-table-wrap">
                <table className="spec-table">
                  <thead>
                    <tr><th>Specification</th><th>Detail</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Bandwidth</td><td><strong>2000 MHz (2 GHz)</strong></td></tr>
                    <tr><td>Max Data Rate</td><td><strong>25GBASE-T / 40GBASE-T</strong></td></tr>
                    <tr><td>Max Channel</td><td>30m (data centre short-reach)</td></tr>
                    <tr><td>Conductor</td><td>22 AWG, 100% Bare Copper</td></tr>
                    <tr><td>Construction</td><td>S/FTP</td></tr>
                    <tr><td>Standards</td><td>ANSI/TIA-568.2-D (Cat 8.1), ISO/IEC 11801 Class I/II</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="cable-meta-block">
                <div className="meta-row">
                  <strong><i className="fas fa-check-circle"></i> Applications:</strong>
                  <span>Data centre top-of-rack (ToR) to server, 25G/40G switching, HPC environments</span>
                </div>
              </div>
            </div>

            {/* Patch Cords — Copper */}
            <div className="cable-card">
              <div className="cable-card-head">
                <div className="cable-title-wrap">
                  <span className="cable-pill pill-orange">Assemblies</span>
                  <h3>Patch Cords — Copper</h3>
                </div>
                <div className="cable-bw-badge">CAT5e – CAT7</div>
              </div>
              <p className="cable-desc">
                Factory-manufactured, 100% tested cable assemblies with RJ45 plugs. Available in CAT5e, CAT6, CAT6A, and CAT7.
              </p>

              <div className="spec-table-wrap">
                <table className="spec-table">
                  <thead>
                    <tr><th>Specification</th><th>Detail</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Conductor</td><td>Stranded 26/28 AWG bare copper</td></tr>
                    <tr><td>Connector</td><td>RJ45, 8P8C, gold-plated contacts</td></tr>
                    <tr><td>Wiring</td><td>T568B (standard) / T568A</td></tr>
                    <tr><td>Lengths</td><td>0.5m, 1m, 1.5m, 2m, 3m, 5m, 7m, 10m</td></tr>
                    <tr><td>Colors</td><td>Grey, Blue, Red, Yellow, Green, Orange, White, Black, Purple, Pink</td></tr>
                    <tr><td>Testing</td><td>100% factory tested — wire map, length, NEXT, IL</td></tr>
                    <tr><td>Standards</td><td>TIA-568.2-D, ISO/IEC 11801, IEC 60603-7</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Copper Accessories */}
          <div className="sub-table-card">
            <div className="sub-card-head">
              <h3><i className="fas fa-tools"></i> Copper Accessories</h3>
              <p>Essential field termination, testing, and bundling accessories</p>
            </div>
            <div className="sub-table-wrap">
              <table className="sub-table">
                <thead>
                  <tr>
                    <th style={{ width: '35%' }}>Product</th>
                    <th style={{ width: '65%' }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Cable Ties (Hook &amp; Loop)</strong></td>
                    <td>Reusable velcro ties for cable bundling</td>
                  </tr>
                  <tr>
                    <td><strong>RJ45 Field-Term Connectors</strong></td>
                    <td>Field-terminable, CAT5e/CAT6</td>
                  </tr>
                  <tr>
                    <td><strong>Pull Wire / Pulling Tape</strong></td>
                    <td>Fiberglass pull wire for conduit installation</td>
                  </tr>
                  <tr>
                    <td><strong>Self-Lam Cable Labels</strong></td>
                    <td>Self-laminating identification labels</td>
                  </tr>
                  <tr>
                    <td><strong>Punch-Down Tool</strong></td>
                    <td>Impact tool for 110 and Krone IDC terminations</td>
                  </tr>
                  <tr>
                    <td><strong>Wire Stripper</strong></td>
                    <td>Adjustable, CAT5e through CAT7</td>
                  </tr>
                  <tr>
                    <td><strong>Crimping Tool</strong></td>
                    <td>Ratchet crimper for RJ45 connectors</td>
                  </tr>
                  <tr>
                    <td><strong>Cable Tester (Basic)</strong></td>
                    <td>RJ45 wire map and continuity tester</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            2. FIBER OPTIC
        ══════════════════════════════════════════════ */}
        <section id="fiber" className="port-section">
          <div className="sec-header">
            <div className="sec-header-icon"><i className="fas fa-bolt"></i></div>
            <div>
              <span className="sec-badge">Optical Infrastructure</span>
              <h2>Fiber Optic</h2>
              <p className="sec-lead">
                High-speed, low-loss optical connectivity for enterprise backbone, data centres, campus networks, and long-distance transmission.
              </p>
            </div>
          </div>

          <div className="fiber-block">
            {/* Multimode Fiber */}
            <div className="sub-table-card mb-24">
              <div className="sub-card-head">
                <h3><i className="fas fa-wave-square"></i> Multimode Fiber Cables</h3>
                <p>High-bandwidth optical infrastructure for premises and data centres</p>
              </div>
              <div className="sub-table-wrap">
                <table className="sub-table">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Core/Clad</th>
                      <th>Bandwidth</th>
                      <th>Max Distance (10G)</th>
                      <th>Recommendation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><span className="p-type-tag tag-aqua">OM3</span></td>
                      <td>50/125 &micro;m</td>
                      <td>2000 MHz&middot;km</td>
                      <td>300m</td>
                      <td>Standard enterprise backbone</td>
                    </tr>
                    <tr>
                      <td><span className="p-type-tag tag-violet">OM4</span></td>
                      <td>50/125 &micro;m</td>
                      <td>4700 MHz&middot;km</td>
                      <td>400m</td>
                      <td>Enterprise &amp; data centre</td>
                    </tr>
                    <tr>
                      <td><span className="p-type-tag tag-lime">OM5</span></td>
                      <td>50/125 &micro;m</td>
                      <td>WDM-optimized</td>
                      <td>440m (100G SWDM4)</td>
                      <td>Data centre, WDM applications</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Single-Mode Fiber */}
            <div className="sub-table-card mb-24">
              <div className="sub-card-head">
                <h3><i className="fas fa-arrows-alt-h"></i> Single-Mode Fiber Cables</h3>
                <p>Long-haul, campus backbone, and high-distance optical connectivity</p>
              </div>
              <div className="sub-table-wrap">
                <table className="sub-table">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Core/Clad</th>
                      <th>Attenuation</th>
                      <th>Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><span className="p-type-tag tag-yellow">OS1</span></td>
                      <td>9/125 &micro;m</td>
                      <td>1.0 dB/km</td>
                      <td>Indoor tight-buffered</td>
                    </tr>
                    <tr>
                      <td><span className="p-type-tag tag-yellow">OS2</span></td>
                      <td>9/125 &micro;m</td>
                      <td>0.4 dB/km</td>
                      <td>Outdoor / long-haul / campus backbone</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Fiber Patch Cords */}
            <div className="cable-card">
              <div className="cable-card-head">
                <div className="cable-title-wrap">
                  <span className="cable-pill pill-teal">Optical Assemblies</span>
                  <h3>Fiber Patch Cords</h3>
                </div>
                <div className="cable-bw-badge">LC / SC / MPO</div>
              </div>

              <div className="spec-table-wrap">
                <table className="spec-table">
                  <thead>
                    <tr><th>Specification</th><th>Detail</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Connector Types</td><td>LC, SC, ST, FC, MPO/MTP (12/24-fiber)</td></tr>
                    <tr><td>Polish</td><td>UPC / APC</td></tr>
                    <tr><td>Insertion Loss</td><td>0.2 dB (UPC); 0.3 dB (APC)</td></tr>
                    <tr><td>Return Loss</td><td>50 dB (UPC); 60 dB (APC)</td></tr>
                    <tr><td>Jacket</td><td>LSZH (standard)</td></tr>
                    <tr><td>Lengths</td><td>1m, 2m, 3m, 5m, 10m</td></tr>
                    <tr><td>Colors</td><td>Yellow (SM), Aqua (OM3), Violet (OM4), Lime (OM5)</td></tr>
                    <tr><td>Testing</td><td>100% factory tested — IL, RL, geometry</td></tr>
                    <tr><td>Standards</td><td>TIA-568.3-D, IEC 61753-1</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            3. NETWORK CABINETS
        ══════════════════════════════════════════════ */}
        <section id="cabinets" className="port-section">
          <div className="sec-header">
            <div className="sec-header-icon"><i className="fas fa-server"></i></div>
            <div>
              <span className="sec-badge">Enclosure Solutions</span>
              <h2>Network Cabinets</h2>
              <p className="sec-lead">
                Heavy-duty wall-mount enclosures, floor-standing server racks, open frames, and thermal management accessories complying with EIA-310 and IEC standards.
              </p>
            </div>
          </div>

          <div className="cabinets-grid">
            {/* Wall-Mount Cabinets */}
            <div className="cable-card">
              <div className="cable-card-head">
                <div className="cable-title-wrap">
                  <span className="cable-pill pill-blue">Compact Enclosure</span>
                  <h3>Wall-Mount Cabinets</h3>
                </div>
                <div className="cable-bw-badge">6U – 22U</div>
              </div>

              <div className="spec-table-wrap">
                <table className="spec-table">
                  <thead>
                    <tr><th>Specification</th><th>Detail</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Rack Units</td><td><strong>6U, 9U, 12U, 15U, 18U, 22U</strong></td></tr>
                    <tr><td>Width</td><td>19-inch EIA-310</td></tr>
                    <tr><td>Depth</td><td>300mm &ndash; 600mm options</td></tr>
                    <tr><td>Door</td><td>Tempered glass or perforated steel</td></tr>
                    <tr><td>Load Capacity</td><td>Up to 50 kg</td></tr>
                    <tr><td>Material</td><td>Cold-rolled steel, 1.2mm</td></tr>
                    <tr><td>Finish</td><td>Powder-coated RAL 7035</td></tr>
                    <tr><td>Standards</td><td>EIA-310-E, IEC 60297</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Floor-Standing Cabinets */}
            <div className="cable-card">
              <div className="cable-card-head">
                <div className="cable-title-wrap">
                  <span className="cable-pill pill-purple">Data &amp; Telecom</span>
                  <h3>Floor-Standing Cabinets</h3>
                </div>
                <div className="cable-bw-badge">18U – 47U</div>
              </div>

              <div className="spec-table-wrap">
                <table className="spec-table">
                  <thead>
                    <tr><th>Specification</th><th>Detail</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Rack Units</td><td><strong>18U, 22U, 27U, 32U, 37U, 42U, 47U</strong></td></tr>
                    <tr><td>Width</td><td>600mm or 800mm (external)</td></tr>
                    <tr><td>Depth</td><td>800mm, 1000mm, or 1200mm</td></tr>
                    <tr><td>Load Capacity</td><td>Up to 1000 kg</td></tr>
                    <tr><td>Material</td><td>Cold-rolled steel, 1.5mm frame / 1.2mm panels</td></tr>
                    <tr><td>Finish</td><td>Powder-coated RAL 7035</td></tr>
                    <tr><td>Cable Management</td><td>Integrated top/bottom/side entry with brush strips</td></tr>
                    <tr><td>Standards</td><td>EIA-310-E, IEC 60297, EN 55022</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Server Racks (Open Frame) */}
            <div className="cable-card">
              <div className="cable-card-head">
                <div className="cable-title-wrap">
                  <span className="cable-pill pill-teal">Data Centre High-Density</span>
                  <h3>Server Racks (Open Frame)</h3>
                </div>
                <div className="cable-bw-badge">24U – 48U</div>
              </div>

              <div className="spec-table-wrap">
                <table className="spec-table">
                  <thead>
                    <tr><th>Specification</th><th>Detail</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Type</td><td>2-post relay rack / 4-post open frame</td></tr>
                    <tr><td>Rack Units</td><td><strong>24U, 36U, 42U, 45U, 48U</strong></td></tr>
                    <tr><td>Load Capacity</td><td>Up to 1360 kg (4-post)</td></tr>
                    <tr><td>Uprights</td><td>Square-hole universal</td></tr>
                    <tr><td>Standards</td><td>EIA-310-E, TIA-942</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Cabinet Accessories */}
          <div className="sub-table-card mt-24">
            <div className="sub-card-head">
              <h3><i className="fas fa-cogs"></i> Cabinet Accessories</h3>
              <p>Airflow management, cable routing, power distribution, and grounding</p>
            </div>
            <div className="sub-table-wrap">
              <table className="sub-table">
                <thead>
                  <tr>
                    <th style={{ width: '40%' }}>Accessory</th>
                    <th style={{ width: '60%' }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Blanking Panels (1U/2U/3U)</strong></td>
                    <td>Critical for airflow management</td>
                  </tr>
                  <tr>
                    <td><strong>1U Horizontal Cable Manager</strong></td>
                    <td>D-rings, front-mount</td>
                  </tr>
                  <tr>
                    <td><strong>2U Horizontal Cable Manager</strong></td>
                    <td>High-density patching</td>
                  </tr>
                  <tr>
                    <td><strong>Vertical Cable Manager</strong></td>
                    <td>0U side-mount</td>
                  </tr>
                  <tr>
                    <td><strong>Rack PDU (Vertical/Horizontal)</strong></td>
                    <td>4-16 way, 13A or 16A</td>
                  </tr>
                  <tr>
                    <td><strong>Fixed Shelf (1U/2U)</strong></td>
                    <td>Sliding or fixed equipment shelves</td>
                  </tr>
                  <tr>
                    <td><strong>Fan Tray (1U/2U)</strong></td>
                    <td>Thermostatically controlled</td>
                  </tr>
                  <tr>
                    <td><strong>Earthing Bar</strong></td>
                    <td>TIA-607 compliant bonding bar</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            4. CONNECTIVITY
        ══════════════════════════════════════════════ */}
        <section id="connectivity" className="port-section">
          <div className="sec-header">
            <div className="sec-header-icon"><i className="fas fa-plug"></i></div>
            <div>
              <span className="sec-badge">Hardware &amp; Termination</span>
              <h2>Connectivity</h2>
              <p className="sec-lead">
                Patch panels, keystone jacks, faceplates, and modular outlets engineered for fast termination, high transmission margins, and clean presentation.
              </p>
            </div>
          </div>

          {/* Patch Panels */}
          <div className="sub-table-card mb-24">
            <div className="sub-card-head">
              <h3><i className="fas fa-bars"></i> Patch Panels</h3>
              <p>Copper and fiber patch distribution panels</p>
            </div>
            <div className="sub-table-wrap">
              <table className="sub-table">
                <thead>
                  <tr>
                    <th style={{ width: '40%' }}>Product</th>
                    <th style={{ width: '60%' }}>Specification</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td><strong>CAT5e 24-Port Patch Panel</strong></td><td>1U, 110 IDC or Keystone, TIA-568.2-D</td></tr>
                  <tr><td><strong>CAT6 24-Port Patch Panel</strong></td><td>1U, 250 MHz, angled or flat face</td></tr>
                  <tr><td><strong>CAT6 48-Port Patch Panel</strong></td><td>2U, T568A/B dual label</td></tr>
                  <tr><td><strong>CAT6A 24-Port Patch Panel</strong></td><td>1U/2U, 500 MHz, shielded/unshielded</td></tr>
                  <tr><td><strong>CAT6A 48-Port Patch Panel</strong></td><td>2U, unloaded keystone or loaded</td></tr>
                  <tr><td><strong>Fiber Patch Panel</strong></td><td>1U 12 or 24-port, LC/SC/MPO, blank or pre-loaded</td></tr>
                  <tr><td><strong>Angled 24-Port Panel</strong></td><td>15 degree angled face for cable management</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Keystone Jacks */}
          <div className="sub-table-card mb-24">
            <div className="sub-card-head">
              <h3><i className="fas fa-cube"></i> Keystone Jacks</h3>
              <p>Tool-less and high-density modular keystone jacks</p>
            </div>
            <div className="sub-table-wrap">
              <table className="sub-table">
                <thead>
                  <tr>
                    <th style={{ width: '40%' }}>Product</th>
                    <th style={{ width: '60%' }}>Specification</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td><strong>CAT5e Keystone Jack</strong></td><td>100 MHz, 110 IDC, T568A/B, tool-less</td></tr>
                  <tr><td><strong>CAT6 Keystone Jack</strong></td><td>250 MHz, inline or 90 degree</td></tr>
                  <tr><td><strong>CAT6A Keystone Jack</strong></td><td>500 MHz, shielded or unshielded</td></tr>
                  <tr><td><strong>CAT6A Shielded Jack</strong></td><td>F/UTP, 360 degree shielding</td></tr>
                  <tr><td><strong>LC/SC Fiber Keystone Adapter</strong></td><td>Snap-in duplex adapter</td></tr>
                  <tr><td><strong>Blank Insert</strong></td><td>ABS plastic, unused port coverage</td></tr>
                </tbody>
              </table>
            </div>
            <div className="keystone-colors">
              <strong>Available Colors:</strong>
              <div className="color-pills">
                {['White', 'Almond', 'Black', 'Grey', 'Yellow', 'Orange', 'Red', 'Blue', 'Green'].map((c, i) => (
                  <span key={i} className="color-pill">{c}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Faceplates & Outlets */}
          <div className="sub-table-card">
            <div className="sub-card-head">
              <h3><i className="fas fa-square"></i> Faceplates &amp; Outlets</h3>
              <p>British Standard 86x86mm and universal modular faceplates</p>
            </div>
            <div className="sub-table-wrap">
              <table className="sub-table">
                <thead>
                  <tr>
                    <th style={{ width: '40%' }}>Product</th>
                    <th style={{ width: '60%' }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td><strong>Single-Gang Faceplate 1-port</strong></td><td>Horizontal/angled keystone</td></tr>
                  <tr><td><strong>Single-Gang Faceplate 2-port</strong></td><td>Dual keystone</td></tr>
                  <tr><td><strong>Single-Gang Faceplate 4-port</strong></td><td>High-density workstation</td></tr>
                  <tr><td><strong>Double-Gang 4-port</strong></td><td>Wide-frame, 4 keystones</td></tr>
                  <tr><td><strong>Double-Gang 6-port</strong></td><td>Wide-frame, 6 keystones</td></tr>
                  <tr><td><strong>Surface Mount Box 1-4 port</strong></td><td>No trunking required</td></tr>
                  <tr><td><strong>Floor Box Insert</strong></td><td>2-4 port, powder-coated steel</td></tr>
                  <tr><td><strong>86x86mm Flush Box</strong></td><td>UAE standard single-gang wall mount</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            5. ELV — EXTRA LOW VOLTAGE
        ══════════════════════════════════════════════ */}
        <section id="elv" className="port-section">
          <div className="sec-header">
            <div className="sec-header-icon"><i className="fas fa-shield-alt"></i></div>
            <div>
              <span className="sec-badge">Building Technology</span>
              <h2>ELV &mdash; Extra Low Voltage</h2>
              <p className="sec-lead">
                ADORN’s ELV portfolio provides infrastructure cabling, hardware, and accessories for all building ELV systems, meeting <strong>UAE SIRA</strong>, <strong>Dubai Civil Defense</strong>, and <strong>TDRA</strong> requirements.
              </p>
            </div>
          </div>

          {/* CCTV Infrastructure */}
          <div className="sub-table-card mb-24">
            <div className="sub-card-head">
              <h3><i className="fas fa-video"></i> CCTV Infrastructure</h3>
              <p>Coaxial, twisted-pair, and waterproof connectors for security surveillance</p>
            </div>
            <div className="sub-table-wrap">
              <table className="sub-table">
                <thead>
                  <tr>
                    <th style={{ width: '40%' }}>Product</th>
                    <th style={{ width: '60%' }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td><strong>CAT6 CCTV Cable (UTP)</strong></td><td>305m, 23 AWG bare copper, IP cameras</td></tr>
                  <tr><td><strong>CAT6 CCTV Cable (FTP)</strong></td><td>Foil shielded, outdoor/EMI environments</td></tr>
                  <tr><td><strong>RG59 Coaxial Cable</strong></td><td>75-ohm, analog CCTV</td></tr>
                  <tr><td><strong>RG6 Coaxial Cable</strong></td><td>HD-CVI/TVI/AHD cameras</td></tr>
                  <tr><td><strong>Siamese Cable</strong></td><td>RG59+DC Combo for analog CCTV + power</td></tr>
                  <tr><td><strong>IP Camera Waterproof Connector</strong></td><td>RJ45 outdoor, IP67</td></tr>
                  <tr><td><strong>CCTV BNC Connectors</strong></td><td>Crimp or compression, RG59/RG6</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Access Control Infrastructure */}
          <div className="sub-table-card mb-24">
            <div className="sub-card-head">
              <h3><i className="fas fa-id-card"></i> Access Control Infrastructure</h3>
              <p>Shielded multi-core, controller buses, reader and locking cables</p>
            </div>
            <div className="sub-table-wrap">
              <table className="sub-table">
                <thead>
                  <tr>
                    <th style={{ width: '40%' }}>Product</th>
                    <th style={{ width: '60%' }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td><strong>Access Control Cable 4-core</strong></td><td>Shielded, reader and controller wiring</td></tr>
                  <tr><td><strong>Access Control Cable 8-core</strong></td><td>Complex reader/lock wiring</td></tr>
                  <tr><td><strong>Strike Cable (2-core)</strong></td><td>Mains-rated for electric strikes</td></tr>
                  <tr><td><strong>Intercom Cable (2-core)</strong></td><td>Twisted for door intercom audio</td></tr>
                  <tr><td><strong>RS485 Cable</strong></td><td>Shielded twisted pair, controller buses</td></tr>
                  <tr><td><strong>Wiegand Cable (6-core)</strong></td><td>Shielded for Wiegand protocol</td></tr>
                  <tr><td><strong>Magnetic Lock Cable</strong></td><td>Power cable for maglocks</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Power & PoE Standards Reference */}
          <div className="sub-table-card">
            <div className="sub-card-head">
              <h3><i className="fas fa-charging-station"></i> Power &amp; PoE Standards Reference</h3>
              <p>IEEE PoE specifications and deployment capacity</p>
            </div>
            <div className="sub-table-wrap">
              <table className="sub-table">
                <thead>
                  <tr>
                    <th>IEEE Standard</th>
                    <th>Max Power</th>
                    <th>Typical Applications</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>802.3af (PoE)</strong></td>
                    <td><span className="power-badge">15.4W</span></td>
                    <td>IP phones, basic cameras, small APs</td>
                  </tr>
                  <tr>
                    <td><strong>802.3at (PoE+)</strong></td>
                    <td><span className="power-badge">30W</span></td>
                    <td>PTZ cameras, advanced APs</td>
                  </tr>
                  <tr>
                    <td><strong>802.3bt Type 3</strong></td>
                    <td><span className="power-badge power-high">60W</span></td>
                    <td>Smart TVs, video conferencing</td>
                  </tr>
                  <tr>
                    <td><strong>802.3bt Type 4</strong></td>
                    <td><span className="power-badge power-max">90W</span></td>
                    <td>Thin clients, PoE lighting, laptop charging</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Inquire Banner */}
        <div className="port-cta-banner">
          <div className="port-cta-content">
            <h3>Need Bill of Materials (BOM) or Tender Specifications?</h3>
            <p>Our technical team in Dubai assists contractors, consultants, and system integrators with compliant submittals, testing verification, and distributor pricing.</p>
          </div>
          <div className="port-cta-actions">
            <a href="https://wa.me/971526387275" className="hero-btn hero-btn-primary" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i> Chat on WhatsApp
            </a>
            <Link to="/products" className="hero-btn hero-btn-outline">
              <i className="fas fa-th-large"></i> Explore Catalog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

