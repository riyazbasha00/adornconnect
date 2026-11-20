import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { createEnrollment } from '../api';
import './Academy.css';

const ALL_COURSES = [
  'Level 1 — Beginner Level Courses (Foundations)',
  'Level 2 — Intermediate Level Courses (Installation & Testing)',
  'Level 3 — Advanced Level Courses (Design & Architecture)',
  'ACPIS Level 1 — Passive Infrastructure Foundation',
  'ACPIS Level 2 — Passive Infrastructure Professional',
  'ACPIS Level 3 — Passive Infrastructure Expert & Designer',
  'ACSIS Level 1 — ELV & Security Systems Foundation',
  'ACSIS Level 2 — System Integration Professional',
  'ACSIS Level 3 — Master System Integrator & Lead Engineer',
];

const UAE_EMIRATES = [
  'Dubai',
  'Abu Dhabi',
  'Sharjah',
  'Ajman',
  'Ras Al Khaimah',
  'Fujairah',
  'Umm Al Quwain',
  'Other GCC / International'
];

const PROFESSIONAL_ROLES = [
  'Structured Cabling Installer / Technician',
  'ELV / Telecom Systems Engineer',
  'Network & IT Infrastructure Specialist',
  'CCTV & Security Systems Specialist (SIRA)',
  'MEP / Electrical Contractor',
  'Project Manager / Infrastructure Consultant',
  'Engineering Student / Graduate',
  'Other'
];

const LEARNING_PATHS = [
  {
    num: '01',
    title: 'Networking Fundamentals',
    target: 'For complete beginners, IT support staff, non-technical professionals entering the networking field.',
    icon: 'fa-network-wired',
    color: 'blue',
  },
  {
    num: '02',
    title: 'Copper Networking',
    target: 'For technicians, installers, junior engineers working with copper cabling. Covers CAT5e-CAT8, UTP/FTP/STP, solid vs stranded, CCA vs bare copper, AWG, T568A/B, testing.',
    icon: 'fa-ethernet',
    color: 'purple',
  },
  {
    num: '03',
    title: 'Fiber Optics',
    target: 'For technicians and engineers working with fiber optic systems. Covers single-mode vs multimode, fiber types, connectors, installation, testing (OLTS/OTDR), loss budget calculations.',
    icon: 'fa-bolt',
    color: 'teal',
  },
  {
    num: '04',
    title: 'Structured Cabling (System Design)',
    target: 'For engineers, designers, and consultants. Covers ANSI/TIA-568, horizontal/backbone design, TR design, TIA-569/606/607/942, UAE regulatory requirements, BOQ preparation.',
    icon: 'fa-sitemap',
    color: 'indigo',
  },
  {
    num: '05',
    title: 'ELV & System Integration',
    target: 'For ELV technicians and system integrators. Covers CCTV, access control, BMS, intercom, PA, UAE SIRA compliance, project documentation.',
    icon: 'fa-shield-alt',
    color: 'orange',
  },
];

const COURSES = {
  beginner: [
    { name: 'Introduction to Network Infrastructure', duration: '4 hours', topics: 'OSI model, network types, active vs passive' },
    { name: 'Copper Cable Basics', duration: '6 hours', topics: 'Cable categories, construction, standards' },
    { name: 'Fiber Optic Fundamentals', duration: '6 hours', topics: 'Light transmission, fiber types, connectors' },
    { name: 'Introduction to Network Cabinets', duration: '3 hours', topics: 'Rack units, cabinet types, basic organization' },
    { name: 'Introduction to ELV Systems', duration: '4 hours', topics: 'ELV categories, typical building systems' },
  ],
  intermediate: [
    { name: 'Copper Cabling Installation', duration: '8 hours', topics: 'Tools, techniques, standards, testing' },
    { name: 'Fiber Installation & Testing', duration: '10 hours', topics: 'Installation, termination, OTDR, loss budget' },
    { name: 'Structured Cabling System Design', duration: '12 hours', topics: 'TIA-568 design, TR layout, documentation' },
    { name: 'CCTV Infrastructure Design', duration: '8 hours', topics: 'IP camera cabling, NVR, storage, SIRA' },
    { name: 'UAE Standards & Compliance', duration: '6 hours', topics: 'TDRA, SIRA, Dubai Municipality, Civil Defense' },
  ],
  advanced: [
    { name: 'Data Centre Infrastructure Design', duration: '16 hours', topics: 'TIA-942, Tier ratings, high-density cabling' },
    { name: 'Advanced Structured Cabling Design', duration: '16 hours', topics: 'Campus design, BOQ, specification writing' },
    { name: 'System Integration Masterclass', duration: '20 hours', topics: 'Multi-system design, protocols, commissioning' },
    { name: 'Smart Building Infrastructure', duration: '12 hours', topics: 'IoT, BMS, PoE lighting, converged systems' },
  ],
};

const CERT_COMPARISON = [
  { feature: 'Domain', acpis1: 'Passive Cabling', acpis2: 'Passive Cabling', acpis3: 'Passive Cabling', acsis1: 'System Integration', acsis2: 'System Integration', acsis3: 'System Integration' },
  { feature: 'Duration', acpis1: '3 days', acpis2: '4 days', acpis3: '5 days', acsis1: '3 days', acsis2: '5 days', acsis3: '7 days' },
  { feature: 'Exam', acpis1: '60 MCQ', acpis2: '75 MCQ + practical', acpis3: '90 MCQ + project', acsis1: '60 MCQ', acsis2: '75 MCQ + practical', acsis3: '90 MCQ + project' },
  { feature: 'Pass Score', acpis1: '70%', acpis2: '75%', acpis3: '80%', acsis1: '70%', acsis2: '75%', acsis3: '80%' },
  { feature: 'Validity', acpis1: '3 years', acpis2: '3 years', acpis3: '3 years', acsis1: '3 years', acsis2: '3 years', acsis3: '3 years' },
  { feature: 'Professional Level', acpis1: 'Installer', acpis2: 'Supervisor', acpis3: 'Designer / Consultant', acsis1: 'ELV Tech', acsis2: 'SI Engineer', acsis3: 'SI Expert / PM' },
];

