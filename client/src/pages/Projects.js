import React, { useState } from 'react';
import { SEO } from '../components/SEO';
import './Projects.css';

const PROJECTS_DATA = [
  {
    id: 1,
    projectNumber: 'Project 1',
    title: 'Corporate Tower — Sheikh Zayed Road, Dubai',
    sector: 'Commercial Enterprise',
    sectorKey: 'commercial',
    location: 'Sheikh Zayed Road, Dubai, UAE',
    icon: 'fa-building',
    solution: 'CAT6A structured cabling, OM4 fiber backbone, 42U floor-standing cabinets, full Fluke DSX certification',
    scale: '24 floors, 1,800 data points, 48U server room',
    standards: ['TIA-568.2-D', 'ISO/IEC 11801 Class EA', 'Dubai Municipality'],
    badgeColor: '#2563eb'
  },
  {
    id: 2,
    projectNumber: 'Project 2',
    title: 'University Campus — Abu Dhabi',
    sector: 'Higher Education',
    sectorKey: 'education',
    location: 'Abu Dhabi, UAE',
    icon: 'fa-graduation-cap',
    solution: 'Campus multi-building structured cabling, OS2 inter-building fiber, PoE Wi-Fi, IP CCTV',
    scale: '6 buildings, 3,200 data points, outdoor armored fiber backbone',
    standards: ['ANSI/TIA-568.3-D', 'ISO/IEC 11801', 'Estidama Pearl'],
    badgeColor: '#059669'
  },
  {
    id: 3,
    projectNumber: 'Project 3',
    title: 'Government Headquarters — Sharjah',
    sector: 'Government & Public Sector',
    sectorKey: 'government',
    location: 'Sharjah, UAE',
    icon: 'fa-landmark',
    solution: 'Structured cabling, fiber backbone, CCTV and access control, secure rack rooms',
    scale: '10-storey building, 2,400 data points',
    standards: ['UAE e-Government framework', 'SIRA compliance'],
    badgeColor: '#d97706'
  },
  {
    id: 4,
    projectNumber: 'Project 4',
    title: 'Hospital Complex — Dubai',
    sector: 'Healthcare & Life Sciences',
    sectorKey: 'healthcare',
    location: 'Dubai, UAE',
    icon: 'fa-hospital-user',
    solution: 'Medical-grade structured cabling, nurse call, IP CCTV, access control, BMS integration',
    scale: '450-bed hospital, 2 buildings',
    standards: ['DHA', 'TIA-568.2-D', 'LSZH throughout'],
    badgeColor: '#dc2626'
  },
  {
    id: 5,
    projectNumber: 'Project 5',
    title: '5-Star Hotel — Dubai Marina',
    sector: 'Hospitality & Leisure',
    sectorKey: 'hospitality',
    location: 'Dubai Marina, UAE',
    icon: 'fa-hotel',
    solution: 'Guest room management (GRMS), IP CCTV, access control, AV infrastructure, back-of-house networking',
    scale: '350 rooms, 7 F&B outlets, ballroom, conference centre',
    standards: ['UAE Civil Defense LSZH', 'IEEE 802.3bt PoE', 'SIRA (Dubai)'],
    badgeColor: '#7c3aed'
  },
  {
    id: 6,
    projectNumber: 'Project 6',
    title: 'Data Centre Facility — Dubai',
    sector: 'Mission Critical & Data Centre',
    sectorKey: 'datacenter',
    location: 'Dubai, UAE',
    icon: 'fa-server',
    solution: 'TIA-942 cabling, pre-terminated fiber trunk systems, CAT8 server cabling, intelligent PDUs',
    scale: '200 cabinets, Tier III compliant design',
    standards: ['TIA-942-B', 'Uptime Institute Tier III'],
    badgeColor: '#0284c7'
  }
];

