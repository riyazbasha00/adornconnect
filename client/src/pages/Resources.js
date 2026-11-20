import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { fetchDownloads, imgUrl } from '../api';
import './Resources.css';

const OFFICIAL_RESOURCES = [
  {
    id: 'product-catalogue',
    resource: 'Product Catalogue 2026',
    desc: 'Complete reference guide — all ADORN products',
    icon: 'fa-book-open',
    badge: 'Official 2026 Edition',
    scope: 'Complete reference guide across copper, fiber, cabinets, connectivity & ELV infrastructure.',
  },
  {
    id: 'product-datasheets',
    resource: 'Product Datasheets',
    desc: 'Full specs, construction diagrams, performance charts, part numbers',
    icon: 'fa-file-alt',
    badge: 'Engineering Data',
    scope: 'Mechanical drawings, physical dimensions, electrical limits, attenuation curves, and part numbers.',
  },
  {
    id: 'technical-datasheets',
    resource: 'Technical Datasheets',
    desc: 'Cable performance data, connector specs, cabinet load/thermal data',
    icon: 'fa-microchip',
    badge: 'Lab & Thermal Data',
    scope: 'NEXT/FEXT/IL electrical performance, EIA-310 static/dynamic loads, and thermal heat dissipation.',
  },
  {
    id: 'installation-guides',
    resource: 'Installation Guides',
    desc: 'Step-by-step guides for copper, fiber, cabinet, testing',
    icon: 'fa-tools',
    badge: 'Field Engineering',
    scope: 'Step-by-step procedures for copper punch-down, fiber fusion splicing, rack bonding, and testing.',
  },
  {
    id: 'product-certifications',
    resource: 'Product Certifications',
    desc: 'Third-party test reports: TIA, ISO, RoHS, REACH, CE marking',
    icon: 'fa-certificate',
    badge: 'Third-Party Verified',
    scope: 'Independent laboratory reports, TIA/ISO component compliance, RoHS, REACH, and CE declarations.',
  },
  {
    id: 'compliance-documents',
    resource: 'Compliance Documents',
    desc: 'ISO 9001/14001/27001/45001 certificates, UAE trade license',
    icon: 'fa-award',
    badge: 'Governance & Licensing',
    scope: 'ISO 9001, 14001, 27001, 45001 certificates (LEMS-certified), Dubai DED trade license, and registrations.',
  },
  {
    id: 'brochures',
    resource: 'Brochures',
    desc: 'Brand, Structured Cabling, Data Centre, ELV, Academy brochures',
    icon: 'fa-newspaper',
    badge: 'Solution Overviews',
    scope: 'Focused brochures for Brand, Structured Cabling, Data Centre, ELV, and ADORN Academy.',
  },
  {
    id: 'company-profile',
    resource: 'Company Profile',
    desc: 'Overview, portfolio, project references, certifications',
    icon: 'fa-building',
    badge: 'Corporate Submittal',
    scope: 'Corporate overview, UAE & GCC portfolio, project case studies, credentials, and leadership.',
  },
  {
    id: 'marketing-resources',
    resource: 'Marketing Resources',
    desc: 'For registered partners: brand guidelines, logo files, templates',
    icon: 'fa-bullhorn',
    badge: 'Partner Program Exclusive',
    scope: 'Vector logos, high-resolution product renders, brand style guide, and co-branded marketing assets.',
  },
];

function formatSize(bytes) {
  if (!bytes) return '';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}

function getFileIcon(name) {
  if (!name) return 'fas fa-file-pdf';
  const ext = name.split('.').pop().toLowerCase();
  const map = {
    pdf: 'fas fa-file-pdf',
    doc: 'fas fa-file-word',
    docx: 'fas fa-file-word',
    xls: 'fas fa-file-excel',
    xlsx: 'fas fa-file-excel',
    ppt: 'fas fa-file-powerpoint',
    pptx: 'fas fa-file-powerpoint',
    zip: 'fas fa-file-archive',
    rar: 'fas fa-file-archive',
  };
  return map[ext] || 'fas fa-file-alt';
}