export default function Academy() {
  const [activeCertTab, setActiveCertTab] = useState('acpis');
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('Level 1 — Beginner Level Courses (Foundations)');
  const [courseDuration, setCourseDuration] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successData, setSuccessData] = useState(null);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    emirate: 'Dubai',
    company: '',
    designation: 'Structured Cabling Installer / Technician',
    trainingMode: 'In-Person Dubai Lab',
    preferredBatch: 'Weekend Batch (Saturday & Sunday)',
    siraLicense: '',
    notes: '',
  });

  const handleOpenEnroll = (courseName, duration = '') => {
    setSelectedCourse(courseName);
    setCourseDuration(duration);
    setErrorMsg('');
    setSuccessData(null);
    setEnrollModalOpen(true);
  };

  const handleCloseEnroll = () => {
    setEnrollModalOpen(false);
    setSuccessData(null);
    setErrorMsg('');
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && enrollModalOpen) {
        handleCloseEnroll();
      }
    };
    if (enrollModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [enrollModalOpen]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitEnroll = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!form.fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!form.email.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }
    if (!form.phone.trim()) {
      setErrorMsg('Please enter your WhatsApp/Phone number.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await createEnrollment({
        courseName: selectedCourse,
        ...form
      });
      setSuccessData(res.enrollment);
    } catch (err) {
      setErrorMsg(err.message || 'Registration failed. Please try again or contact us on WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="academy-page">
      <SEO
        title="ADORN Academy — Learn. Practice. Get Certified."
        description="The GCC's dedicated learning and certification platform for passive infrastructure and system integration professionals. ACPIS and ACSIS certifications."
        url="/academy"
      />

      {/* Hero */}
      <section className="aca-hero">
        <div className="container">
          <div className="aca-hero-inner">
            <span className="aca-badge">
              <i className="fas fa-graduation-cap"></i> Professional Education &amp; Certifications
            </span>
            <h1>
              Learn. Practice. <span className="hl">Get Certified.</span>
            </h1>
            <p className="aca-subheadline">
              The GCC’s dedicated learning and certification platform for passive infrastructure and system integration professionals.
            </p>
            <p className="aca-hero-lead">
              ADORN Academy is a structured education and professional certification platform designed to develop the next generation of network infrastructure engineers, system integrators, and ELV specialists in the UAE and GCC.
            </p>
            <div className="aca-hero-actions">
              <a href="#certifications" className="hero-btn hero-btn-primary">
                <i className="fas fa-award"></i> View Certifications
              </a>
              <a href="https://wa.me/971526387275?text=Hello%20ADORN%20Academy%2C%20I%20am%20interested%20in%20certification%20training" className="hero-btn hero-btn-outline" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-whatsapp"></i> Inquire for Enrollment
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes ADORN Academy Different */}
      <section className="aca-diff-section">
        <div className="container">
          <div className="aca-section-head">
            <span className="ab-badge"><i className="fas fa-star"></i> Our Advantage</span>
            <h2>What Makes ADORN Academy Different</h2>
            <p>Industry-aligned training built specifically for the Gulf region’s engineering demands.</p>
          </div>
          <div className="aca-diff-grid">
            {[
              { icon: 'fa-globe-asia', title: 'UAE & GCC Industry Context', desc: 'Curriculum shaped around real projects, GCC standards, and local deployment realities.' },
              { icon: 'fa-layer-group', title: 'Real Project Depth', desc: 'Technical depth directly aligned with active enterprise, hospitality, and campus specifications.' },
              { icon: 'fa-handshake', title: 'Consultant & SI Recognized', desc: 'Certifications valued and recognized by UAE system integrators, contractors, and consultants.' },
              { icon: 'fa-laptop-code', title: 'Practical, Hands-on Labs', desc: 'Applied learning with interactive field-termination, OTDR testing, and rack-build labs.' },
              { icon: 'fa-chart-line', title: 'Clear Career Progression', desc: 'Structured roadmap guiding candidates from foundational technician to senior designer.' },
              { icon: 'fa-shield-alt', title: 'Full Regulatory Alignment', desc: 'Directly aligned with TIA, ISO, SIRA, TDRA, and UAE Civil Defense mandates.' },
            ].map((item, i) => (
              <div key={i} className="aca-diff-card">
                <div className="aca-diff-icon">
                  <i className={`fas ${item.icon}`}></i>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="aca-paths-section" id="learning-paths">
        <div className="container">
          <div className="aca-section-head">
            <span className="ab-badge"><i className="fas fa-road"></i> Progression</span>
            <h2>Learning Paths</h2>
            <p>Structured roadmaps designed for specific career tracks across the infrastructure industry.</p>
          </div>
          <div className="aca-paths-grid">
            {LEARNING_PATHS.map((path, idx) => (
              <div key={idx} className={`path-card path-card-${path.color}`}>
                <div className="path-num">{path.num}</div>
                <div className="path-icon-wrap">
                  <i className={`fas ${path.icon}`}></i>
                </div>
                <h3>{path.title}</h3>
                <p>{path.target}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Catalog */}
      <section className="aca-courses-section" id="courses">
        <div className="container">
          <div className="aca-section-head">
            <span className="ab-badge"><i className="fas fa-book-open"></i> Curriculum</span>
            <h2>Course Catalog</h2>
            <p>Targeted modular courses categorized from entry-level fundamentals to advanced engineering.</p>
          </div>

          <div className="courses-levels-wrap">
            {/* Beginner */}
            <div className="course-level-card">
              <div className="course-level-header header-beginner">
                <div className="clh-left">
                  <span className="level-pill">Level 1</span>
                  <div className="clh-title-row">
                    <h3>Beginner Level Courses</h3>
                    <button
                      type="button"
                      className="level-enroll-btn btn-enroll-lvl1"
                      onClick={() => handleOpenEnroll('Level 1 — Beginner Level Courses (Foundations)', '23 hours (5 Modular Courses)')}
                    >
                      <i className="fas fa-user-plus"></i> Enroll
                    </button>
                  </div>
                </div>
                <span className="level-badge">Foundations</span>
              </div>
              <div className="course-table-wrap">
                <table className="course-table">
                  <thead>
                    <tr>
                      <th style={{ width: '40%' }}>Course</th>
                      <th style={{ width: '20%' }}>Duration</th>
                      <th style={{ width: '40%' }}>Topics Covered</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COURSES.beginner.map((c, i) => (
                      <tr key={i}>
                        <td><strong>{c.name}</strong></td>
                        <td><span className="dur-badge"><i className="far fa-clock"></i> {c.duration}</span></td>
                        <td>{c.topics}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Intermediate */}
            <div className="course-level-card">
              <div className="course-level-header header-intermediate">
                <div className="clh-left">
                  <span className="level-pill">Level 2</span>
                  <div className="clh-title-row">
                    <h3>Intermediate Level Courses</h3>
                    <button
                      type="button"
                      className="level-enroll-btn btn-enroll-lvl2"
                      onClick={() => handleOpenEnroll('Level 2 — Intermediate Level Courses (Installation & Testing)', '40 hours (5 Modular Courses)')}
                    >
                      <i className="fas fa-user-plus"></i> Enroll
                    </button>
                  </div>
                </div>
                <span className="level-badge">Installation &amp; Testing</span>
              </div>
              <div className="course-table-wrap">
                <table className="course-table">
                  <thead>
                    <tr>
                      <th style={{ width: '40%' }}>Course</th>
                      <th style={{ width: '20%' }}>Duration</th>
                      <th style={{ width: '40%' }}>Topics Covered</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COURSES.intermediate.map((c, i) => (
                      <tr key={i}>
                        <td><strong>{c.name}</strong></td>
                        <td><span className="dur-badge"><i className="far fa-clock"></i> {c.duration}</span></td>
                        <td>{c.topics}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Advanced */}
            <div className="course-level-card">
              <div className="course-level-header header-advanced">
                <div className="clh-left">
                  <span className="level-pill">Level 3</span>
                  <div className="clh-title-row">
                    <h3>Advanced Level Courses</h3>
                    <button
                      type="button"
                      className="level-enroll-btn btn-enroll-lvl3"
                      onClick={() => handleOpenEnroll('Level 3 — Advanced Level Courses (Design & Architecture)', '64 hours (4 Modular Courses)')}
                    >
                      <i className="fas fa-user-plus"></i> Enroll
                    </button>
                  </div>
                </div>
                <span className="level-badge">Design &amp; Architecture</span>
              </div>
              <div className="course-table-wrap">
                <table className="course-table">
                  <thead>
                    <tr>
                      <th style={{ width: '40%' }}>Course</th>
                      <th style={{ width: '20%' }}>Duration</th>
                      <th style={{ width: '40%' }}>Topics Covered</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COURSES.advanced.map((c, i) => (
                      <tr key={i}>
                        <td><strong>{c.name}</strong></td>
                        <td><span className="dur-badge"><i className="far fa-clock"></i> {c.duration}</span></td>
                        <td>{c.topics}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="aca-certs-section" id="certifications">
        <div className="container">
          <div className="aca-section-head">
            <span className="ab-badge"><i className="fas fa-certificate"></i> Credentials</span>
            <h2>ADORN Certification Programs</h2>
            <p>Industry-recognized professional credentials across Structured Cabling (ACPIS) and System Integration (ACSIS).</p>
          </div>

          {/* Legal / Accreditation Notice */}
          <div className="cert-governance-box">
            <div className="gov-icon"><i className="fas fa-stamp"></i></div>
            <div className="gov-content">
              <strong>Official Awarding Body &amp; ISO Accreditations:</strong>
              <p>
                Certificates issued by <strong>ADORN Information Technology Systems LLC</strong>, Jumeirah Lake Tower, Dubai, UAE.<br />
                Quality &amp; Management Compliance: <strong>ISO 9001:2015, ISO 14001:2015, ISO 27001:2022, ISO 45001:2018 (LEMS-certified)</strong>.
              </p>
            </div>
          </div>

          {/* Certification Switcher */}
          <div className="cert-tab-switcher">
            <button
              className={`cert-tab-btn ${activeCertTab === 'acpis' ? 'active' : ''}`}
              onClick={() => setActiveCertTab('acpis')}
            >
              <i className="fas fa-network-wired"></i>
              <div>
                <strong>ACPIS</strong>
                <span>ADORN Certified Passive Infrastructure Specialist</span>
              </div>
            </button>
            <button
              className={`cert-tab-btn ${activeCertTab === 'acsis' ? 'active' : ''}`}
              onClick={() => setActiveCertTab('acsis')}
            >
              <i className="fas fa-shield-alt"></i>
              <div>
                <strong>ACSIS</strong>
                <span>ADORN Certified System Integration Specialist</span>
              </div>
            </button>
          </div>

          {/* ════ ACPIS Track ════ */}
          {activeCertTab === 'acpis' && (
            <div className="cert-domain-block">
              <div className="domain-intro">
                <h3>ACPIS — ADORN Certified Passive Infrastructure Specialist</h3>
                <p>Focused on Structured Cabling, Copper/Fiber Engineering, Data Centre Topologies, and Passive Infrastructure Standards.</p>
              </div>

              {/* ACPIS Level 1 */}
              <div className="cert-card">
                <div className="cert-card-top">
                  <div>
                    <span className="cert-level-pill">Level 1 &bull; Foundation</span>
                    <h4>ACPIS Level 1 — Passive Infrastructure Foundation</h4>
                    <p className="cert-tagline">&ldquo;Start your infrastructure career on solid ground.&rdquo;</p>
                  </div>
                  <div className="cert-badge-visual">
                    <span className="cb-code">ACPIS-F</span>
                    <span className="cb-lvl">LEVEL 1</span>
                  </div>
                </div>

                <div className="cert-details-grid">
                  <div className="cd-item"><strong>Target Audience:</strong><span>Fresh graduates, apprentice technicians, career changers</span></div>
                  <div className="cd-item"><strong>Prerequisites:</strong><span>None</span></div>
                  <div className="cd-item"><strong>Training Duration:</strong><span>3 days classroom / 24 hours self-paced online</span></div>
                  <div className="cd-item"><strong>Exam Format:</strong><span>60 multiple-choice questions</span></div>
                  <div className="cd-item"><strong>Exam Duration:</strong><span>90 minutes</span></div>
                  <div className="cd-item"><strong>Passing Score:</strong><span>70% (42/60 correct)</span></div>
                  <div className="cd-item"><strong>Certificate Validity:</strong><span>3 years</span></div>
                </div>

                <div className="curriculum-wrap">
                  <h5><i className="fas fa-list-ol"></i> Curriculum Modules (8 Modules)</h5>
                  <div className="modules-grid">
                    <div className="module-item">
                      <span className="mod-num">Module 1</span>
                      <strong>Network Infrastructure Fundamentals</strong>
                      <p>OSI model, network types, active vs passive, structured cabling concepts</p>
                    </div>
                    <div className="module-item">
                      <span className="mod-num">Module 2</span>
                      <strong>Copper Cable Technology</strong>
                      <p>CAT5e through CAT8, UTP/FTP/STP, solid vs stranded, CCA vs bare copper, AWG</p>
                    </div>
                    <div className="module-item">
                      <span className="mod-num">Module 3</span>
                      <strong>Cable Installation Basics</strong>
                      <p>Tools, routing, bend radius, pulling techniques, cable management</p>
                    </div>
                    <div className="module-item">
                      <span className="mod-num">Module 4</span>
                      <strong>Termination &amp; Connectivity</strong>
                      <p>Keystone jacks, patch panels, RJ45 crimping, T568A/B wiring</p>
                    </div>
                    <div className="module-item">
                      <span className="mod-num">Module 5</span>
                      <strong>Introduction to Fiber Optics</strong>
                      <p>Fiber types, connectors, basic installation principles</p>
                    </div>
                    <div className="module-item">
                      <span className="mod-num">Module 6</span>
                      <strong>Network Cabinets &amp; Racks</strong>
                      <p>Rack units, wall-mount vs floor-standing, basic organization, PDU basics</p>
                    </div>
                    <div className="module-item">
                      <span className="mod-num">Module 7</span>
                      <strong>Labeling &amp; Documentation</strong>
                      <p>TIA-606 labeling, cable IDs, termination records</p>
                    </div>
                    <div className="module-item">
                      <span className="mod-num">Module 8</span>
                      <strong>Workplace Safety</strong>
                      <p>PPE, working at heights, electrical awareness, UAE labor regulations</p>
                    </div>
                  </div>
                </div>
                <div className="cert-card-actions">
                  <button
                    type="button"
                    className="aca-cert-enroll-btn"
                    onClick={() => handleOpenEnroll('ACPIS Level 1 — Passive Infrastructure Foundation', '3 days')}
                  >
                    <i className="fas fa-graduation-cap"></i> Enroll in ACPIS Level 1
                  </button>
                  <a
                    href="https://wa.me/971526387275?text=Hello%20ADORN%20Academy%2C%20I%20would%20like%20to%20inquire%20about%20ACPIS%20Level%201"
                    className="aca-cert-wa-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-whatsapp"></i> Inquire
                  </a>
                </div>
              </div>

              {/* ACPIS Level 2 */}
              <div className="cert-card">
                <div className="cert-card-top">
                  <div>
                    <span className="cert-level-pill pill-inter">Level 2 &bull; Professional</span>
                    <h4>ACPIS Level 2 — Passive Infrastructure Professional</h4>
                    <p className="cert-tagline">&ldquo;From capable technician to confident professional.&rdquo;</p>
                  </div>
                  <div className="cert-badge-visual cb-blue">
                    <span className="cb-code">ACPIS-P</span>
                    <span className="cb-lvl">LEVEL 2</span>
                  </div>
                </div>

                <div className="cert-details-grid">
                  <div className="cd-item"><strong>Target Audience:</strong><span>Experienced technicians, site supervisors, project coordinators (1+ year)</span></div>
                  <div className="cd-item"><strong>Prerequisites:</strong><span>ACPIS Level 1 OR 2 years demonstrated installation experience</span></div>
                  <div className="cd-item"><strong>Training Duration:</strong><span>4 days classroom / 32 hours self-paced online</span></div>
                  <div className="cd-item"><strong>Exam Format:</strong><span>75 multiple-choice questions + 1 practical assessment</span></div>
                  <div className="cd-item"><strong>Exam Duration:</strong><span>3 hours total</span></div>
                  <div className="cd-item"><strong>Passing Score:</strong><span>75% written + satisfactory practical</span></div>
                  <div className="cd-item"><strong>Certificate Validity:</strong><span>3 years</span></div>
                </div>

                <div className="curriculum-wrap">
                  <h5><i className="fas fa-list-ol"></i> Curriculum Modules (8 Modules)</h5>
                  <div className="modules-grid">
                    <div className="module-item">
                      <span className="mod-num">Module 1</span>
                      <strong>TIA &amp; ISO Standards</strong>
                      <p>TIA-568.2-D, TIA-568.3-D, ISO/IEC 11801 Class E/EA/F, TIA-569/606/607</p>
                    </div>
                    <div className="module-item">
                      <span className="mod-num">Module 2</span>
                      <strong>UAE Regulatory Compliance</strong>
                      <p>TDRA, Dubai Municipality, Trakhees, LSZH fire requirements</p>
                    </div>
                    <div className="module-item">
                      <span className="mod-num">Module 3</span>
                      <strong>Advanced Copper Cabling</strong>
                      <p>CAT6A design, alien crosstalk (AXT), 10GBASE-T, shielded installation</p>
                    </div>
                    <div className="module-item">
                      <span className="mod-num">Module 4</span>
                      <strong>Fiber Optic Systems</strong>
                      <p>OM3/OM4/OM5/OS2, connectors, fusion splice basics, OLTS/OTDR testing</p>
                    </div>
                    <div className="module-item">
                      <span className="mod-num">Module 5</span>
                      <strong>Structured Cabling System Design</strong>
                      <p>TIA-568 topology, horizontal/backbone, TR/ER/MC/IC design</p>
                    </div>
                    <div className="module-item">
                      <span className="mod-num">Module 6</span>
                      <strong>Cable Testing &amp; Certification</strong>
                      <p>Fluke DSX, IL/NEXT/FEXT/RL, fiber testing, certification documentation</p>
                    </div>
                    <div className="module-item">
                      <span className="mod-num">Module 7</span>
                      <strong>Project Execution</strong>
                      <p>Construction drawings, BOQ, installation scheduling, as-built</p>
                    </div>
                    <div className="module-item">
                      <span className="mod-num">Module 8</span>
                      <strong>Quality &amp; Handover</strong>
                      <p>Site inspection, punch list, O&amp;M documentation, warranty</p>
                    </div>
                  </div>
                </div>
                <div className="cert-card-actions">
                  <button
                    type="button"
                    className="aca-cert-enroll-btn"
                    onClick={() => handleOpenEnroll('ACPIS Level 2 — Passive Infrastructure Professional', '4 days')}
                  >
                    <i className="fas fa-graduation-cap"></i> Enroll in ACPIS Level 2
                  </button>
                  <a
                    href="https://wa.me/971526387275?text=Hello%20ADORN%20Academy%2C%20I%20would%20like%20to%20inquire%20about%20ACPIS%20Level%202"
                    className="aca-cert-wa-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-whatsapp"></i> Inquire
                  </a>
                </div>
              </div>

              {/* ACPIS Level 3 */}
              <div className="cert-card cert-card-expert">
                <div className="cert-card-top">
                  <div>
                    <span className="cert-level-pill pill-expert">Level 3 &bull; Expert &amp; Designer</span>
                    <h4>ACPIS Level 3 — Passive Infrastructure Expert &amp; Designer</h4>
                    <p className="cert-tagline">&ldquo;Lead infrastructure design. Define project standards. Shape industry practice.&rdquo;</p>
                  </div>
                  <div className="cert-badge-visual cb-gold">
                    <span className="cb-code">ACPIS-E</span>
                    <span className="cb-lvl">LEVEL 3</span>
                  </div>
                </div>

                <div className="cert-details-grid">
                  <div className="cd-item"><strong>Target Audience:</strong><span>Senior engineers, infrastructure designers, network consultants, project managers</span></div>
                  <div className="cd-item"><strong>Prerequisites:</strong><span>ACPIS Level 2 OR 5 years demonstrated design/engineering experience</span></div>
                  <div className="cd-item"><strong>Training Duration:</strong><span>5 days classroom / 40 hours self-paced</span></div>
                  <div className="cd-item"><strong>Exam Format:</strong><span>90 MCQ + practical design project (floor plan design submission)</span></div>
                  <div className="cd-item"><strong>Exam Duration:</strong><span>4 hours total</span></div>
                  <div className="cd-item"><strong>Passing Score:</strong><span>80% written + design project pass</span></div>
                  <div className="cd-item"><strong>Certificate Validity:</strong><span>3 years</span></div>
                </div>

                <div className="curriculum-wrap">
                  <h5><i className="fas fa-list-ol"></i> Curriculum Modules (8 Modules)</h5>
                  <div className="modules-grid">
                    <div className="module-item">
                      <span className="mod-num">Module 1</span>
                      <strong>Advanced Infrastructure Design</strong>
                      <p>Enterprise cabling topology, campus design, backbone capacity planning</p>
                    </div>
                    <div className="module-item">
                      <span className="mod-num">Module 2</span>
                      <strong>Data Centre Infrastructure</strong>
                      <p>TIA-942 Tier I-IV, Uptime Institute, ToR/EoR, pre-terminated cabling</p>
                    </div>
                    <div className="module-item">
                      <span className="mod-num">Module 3</span>
                      <strong>Smart Building Infrastructure</strong>
                      <p>BACnet, KNX, DALI, PoE lighting design, IoT cabling, BMS integration</p>
                    </div>
                    <div className="module-item">
                      <span className="mod-num">Module 4</span>
                      <strong>Advanced Standards DeepDive</strong>
                      <p>ISO/IEC 14763, NFPA 75/76, Estidama Pearl, Dubai Green Building Regs, TIA-942-B</p>
                    </div>
                    <div className="module-item">
                      <span className="mod-num">Module 5</span>
                      <strong>Specification Writing</strong>
                      <p>NBS/CSI MasterFormat Division 27, BOQ preparation, submittal documentation</p>
                    </div>
                    <div className="module-item">
                      <span className="mod-num">Module 6</span>
                      <strong>UAE Project Delivery</strong>
                      <p>Dubai Municipality approvals, TRAKHEES submissions, O&amp;M manuals</p>
                    </div>
                    <div className="module-item">
                      <span className="mod-num">Module 7</span>
                      <strong>Infrastructure Auditing</strong>
                      <p>Existing infrastructure assessment, upgrade planning, as-built survey</p>
                    </div>
                    <div className="module-item">
                      <span className="mod-num">Module 8</span>
                      <strong>Consulting &amp; Business Skills</strong>
                      <p>Client needs analysis, ROI calculation, proposal writing</p>
                    </div>
                  </div>
                </div>
                <div className="cert-card-actions">
                  <button
                    type="button"
                    className="aca-cert-enroll-btn"
                    onClick={() => handleOpenEnroll('ACPIS Level 3 — Passive Infrastructure Expert & Designer', '5 days')}
                  >
                    <i className="fas fa-graduation-cap"></i> Enroll in ACPIS Level 3
                  </button>
                  <a
                    href="https://wa.me/971526387275?text=Hello%20ADORN%20Academy%2C%20I%20would%20like%20to%20inquire%20about%20ACPIS%20Level%203"
                    className="aca-cert-wa-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-whatsapp"></i> Inquire
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* ════ ACSIS Track ════ */}
          {activeCertTab === 'acsis' && (
            <div className="cert-domain-block">
              <div className="domain-intro">
                <h3>ACSIS — ADORN Certified System Integration Specialist</h3>
                <p>Focused on Extra Low Voltage (ELV), CCTV Surveillance, Access Control, SIRA Approvals, and Multi-system Integration.</p>
              </div>

              {/* ACSIS Level 1 */}
              <div className="cert-card">
                <div className="cert-card-top">
                  <div>
                    <span className="cert-level-pill">Level 1 &bull; Foundation</span>
                    <h4>ACSIS Level 1 — System Integration Foundation</h4>
                    <p className="cert-tagline">&ldquo;Your first step into the world of ELV and system integration.&rdquo;</p>
                  </div>
                  <div className="cert-badge-visual">
                    <span className="cb-code">ACSIS-F</span>
                    <span className="cb-lvl">LEVEL 1</span>
                  </div>
                </div>

                <div className="cert-details-grid">
                  <div className="cd-item"><strong>Target Audience:</strong><span>Technicians, junior engineers, IT support staff entering ELV/security systems</span></div>
                  <div className="cd-item"><strong>Prerequisites:</strong><span>None</span></div>
                  <div className="cd-item"><strong>Training Duration:</strong><span>3 days classroom / 24 hours self-paced</span></div>
                  <div className="cd-item"><strong>Exam Format:</strong><span>60 multiple-choice questions</span></div>
                  <div className="cd-item"><strong>Exam Duration:</strong><span>90 minutes</span></div>
                  <div className="cd-item"><strong>Passing Score:</strong><span>70%</span></div>
                  <div className="cd-item"><strong>Certificate Validity:</strong><span>3 years</span></div>
                </div>

                <div className="curriculum-wrap">
                  <h5><i className="fas fa-list-ol"></i> Curriculum Modules (7 Modules)</h5>
                  <div className="modules-grid">
                    <div className="module-item">
                      <span className="mod-num">Module 1</span>
                      <strong>Introduction to System Integration</strong>
                      <p>ELV categories, the SI’s role, UAE SI market overview</p>
                    </div>
                    <div className="module-item">
                      <span className="mod-num">Module 2</span>
                      <strong>UAE Regulatory Framework for ELV</strong>
                      <p>SIRA structure, Dubai Civil Defense, Trakhees, Abu Dhabi requirements</p>
                    </div>
                    <div className="module-item">
                      <span className="mod-num">Module 3</span>
                      <strong>CCTV &amp; Video Surveillance</strong>
                      <p>IP cameras, resolution, NVR/DVR basics, storage calculation, SIRA regulations</p>
                    </div>
                    <div className="module-item">
                      <span className="mod-num">Module 4</span>
                      <strong>Access Control Fundamentals</strong>
                      <p>Components, readers, controllers, RFID/biometric/PIN, UAE requirements</p>
                    </div>
                    <div className="module-item">
                      <span className="mod-num">Module 5</span>
                      <strong>ELV Cabling Infrastructure</strong>
                      <p>Cable types for CCTV/access control/intercom, conduit and tray specifications</p>
                    </div>
                    <div className="module-item">
                      <span className="mod-num">Module 6</span>
                      <strong>ELV Power &amp; Earthing</strong>
                      <p>DC power supplies, UPS basics, earthing requirements, PoE for ELV</p>
                    </div>
                    <div className="module-item">
                      <span className="mod-num">Module 7</span>
                      <strong>Site Practices &amp; Documentation</strong>
                      <p>Site survey, ELV installation, labeling, testing, as-built documentation</p>
                    </div>
                  </div>
                </div>
                <div className="cert-card-actions">
                  <button
                    type="button"
                    className="aca-cert-enroll-btn"
                    onClick={() => handleOpenEnroll('ACSIS Level 1 — ELV & Security Systems Foundation', '3 days')}
                  >
                    <i className="fas fa-graduation-cap"></i> Enroll in ACSIS Level 1
                  </button>
                  <a
                    href="https://wa.me/971526387275?text=Hello%20ADORN%20Academy%2C%20I%20would%20like%20to%20inquire%20about%20ACSIS%20Level%201"
                    className="aca-cert-wa-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-whatsapp"></i> Inquire
                  </a>
                </div>
              </div>

              {/* ACSIS Level 2 */}
              <div className="cert-card">
                <div className="cert-card-top">
                  <div>
                    <span className="cert-level-pill pill-inter">Level 2 &bull; Professional</span>
                    <h4>ACSIS Level 2 — System Integration Professional</h4>
                    <p className="cert-tagline">&ldquo;From installer to integrator &mdash; design, commission, and deliver complete ELV systems.&rdquo;</p>
                  </div>
                  <div className="cert-badge-visual cb-blue">
                    <span className="cb-code">ACSIS-P</span>
                    <span className="cb-lvl">LEVEL 2</span>
                  </div>
                </div>

                <div className="cert-details-grid">
                  <div className="cd-item"><strong>Target Audience:</strong><span>System integrators, project engineers, site supervisors (2+ years ELV experience)</span></div>
                  <div className="cd-item"><strong>Prerequisites:</strong><span>ACSIS Level 1 OR 3 years demonstrated ELV experience</span></div>
                  <div className="cd-item"><strong>Training Duration:</strong><span>5 days classroom / 40 hours self-paced</span></div>
                  <div className="cd-item"><strong>Exam Format:</strong><span>75 MCQ + 1 practical assessment (system design)</span></div>
                  <div className="cd-item"><strong>Exam Duration:</strong><span>3.5 hours</span></div>
                  <div className="cd-item"><strong>Passing Score:</strong><span>75% written + satisfactory practical</span></div>
                  <div className="cd-item"><strong>Certificate Validity:</strong><span>3 years</span></div>
                </div>

                <div className="curriculum-wrap">
                  <h5><i className="fas fa-list-ol"></i> Curriculum Modules (7 Modules)</h5>
                  <div className="modules-grid">
                    <div className="module-item">
                      <span className="mod-num">Module 1</span>
                      <strong>Advanced CCTV System Design</strong>
                      <p>IP CCTV network design, bandwidth/storage calc, VMS, video analytics, SIRA approval</p>
                    </div>
                    <div className="module-item">
                      <span className="mod-num">Module 2</span>
                      <strong>Advanced Access Control</strong>
                      <p>Enterprise architecture, multi-site integration, biometric systems, SIRA licensing</p>
                    </div>
                    <div className="module-item">
                      <span className="mod-num">Module 3</span>
                      <strong>Integrated Building Systems</strong>
                      <p>BMS, fire alarm integration, nurse call, PA/VA, intercom, GRMS, BACnet/Modbus/OPC-UA</p>
                    </div>
                    <div className="module-item">
                      <span className="mod-num">Module 4</span>
                      <strong>Networking for System Integration</strong>
                      <p>CCTV network design, VLANs, PoE switch selection, fiber backbone</p>
                    </div>
                    <div className="module-item">
                      <span className="mod-num">Module 5</span>
                      <strong>ELV Cybersecurity Basics</strong>
                      <p>IP camera security, network segmentation, UAE Cybersecurity Council guidelines</p>
                    </div>
                    <div className="module-item">
                      <span className="mod-num">Module 6</span>
                      <strong>Project Execution</strong>
                      <p>Shop drawings, submittal management, testing/commissioning, system handover</p>
                    </div>
                    <div className="module-item">
                      <span className="mod-num">Module 7</span>
                      <strong>UAE ELV Project Delivery</strong>
                      <p>SIRA submission, Civil Defense NOC, municipality approvals, certificate of completion</p>
                    </div>
                  </div>
                </div>
                <div className="cert-card-actions">
                  <button
                    type="button"
                    className="aca-cert-enroll-btn"
                    onClick={() => handleOpenEnroll('ACSIS Level 2 — System Integration Professional', '5 days')}
                  >
                    <i className="fas fa-graduation-cap"></i> Enroll in ACSIS Level 2
                  </button>
                  <a
                    href="https://wa.me/971526387275?text=Hello%20ADORN%20Academy%2C%20I%20would%20like%20to%20inquire%20about%20ACSIS%20Level%202"
                    className="aca-cert-wa-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-whatsapp"></i> Inquire
                  </a>
                </div>
              </div>

              {/* ACSIS Level 3 */}
              <div className="cert-card cert-card-expert">
                <div className="cert-card-top">
                  <div>
                    <span className="cert-level-pill pill-expert">Level 3 &bull; Expert</span>
                    <h4>ACSIS Level 3 — System Integration Expert</h4>
                    <p className="cert-tagline">&ldquo;Define complex systems. Lead integration at scale. Shape the built environment.&rdquo;</p>
                  </div>
                  <div className="cert-badge-visual cb-gold">
                    <span className="cb-code">ACSIS-E</span>
                    <span className="cb-lvl">LEVEL 3</span>
                  </div>
                </div>

                <div className="cert-details-grid">
                  <div className="cd-item"><strong>Target Audience:</strong><span>Senior SI engineers, design consultants, project managers, technical directors</span></div>
                  <div className="cd-item"><strong>Prerequisites:</strong><span>ACSIS Level 2 OR 7 years demonstrated ELV/SI experience</span></div>
                  <div className="cd-item"><strong>Training Duration:</strong><span>7 days classroom / 56 hours self-paced</span></div>
                  <div className="cd-item"><strong>Exam Format:</strong><span>90 MCQ + full system design project</span></div>
                  <div className="cd-item"><strong>Exam Duration:</strong><span>5 hours</span></div>
                  <div className="cd-item"><strong>Passing Score:</strong><span>80% written + design project pass</span></div>
                  <div className="cd-item"><strong>Certificate Validity:</strong><span>3 years</span></div>
                </div>

                <div className="curriculum-wrap">
                  <h5><i className="fas fa-list-ol"></i> Curriculum Modules (7 Modules)</h5>
                  <div className="modules-grid">
                    <div className="module-item">
                      <span className="mod-num">Module 1</span>
                      <strong>Complex System Design</strong>
                      <p>Multi-system integration architecture, PSIM, integrated command and control centres</p>
                    </div>
                    <div className="module-item">
                      <span className="mod-num">Module 2</span>
                      <strong>Sector-Specific Systems</strong>
                      <p>Airport ELV, hospital ELV (JCIA/DHA), data centre security, government secure facilities</p>
                    </div>
                    <div className="module-item">
                      <span className="mod-num">Module 3</span>
                      <strong>Advanced Standards &amp; Compliance</strong>
                      <p>SIRA regulations, IEC 62676, IEC 60839, ISO 50001, ISO/IEC 27001 physical security</p>
                    </div>
                    <div className="module-item">
                      <span className="mod-num">Module 4</span>
                      <strong>Smart City ELV Infrastructure</strong>
                      <p>Traffic management, public safety cabling, smart street lighting, fiber city backbone</p>
                    </div>
                    <div className="module-item">
                      <span className="mod-num">Module 5</span>
                      <strong>System Design Leadership</strong>
                      <p>Client requirements, ELV masterplan design, vendor evaluation, value engineering</p>
                    </div>
                    <div className="module-item">
                      <span className="mod-num">Module 6</span>
                      <strong>Advanced Project Management</strong>
                      <p>Contract management, change orders, risk management, international delivery</p>
                    </div>
                    <div className="module-item">
                      <span className="mod-num">Module 7</span>
                      <strong>Business Development</strong>
                      <p>ELV proposal writing, ROI justification, executive-level presentations</p>
                    </div>
                  </div>
                </div>
                <div className="cert-card-actions">
                  <button
                    type="button"
                    className="aca-cert-enroll-btn"
                    onClick={() => handleOpenEnroll('ACSIS Level 3 — Master System Integrator & Lead Engineer', '7 days')}
                  >
                    <i className="fas fa-graduation-cap"></i> Enroll in ACSIS Level 3
                  </button>
                  <a
                    href="https://wa.me/971526387275?text=Hello%20ADORN%20Academy%2C%20I%20would%20like%20to%20inquire%20about%20ACSIS%20Level%203"
                    className="aca-cert-wa-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-whatsapp"></i> Inquire
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Master Comparison Matrix */}
          <div className="cert-matrix-wrap">
            <div className="matrix-head">
              <h3><i className="fas fa-table"></i> Certification Comparison Table</h3>
              <p>Direct comparison of duration, exam requirements, passing scores, and professional mapping</p>
            </div>
            <div className="matrix-table-container">
              <table className="matrix-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th className="th-acpis">ACPIS L1</th>
                    <th className="th-acpis">ACPIS L2</th>
                    <th className="th-acpis">ACPIS L3</th>
                    <th className="th-acsis">ACSIS L1</th>
                    <th className="th-acsis">ACSIS L2</th>
                    <th className="th-acsis">ACSIS L3</th>
                  </tr>
                </thead>
                <tbody>
                  {CERT_COMPARISON.map((row, i) => (
                    <tr key={i}>
                      <td><strong>{row.feature}</strong></td>
                      <td>{row.acpis1}</td>
                      <td>{row.acpis2}</td>
                      <td>{row.acpis3}</td>
                      <td>{row.acsis1}</td>
                      <td>{row.acsis2}</td>
                      <td>{row.acsis3}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Academy CTA Banner */}
      <div className="container">
        <div className="aca-cta-banner">
          <div className="aca-cta-content">
            <h3>Ready to Advance Your Infrastructure Career?</h3>
            <p>Join cohorts in Dubai or enroll in our self-paced online certification track. Corporate training packages available for system integrators and contracting teams.</p>
          </div>
          <div className="aca-cta-actions">
            <a href="https://wa.me/971526387275?text=Hello%20ADORN%20Academy%2C%20I%20would%20like%20to%20enroll%20in%20a%20certification%20program" className="hero-btn hero-btn-primary" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i> Inquire on WhatsApp
            </a>
            <Link to="/portfolio" className="hero-btn hero-btn-outline">
              <i className="fas fa-layer-group"></i> Explore Portfolio
            </Link>
          </div>
        </div>
      </div>

      {/* Dubai Course Registration Modal */}
      {enrollModalOpen && (
        <div className="enr-modal-backdrop" onClick={handleCloseEnroll}>
          <div className="enr-modal-card" onClick={e => e.stopPropagation()}>
            <div className="enr-modal-header">
              <div className="emh-left">
                <span className="emh-badge">
                  <i className="fas fa-map-marker-alt"></i> Dubai Training Center &bull; JLT Campus
                </span>
                <h3>Course Registration</h3>
                <p className="emh-sub">Register your seat for accredited ADORN Academy technical training in Dubai.</p>
              </div>
              <button type="button" className="enr-close-btn" onClick={handleCloseEnroll} aria-label="Close">
                <i className="fas fa-times"></i>
              </button>
            </div>

            {successData ? (
              <div className="enr-success-view">
                <div className="esv-icon"><i className="fas fa-check-circle"></i></div>
                <h4>Registration Received!</h4>
                <div className="esv-ref">
                  <span>Reference ID:</span>
                  <strong>{successData.id}</strong>
                </div>
                <p className="esv-msg">
                  Thank you, <strong>{successData.fullName}</strong>. Your registration for <strong>{successData.courseName}</strong> ({successData.emirate}) has been submitted successfully to the ADORN Academy Dubai admissions desk.
                </p>
                <div className="esv-details-box">
                  <div className="esv-item"><span>Training Mode:</span> <strong>{successData.trainingMode}</strong></div>
                  <div className="esv-item"><span>Preferred Batch:</span> <strong>{successData.preferredBatch}</strong></div>
                  <div className="esv-item"><span>Email:</span> <strong>{successData.email}</strong></div>
                  <div className="esv-item"><span>WhatsApp / Phone:</span> <strong>{successData.phone}</strong></div>
                </div>
                <p className="esv-note">
                  Our admissions coordinator will contact you with batch dates, venue directions (JLT, Dubai), and seat confirmation.
                </p>
                <div className="esv-actions">
                  <a
                    href={`https://wa.me/971526387275?text=${encodeURIComponent(`Hello ADORN Academy, I have registered for ${successData.courseName} (Ref: ${successData.id}). Please confirm my seat and schedule.`)}`}
                    className="btn btn-whatsapp"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-whatsapp"></i> Chat on WhatsApp
                  </a>
                  <button type="button" className="btn btn-outline" onClick={handleCloseEnroll}>
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form className="enr-form" onSubmit={handleSubmitEnroll}>
                <div className="enr-modal-body">
                  {errorMsg && (
                    <div className="enr-alert enr-alert-error">
                      <i className="fas fa-exclamation-triangle"></i> {errorMsg}
                    </div>
                  )}

                  {/* Course Selection Block */}
                  <div className="enr-course-banner">
                    <div className="ecb-icon"><i className="fas fa-book-reader"></i></div>
                    <div className="ecb-info">
                      <label>Selected Course / Program</label>
                      <select
                        value={selectedCourse}
                        onChange={e => setSelectedCourse(e.target.value)}
                        className="enr-select-course"
                      >
                        {ALL_COURSES.map((cn, i) => (
                          <option key={i} value={cn}>{cn}</option>
                        ))}
                      </select>
                      {courseDuration && <span className="ecb-dur"><i className="far fa-clock"></i> Duration: {courseDuration}</span>}
                    </div>
                  </div>

                  <div className="enr-grid">
                    <div className="enr-field">
                      <label>Full Name <span className="req">*</span></label>
                      <div className="enr-input-icon">
                        <i className="fas fa-user"></i>
                        <input
                          type="text"
                          name="fullName"
                          placeholder="e.g. Tariq Mansoor"
                          value={form.fullName}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="enr-field">
                      <label>Email Address <span className="req">*</span></label>
                      <div className="enr-input-icon">
                        <i className="fas fa-envelope"></i>
                        <input
                          type="email"
                          name="email"
                          placeholder="tariq@company.ae"
                          value={form.email}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="enr-field">
                      <label>WhatsApp / Mobile Number <span className="req">*</span></label>
                      <div className="enr-input-icon">
                        <i className="fab fa-whatsapp"></i>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="+971 50 123 4567"
                          value={form.phone}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                      <span className="field-hint">UAE &amp; GCC mobile number with country code</span>
                    </div>

                    <div className="enr-field">
                      <label>Emirate / Location in UAE <span className="req">*</span></label>
                      <div className="enr-input-icon">
                        <i className="fas fa-map-marker-alt"></i>
                        <select name="emirate" value={form.emirate} onChange={handleFormChange}>
                          {UAE_EMIRATES.map((em, i) => (
                            <option key={i} value={em}>{em}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="enr-field">
                      <label>Company / Sponsoring Organization</label>
                      <div className="enr-input-icon">
                        <i className="fas fa-building"></i>
                        <input
                          type="text"
                          name="company"
                          placeholder="e.g. Gulf Telecom / Self-Sponsored"
                          value={form.company}
                          onChange={handleFormChange}
                        />
                      </div>
                    </div>

                    <div className="enr-field">
                      <label>Professional Role / Designation</label>
                      <div className="enr-input-icon">
                        <i className="fas fa-id-badge"></i>
                        <select name="designation" value={form.designation} onChange={handleFormChange}>
                          {PROFESSIONAL_ROLES.map((r, i) => (
                            <option key={i} value={r}>{r}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="enr-field">
                      <label>Preferred Training Mode</label>
                      <div className="enr-radio-group">
                        <label className={`enr-radio-card ${form.trainingMode === 'In-Person Dubai Lab' ? 'checked' : ''}`}>
                          <input
                            type="radio"
                            name="trainingMode"
                            value="In-Person Dubai Lab"
                            checked={form.trainingMode === 'In-Person Dubai Lab'}
                            onChange={handleFormChange}
                          />
                          <i className="fas fa-chalkboard-teacher"></i>
                          <div>
                            <strong>In-Person Dubai Lab</strong>
                            <span>JLT Campus, Dubai</span>
                          </div>
                        </label>
                        <label className={`enr-radio-card ${form.trainingMode === 'Live Online Classroom' ? 'checked' : ''}`}>
                          <input
                            type="radio"
                            name="trainingMode"
                            value="Live Online Classroom"
                            checked={form.trainingMode === 'Live Online Classroom'}
                            onChange={handleFormChange}
                          />
                          <i className="fas fa-laptop"></i>
                          <div>
                            <strong>Live Online Classroom</strong>
                            <span>Interactive Virtual Lab</span>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="enr-field">
                      <label>Preferred Batch Schedule</label>
                      <div className="enr-input-icon">
                        <i className="far fa-calendar-alt"></i>
                        <select name="preferredBatch" value={form.preferredBatch} onChange={handleFormChange}>
                          <option value="Weekend Batch (Saturday & Sunday)">Weekend Batch (Saturday &amp; Sunday, 9 AM – 5 PM)</option>
                          <option value="Weekday Evening (Mon – Thu)">Weekday Evening (Mon – Thu, 7 PM – 9:30 PM GST)</option>
                          <option value="Intensive Weekday Daytime">Intensive Weekday Daytime (Mon – Wed, 9 AM – 4 PM)</option>
                        </select>
                      </div>
                    </div>

                    <div className="enr-field full-col">
                      <label>SIRA / TDRA License or Emirates ID (Optional)</label>
                      <div className="enr-input-icon">
                        <i className="fas fa-shield-alt"></i>
                        <input
                          type="text"
                          name="siraLicense"
                          placeholder="Optional — for UAE certified installer registry credits"
                          value={form.siraLicense}
                          onChange={handleFormChange}
                        />
                      </div>
                    </div>

                    <div className="enr-field full-col">
                      <label>Notes / Project Requirements (Optional)</label>
                      <textarea
                        name="notes"
                        rows="2"
                        placeholder="Any specific project requirements, corporate team booking, or dietary requests..."
                        value={form.notes}
                        onChange={handleFormChange}
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="enr-modal-footer">
                  <div className="enr-footer-trust">
                    <i className="fas fa-shield-alt"></i>
                    <span>Official ADORN Academy Registry &bull; Dubai, UAE</span>
                  </div>
                  <div className="enr-footer-btns">
                    <button type="button" className="btn btn-outline" onClick={handleCloseEnroll} disabled={submitting}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary enr-submit-btn" disabled={submitting}>
                      {submitting ? (
                        <>
                          <i className="fas fa-spinner fa-spin"></i> Submitting...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane"></i> Complete Registration
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