const SECTOR_FILTERS = [
  { key: 'all', label: 'All Projects', icon: 'fa-th-large' },
  { key: 'commercial', label: 'Commercial', icon: 'fa-building' },
  { key: 'education', label: 'Education', icon: 'fa-graduation-cap' },
  { key: 'government', label: 'Government', icon: 'fa-landmark' },
  { key: 'healthcare', label: 'Healthcare', icon: 'fa-hospital-user' },
  { key: 'hospitality', label: 'Hospitality', icon: 'fa-hotel' },
  { key: 'datacenter', label: 'Data Centre', icon: 'fa-server' }
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = activeFilter === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.sectorKey === activeFilter);

  return (
    <div className="projects-page">
      <SEO
        title="Project Portfolio — UAE & GCC Infrastructure Deployments"
        description="ADORN products have been deployed across UAE and GCC projects spanning enterprise, education, healthcare, hospitality, government, and data centre sectors."
        url="/projects"
      />

      {/* Hero Section */}
      <section className="prj-hero">
        <div className="container">
          <div className="prj-hero-content">
            <span className="prj-badge">
              <i className="fas fa-project-diagram"></i> Enterprise Deployments
            </span>
            <h1>
              Project <span className="hl">Portfolio</span>
            </h1>
            <p className="prj-hero-lead">
              ADORN products have been deployed across UAE and GCC projects spanning enterprise, education, healthcare,
              hospitality, government, and data centre sectors.
            </p>
            <div className="prj-hero-stats">
              <div className="phs-stat">
                <span className="phs-num">10,000+</span>
                <span className="phs-lbl">Certified Data Points</span>
              </div>
              <div className="phs-stat">
                <span className="phs-num">6 Sectors</span>
                <span className="phs-lbl">Mission-Critical Verticals</span>
              </div>
              <div className="phs-stat">
                <span className="phs-num">TIA / ISO</span>
                <span className="phs-lbl">Fully Certified & Verified</span>
              </div>
              <div className="phs-stat">
                <span className="phs-num">25 Years</span>
                <span className="phs-lbl">System Performance Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container prj-body">
        {/* Sector Filter Bar */}
        <div className="prj-filter-bar">
          {SECTOR_FILTERS.map(f => (
            <button
              key={f.key}
              className={`pf-btn ${activeFilter === f.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(f.key)}
            >
              <i className={`fas ${f.icon}`}></i> {f.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="prj-grid">
          {filteredProjects.map((p) => (
            <article key={p.id} className="prj-card">
              <div className="prj-card-top">
                <div className="prj-card-header">
                  <span className="prj-num-badge" style={{ backgroundColor: `${p.badgeColor}15`, color: p.badgeColor, borderColor: `${p.badgeColor}40` }}>
                    <i className={`fas ${p.icon}`}></i> {p.projectNumber}
                  </span>
                  <span className="prj-sector-tag">{p.sector}</span>
                </div>
                <h2 className="prj-card-title">{p.title}</h2>
                <div className="prj-card-location">
                  <i className="fas fa-map-marker-alt"></i> {p.location}
                </div>
              </div>

              <div className="prj-card-details">
                {/* Solution Block */}
                <div className="pcd-block">
                  <div className="pcd-label">
                    <i className="fas fa-network-wired"></i>
                    <strong>Solution</strong>
                  </div>
                  <p className="pcd-text">{p.solution}</p>
                </div>

                {/* Scale Block */}
                <div className="pcd-block">
                  <div className="pcd-label">
                    <i className="fas fa-layer-group"></i>
                    <strong>Scale</strong>
                  </div>
                  <p className="pcd-text">{p.scale}</p>
                </div>

                {/* Standards Block */}
                {p.standards && p.standards.length > 0 && (
                  <div className="pcd-block pcd-standards-block">
                    <div className="pcd-label">
                      <i className="fas fa-shield-alt"></i>
                      <strong>Standards & Compliance</strong>
                    </div>
                    <div className="prj-standards-pills">
                      {p.standards.map((std, idx) => (
                        <span key={idx} className="std-pill">
                          <i className="fas fa-check-circle"></i> {std}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="prj-card-footer">
                <span className="pcf-badge">
                  <i className="fas fa-certificate"></i> Fluke Tested & Certified
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Project Assurance Banner */}
        <section className="prj-assurance-section">
          <div className="pas-inner">
            <div className="pas-icon">
              <i className="fas fa-award"></i>
            </div>
            <div className="pas-content">
              <h3>Engineered for Critical Environments</h3>
              <p>
                From Sheikh Zayed Road commercial towers to Abu Dhabi universities and mission-critical Dubai data centres,
                ADORN infrastructure delivers tested bandwidth, zero-packet-loss reliability, and complete UAE regulatory compliance.
              </p>
              <div className="pas-points">
                <span><i className="fas fa-check"></i> 100% Solid Bare Copper Only</span>
                <span><i className="fas fa-check"></i> LSZH Civil Defense Fire Compliance</span>
                <span><i className="fas fa-check"></i> SIRA & TDRA Approved Specifications</span>
                <span><i className="fas fa-check"></i> End-to-End 25-Year System Warranty</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Bottom Section */}
        <section className="prj-cta-banner">
          <div className="pcb-content">
            <h2>Planning a Cabling or ELV Infrastructure Project?</h2>
            <p>
              Our engineering team collaborates with consultants, system integrators, and MEP contractors across the GCC
              to provide bill-of-quantities (BOQ) review, specification support, and Fluke DSX certification guidance.
            </p>
            <div className="pcb-buttons">
              <a
                href="https://wa.me/971526387275?text=Hello%20ADORN%2C%20I%20have%20an%20enquiry%20regarding%20a%20cabling%20or%20ELV%20infrastructure%20project."
                className="btn btn-whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-whatsapp"></i> Enquiry on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