export default function Resources() {
  const [downloads, setDownloads] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDownloads()
      .then((d) => {
        setDownloads(d || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredDownloads =
    activeCategory === 'all'
      ? downloads
      : downloads.filter((d) => d.category === activeCategory);

  return (
    <div className="resources-page">
      <SEO
        title="RESOURCES — Resource Library & Technical Documentation"
        description="ADORN’s resource library provides technical documentation, product catalogues, datasheets, installation guides, certifications, and project support materials."
        url="/resources"
      />

      {/* Hero */}
      <section className="res-hero">
        <div className="container">
          <div className="res-hero-content">
            <span className="res-badge">
              <i className="fas fa-folder-open"></i> Technical Documentation &amp; Submittals
            </span>
            <h1>
              RESOURCES &amp; <span className="hl">Resource Library</span>
            </h1>
            <p className="res-hero-lead">
              ADORN’s resource library provides technical documentation, product information, and project support materials for installers, designers, consultants, and engineers.
            </p>
            <div className="res-hero-tags">
              <span className="r-tag"><i className="fas fa-check-circle"></i> Complete 2026 Catalogue</span>
              <span className="r-tag"><i className="fas fa-check-circle"></i> Engineering Datasheets</span>
              <span className="r-tag"><i className="fas fa-check-circle"></i> ISO &amp; Third-Party Certifications</span>
              <span className="r-tag"><i className="fas fa-check-circle"></i> Tender Submittal Support</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container res-body">
        {/* ══════════════════════════════════════════════
            1. OFFICIAL RESOURCE LIBRARY TABLE
        ══════════════════════════════════════════════ */}
        <section className="res-section">
          <div className="res-section-header">
            <div className="res-sec-icon"><i className="fas fa-book"></i></div>
            <div>
              <span className="res-tag">Document Repository</span>
              <h2>Resource Library</h2>
              <p>Explore technical documentation, specifications, testing compliance, and submittal files.</p>
            </div>
          </div>

          <div className="res-table-wrap">
            <div className="res-table-accent"></div>
            <table className="res-table">
              <thead>
                <tr>
                  <th style={{ width: '35%' }}>
                    <span className="th-icon-label"><i className="fas fa-file-alt"></i> Resource</span>
                  </th>
                  <th style={{ width: '50%' }}>
                    <span className="th-icon-label"><i className="fas fa-info-circle"></i> Description</span>
                  </th>
                  <th style={{ width: '15%', textAlign: 'center' }}>
                    <span className="th-icon-label"><i className="fas fa-download"></i> Access</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {OFFICIAL_RESOURCES.map((item, idx) => (
                  <tr key={idx} className="res-row">
                    <td>
                      <div className="res-title-cell">
                        <div className="res-icon-wrap">
                          <i className={`fas ${item.icon}`}></i>
                        </div>
                        <div>
                          <strong>{item.resource}</strong>
                          <span className="res-pill-tag">{item.badge}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="res-desc-cell">
                        <p className="res-desc-main">{item.desc}</p>
                      </div>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <a
                        href={`https://wa.me/971526387275?text=Hello%20ADORN%2C%20please%20send%20me%20the%20${encodeURIComponent(item.resource)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="res-access-btn"
                        title={`Request ${item.resource}`}
                      >
                        <i className="fas fa-download"></i> Request
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            2. INTERACTIVE RESOURCE CARDS GRID
        ══════════════════════════════════════════════ */}
        <section className="res-cards-section">
          <div className="res-section-header">
            <div className="res-sec-icon"><i className="fas fa-th-large"></i></div>
            <div>
              <span className="res-tag">Category Directory</span>
              <h2>Document Categories</h2>
              <p>Quick reference and package requests for engineering submittals and partner packs.</p>
            </div>
          </div>

          <div className="res-grid">
            {OFFICIAL_RESOURCES.map((r, i) => (
              <div key={i} className="res-card">
                <div className="res-card-head">
                  <div className="rc-icon-wrap">
                    <i className={`fas ${r.icon}`}></i>
                  </div>
                  <span className="rc-badge">{r.badge}</span>
                </div>
                <h3>{r.resource}</h3>
                <p className="rc-desc">{r.desc}</p>
                <div className="rc-scope">
                  <i className="fas fa-check-circle"></i>
                  <span>{r.scope}</span>
                </div>
                <div className="rc-actions">
                  <a
                    href={`https://wa.me/971526387275?text=Hello%20ADORN%2C%20I%20would%20like%20to%20request%20the%20${encodeURIComponent(r.resource)}`}
                    className="rc-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-whatsapp"></i> Inquire Document
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            3. DYNAMIC UPLOADED DOWNLOADS (If Any)
        ══════════════════════════════════════════════ */}
        {downloads && downloads.length > 0 && (
          <section className="dynamic-dl-section">
            <div className="res-section-header">
              <div className="res-sec-icon"><i className="fas fa-cloud-download-alt"></i></div>
              <div>
                <span className="res-tag">Direct Downloads</span>
                <h2>Uploaded Files &amp; Technical Sheets</h2>
                <p>Instantly download PDF datasheets and technical packages uploaded by our engineering team.</p>
              </div>
            </div>

            <div className="dynamic-dl-list">
              {downloads.map((d, i) => (
                <div className="ddl-item" key={d.id || i}>
                  <div className="ddl-icon"><i className={getFileIcon(d.fileName || d.fileUrl)}></i></div>
                  <div className="ddl-info">
                    <h4>{d.title}</h4>
                    <div className="ddl-meta">
                      <span className="ddl-cat">{d.category}</span>
                      {d.fileName && <span>{d.fileName}</span>}
                      {d.fileSize > 0 && <span>{formatSize(d.fileSize)}</span>}
                    </div>
                  </div>
                  <a href={imgUrl(d.fileUrl)} download={d.fileName || ''} target="_blank" rel="noreferrer" className="res-access-btn">
                    <i className="fas fa-download"></i> Download
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════
            4. TENDER / PROJECT SUBMITTAL BANNER
        ══════════════════════════════════════════════ */}
        <div className="res-cta-banner">
          <div className="res-cta-content">
            <h3>Preparing a Tender Submittal or Technical BOQ?</h3>
            <p>
              Our technical engineering department in Dubai provides tailored submittal packages &mdash; including compliance statements, CSI Division 27 specifications, third-party lab certificates, and samples for client approval.
            </p>
          </div>
          <div className="res-cta-actions">
            <a
              href="https://wa.me/971526387275?text=Hello%20ADORN%2C%20I%20need%20a%20technical%20submittal%20package%20for%20an%20upcoming%20project"
              className="hero-btn hero-btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-whatsapp"></i> Request Submittal Pack
            </a>
            <Link to="/portfolio" className="hero-btn hero-btn-outline">
              <i className="fas fa-layer-group"></i> Explore Portfolio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

