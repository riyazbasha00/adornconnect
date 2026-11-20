import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import './PrivacyPolicy.css';

const SECTIONS = [
  { id: 'who-we-are', title: '1. Who We Are', icon: 'fas fa-building' },
  { id: 'information-we-collect', title: '2. Information We Collect', icon: 'fas fa-database' },
  { id: 'forms-and-whatsapp', title: '3. Forms & WhatsApp Links', icon: 'fab fa-whatsapp' },
  { id: 'legal-basis', title: '4. Legal Basis & Compliance', icon: 'fas fa-balance-scale' },
  { id: 'how-we-use-information', title: '5. How We Use Information', icon: 'fas fa-tasks' },
  { id: 'cookies-analytics-advertising', title: '6. Cookies, Analytics & Advertising', icon: 'fas fa-cookie-bite' },
  { id: 'sharing-information', title: '7. Sharing Your Information', icon: 'fas fa-share-alt' },
  { id: 'international-transfers', title: '8. International Transfers', icon: 'fas fa-globe-americas' },
  { id: 'data-security', title: '9. Data Security', icon: 'fas fa-shield-alt' },
  { id: 'third-party-services', title: '10. Third-Party Services & Links', icon: 'fas fa-external-link-alt' },
  { id: 'data-retention', title: '11. Data Retention', icon: 'fas fa-history' },
  { id: 'your-privacy-rights', title: '12. Your Privacy Rights', icon: 'fas fa-user-check' },
  { id: 'childrens-privacy', title: '13. Children\'s Privacy', icon: 'fas fa-child' },
  { id: 'changes-to-policy', title: '14. Changes to This Policy', icon: 'fas fa-file-signature' },
  { id: 'contact-us', title: '15. Contact Us', icon: 'fas fa-headset' },
];

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState('who-we-are');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Privacy Policy for Adorn Information Technology Systems LLC (ADORN). Learn what personal information we collect, how we use and protect it, and your privacy rights under UAE law."
        url="/privacy"
      />

      {/* Hero Header */}
      <section className="priv-hero">
        <div className="container">
          <div className="priv-hero-inner">
            <span className="priv-badge">
              <i className="fas fa-shield-alt"></i> Legal & Data Privacy
            </span>
            <h1>Privacy <span className="hl">Policy</span></h1>
            <p className="priv-hero-desc">
              Your privacy matters to us. This policy explains how Adorn Information Technology Systems LLC collects, protects, and handles your personal data.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="priv-layout">
        <div className="container priv-grid">
          {/* Sticky Table of Contents Sidebar */}
          <aside className="priv-sidebar">
            <div className="priv-sidebar-box">
              <div className="priv-sidebar-head">
                <i className="fas fa-list-ul"></i>
                <span>Table of Contents</span>
              </div>
              <nav className="priv-sidebar-nav" aria-label="Privacy Policy Sections">
                {SECTIONS.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={(e) => scrollToSection(e, sec.id)}
                    className={`priv-nav-link ${activeSection === sec.id ? 'active' : ''}`}
                  >
                    <i className={sec.icon}></i>
                    <span>{sec.title}</span>
                  </a>
                ))}
              </nav>

              <div className="priv-sidebar-contact">
                <div className="priv-sc-icon">
                  <i className="fas fa-headset"></i>
                </div>
                <h5>Questions?</h5>
                <p>Reach out directly to our privacy officer or compliance desk.</p>
                <a href="mailto:info@adorn.ae" className="priv-sc-btn">
                  <i className="fas fa-envelope"></i> info@adorn.ae
                </a>
              </div>
            </div>
          </aside>

          {/* Main Privacy Body */}
          <article className="priv-content">
            {/* Section 1 */}
            <section id="who-we-are" className="priv-block">
              <div className="priv-block-header">
                <div className="priv-block-icon">
                  <i className="fas fa-building"></i>
                </div>
                <div>
                  <span className="priv-section-tag">Section 1</span>
                  <h2>Who we are</h2>
                </div>
              </div>

              <div className="priv-block-body">
                <p>
                  Welcome to <strong>ADORN</strong>. The website{' '}
                  <a href="https://adornconnect.com" target="_blank" rel="noopener noreferrer" className="priv-inline-link">
                    https://adornconnect.com
                  </a>{' '}
                  is operated by <strong>Adorn Information Technology Systems LLC</strong> (&ldquo;ADORN&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), a company based in Dubai, United Arab Emirates.
                </p>
                <p>
                  ADORN is a UAE-based brand of structured cabling, fiber optic, network cabinet, surveillance, access control and ELV infrastructure products. We also share technical knowledge with installers, contractors, system integrators and consultants.
                </p>
                <p>
                  Your privacy matters to us. This Privacy Policy explains what personal information we collect when you visit adornconnect.com, how we use and protect it, and the choices you have. By using our website you acknowledge this policy. Where the law requires your consent, we ask for it separately.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section id="information-we-collect" className="priv-block">
              <div className="priv-block-header">
                <div className="priv-block-icon">
                  <i className="fas fa-database"></i>
                </div>
                <div>
                  <span className="priv-section-tag">Section 2</span>
                  <h2>Information we collect</h2>
                </div>
              </div>

              <div className="priv-block-body">
                <p className="priv-lead">
                  We collect only what we need to respond to you and to run the website.
                </p>

                <div className="priv-card">
                  <h3>
                    <i className="fas fa-user-edit"></i> Information you give us
                  </h3>
                  <p>When you contact us, ask about a product, apply to our Partner Program or ask to receive updates, you may give us:</p>
                  <ul className="priv-bullet-list">
                    <li><strong>Your full name</strong></li>
                    <li><strong>Your phone number</strong>, including your WhatsApp number</li>
                    <li><strong>Your email address</strong></li>
                    <li><strong>The type of enquiry or partnership</strong> you are interested in</li>
                    <li><strong>Anything else you choose to write</strong>, such as your company, your project or the products you need</li>
                  </ul>
                  <div className="priv-callout priv-callout-info">
                    <i className="fas fa-info-circle"></i>
                    <div>
                      <strong>No Payments or Accounts:</strong> This website does not currently take online payments or offer customer accounts, so we do not collect payment card details or passwords from visitors.
                    </div>
                  </div>
                </div>

                <div className="priv-card">
                  <h3>
                    <i className="fas fa-server"></i> Information collected automatically
                  </h3>
                  <p>When you visit the website, our servers and hosting providers may automatically record:</p>
                  <ul className="priv-bullet-list">
                    <li>Your IP address</li>
                    <li>Browser type and version</li>
                    <li>Device type and operating system</li>
                    <li>Pages visited, and the date and time of each visit</li>
                    <li>The page or campaign link you came from, for example an advertisement</li>
                  </ul>
                  <p className="priv-subtext">
                    This helps us keep the website secure, make sure it works properly and see which pages are useful.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="forms-and-whatsapp" className="priv-block">
              <div className="priv-block-header">
                <div className="priv-block-icon priv-icon-wa">
                  <i className="fab fa-whatsapp"></i>
                </div>
                <div>
                  <span className="priv-section-tag">Section 3</span>
                  <h2>How our forms and WhatsApp links work</h2>
                </div>
              </div>

              <div className="priv-block-body">
                <p className="priv-lead">
                  Most contact features on this website open WhatsApp instead of saving your details on our website.
                </p>

                <div className="priv-features-grid">
                  <div className="priv-feature-item">
                    <div className="priv-feature-icon">
                      <i className="fas fa-file-signature"></i>
                    </div>
                    <div>
                      <h4>Contact form and Partner Application form</h4>
                      <p>The details you type are placed in a pre-filled WhatsApp message addressed to our team. Nothing reaches us until you press send in WhatsApp.</p>
                    </div>
                  </div>

                  <div className="priv-feature-item">
                    <div className="priv-feature-icon">
                      <i className="fab fa-whatsapp"></i>
                    </div>
                    <div>
                      <h4>WhatsApp buttons</h4>
                      <p>(&ldquo;Chat on WhatsApp&rdquo;, &ldquo;Become a Partner&rdquo;, &ldquo;Enquire on WhatsApp&rdquo;). These open a chat with our business number, <a href="tel:+971526387275" className="priv-tel-link"><strong>+971 52 638 7275</strong></a>. Your phone number, profile name and messages are then handled by WhatsApp and are visible to us.</p>
                    </div>
                  </div>

                  <div className="priv-feature-item">
                    <div className="priv-feature-icon">
                      <i className="fas fa-boxes"></i>
                    </div>
                    <div>
                      <h4>Product enquiries</h4>
                      <p>The &ldquo;Enquire on WhatsApp&rdquo; button on a product page adds that product&apos;s name and SKU to your message.</p>
                    </div>
                  </div>

                  <div className="priv-feature-item">
                    <div className="priv-feature-icon">
                      <i className="fas fa-paper-plane"></i>
                    </div>
                    <div>
                      <h4>Updates by email</h4>
                      <p>If you enter your email address in the &ldquo;Stay in the Loop&rdquo; box, we use it to send you updates, offers and industry news. You can unsubscribe at any time.</p>
                    </div>
                  </div>
                </div>

                <div className="priv-callout priv-callout-warning">
                  <i className="fas fa-shield-alt"></i>
                  <div>
                    <strong>Third-Party Platform Notice:</strong> WhatsApp is operated by WhatsApp (part of Meta) under its own terms and privacy policy. We do not control how WhatsApp handles your data.
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section id="legal-basis" className="priv-block">
              <div className="priv-block-header">
                <div className="priv-block-icon">
                  <i className="fas fa-balance-scale"></i>
                </div>
                <div>
                  <span className="priv-section-tag">Section 4</span>
                  <h2>Legal basis and compliance</h2>
                </div>
              </div>

              <div className="priv-block-body">
                <p>
                  <strong>Adorn Information Technology Systems LLC</strong> processes personal data in line with applicable UAE data protection law, including <strong>Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data</strong>.
                </p>
                <p>Where the law requires it, we rely on one or more of the following:</p>
                <ul className="priv-bullet-list">
                  <li><strong>Your consent</strong>, for example when you send us a message or ask to receive updates</li>
                  <li><strong>Steps needed to prepare or carry out a contract</strong> with you, such as preparing a quotation</li>
                  <li><strong>Compliance with legal and regulatory obligations</strong></li>
                  <li><strong>Establishing, exercising or defending legal claims</strong></li>
                </ul>
                <p className="priv-subtext">
                  You can withdraw your consent at any time (see <a href="#your-privacy-rights" onClick={(e) => scrollToSection(e, 'your-privacy-rights')} className="priv-inline-link">&ldquo;Your privacy rights&rdquo;</a> below).
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section id="how-we-use-information" className="priv-block">
              <div className="priv-block-header">
                <div className="priv-block-icon">
                  <i className="fas fa-tasks"></i>
                </div>
                <div>
                  <span className="priv-section-tag">Section 5</span>
                  <h2>How we use your information</h2>
                </div>
              </div>

              <div className="priv-block-body">
                <p>We use the information we collect to:</p>
                <div className="priv-use-grid">
                  <div className="priv-use-card">
                    <i className="fas fa-reply"></i>
                    <span>Answer your enquiries, support requests and quotation requests</span>
                  </div>
                  <div className="priv-use-card">
                    <i className="fas fa-handshake"></i>
                    <span>Review and respond to Partner Program applications</span>
                  </div>
                  <div className="priv-use-card">
                    <i className="fas fa-book-open"></i>
                    <span>Provide product information and the technical resources on our website</span>
                  </div>
                  <div className="priv-use-card">
                    <i className="fas fa-envelope-open-text"></i>
                    <span>Send updates, offers or news, if you asked to receive them</span>
                  </div>
                  <div className="priv-use-card">
                    <i className="fas fa-user-shield"></i>
                    <span>Keep the website secure and prevent fraud or misuse</span>
                  </div>
                  <div className="priv-use-card">
                    <i className="fas fa-chart-line"></i>
                    <span>Understand which pages and products are useful, so we can improve them</span>
                  </div>
                  <div className="priv-use-card">
                    <i className="fas fa-gavel"></i>
                    <span>Meet our legal and regulatory obligations</span>
                  </div>
                </div>

                <div className="priv-callout priv-callout-success">
                  <i className="fas fa-check-circle"></i>
                  <div>
                    <strong>Our Commitment:</strong> We do not sell, rent or trade your personal data.
                  </div>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section id="cookies-analytics-advertising" className="priv-block">
              <div className="priv-block-header">
                <div className="priv-block-icon">
                  <i className="fas fa-cookie-bite"></i>
                </div>
                <div>
                  <span className="priv-section-tag">Section 6</span>
                  <h2>Cookies, analytics and advertising</h2>
                </div>
              </div>

              <div className="priv-block-body">
                <div className="priv-item-box">
                  <h4><i className="fas fa-cookie"></i> Cookies</h4>
                  <p>
                    Our website does not currently use analytics or advertising cookies or tracking pixels. It may use small amounts of browser storage that are needed for the site to work. You can block or delete cookies in your browser settings, although some features may then stop working.
                  </p>
                </div>

                <div className="priv-item-box">
                  <h4><i className="fab fa-linkedin"></i> Advertising</h4>
                  <p>
                    We promote ADORN on platforms such as LinkedIn. If you click one of our ads, that platform processes your data under its own privacy policy. A click on its own does not give us your name or profile. We only see the technical information described above, such as the campaign link you arrived from.
                  </p>
                </div>

                <div className="priv-item-box">
                  <h4><i className="fas fa-tools"></i> Future tools</h4>
                  <p>
                    If we add analytics or advertising tools, such as Google Analytics or the LinkedIn Insight Tag, we will update this policy first. Where the law requires it, we will ask for your consent before those tools run.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 7 */}
            <section id="sharing-information" className="priv-block">
              <div className="priv-block-header">
                <div className="priv-block-icon">
                  <i className="fas fa-share-alt"></i>
                </div>
                <div>
                  <span className="priv-section-tag">Section 7</span>
                  <h2>Sharing your information</h2>
                </div>
              </div>

              <div className="priv-block-body">
                <p>We share personal information only where it is needed, and only with:</p>
                <ul className="priv-bullet-list">
                  <li><strong>WhatsApp (Meta)</strong>, when you message us through the website</li>
                  <li><strong>Hosting, IT and security providers</strong> that keep the website running</li>
                  <li><strong>Delivery and logistics partners</strong>, where we fulfil an order or quotation you requested</li>
                  <li><strong>Authorised distributors or resellers</strong>, if you ask us to connect you with one</li>
                  <li><strong>Legal, accounting and audit advisers</strong></li>
                  <li><strong>Government or legal authorities</strong>, when the law requires it</li>
                </ul>
                <div className="priv-callout priv-callout-info">
                  <i className="fas fa-lock"></i>
                  <div>
                    Service providers may use your data only to work for us, under our instructions. We do not sell, rent or trade personal data to third parties.
                  </div>
                </div>
              </div>
            </section>

            {/* Section 8 */}
            <section id="international-transfers" className="priv-block">
              <div className="priv-block-header">
                <div className="priv-block-icon">
                  <i className="fas fa-globe-americas"></i>
                </div>
                <div>
                  <span className="priv-section-tag">Section 8</span>
                  <h2>International transfers</h2>
                </div>
              </div>

              <div className="priv-block-body">
                <p>
                  Some services we use, including WhatsApp, Google Fonts and the Cloudflare content delivery network, are run by companies that process data outside the UAE. Where your personal data is sent outside the UAE, this happens only as UAE law permits and with appropriate safeguards.
                </p>
              </div>
            </section>

            {/* Section 9 */}
            <section id="data-security" className="priv-block">
              <div className="priv-block-header">
                <div className="priv-block-icon">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <div>
                  <span className="priv-section-tag">Section 9</span>
                  <h2>Data security</h2>
                </div>
              </div>

              <div className="priv-block-body">
                <p>
                  We use technical and organisational measures to protect your personal information from unauthorised access, disclosure or misuse. These include encrypted (HTTPS) connections to the website and restricting access to our administration area to authorised staff.
                </p>
                <div className="priv-callout priv-callout-warning">
                  <i className="fas fa-exclamation-triangle"></i>
                  <div>
                    No method of transmission over the internet or electronic storage is completely secure, so we cannot guarantee absolute security.
                  </div>
                </div>
              </div>
            </section>

            {/* Section 10 */}
            <section id="third-party-services" className="priv-block">
              <div className="priv-block-header">
                <div className="priv-block-icon">
                  <i className="fas fa-external-link-alt"></i>
                </div>
                <div>
                  <span className="priv-section-tag">Section 10</span>
                  <h2>Third-party services and links</h2>
                </div>
              </div>

              <div className="priv-block-body">
                <ul className="priv-bullet-list">
                  <li>
                    <strong>Fonts and icons.</strong> Our pages load fonts from Google Fonts and icons from the Cloudflare cdnjs library. To deliver those files, these providers receive your IP address and browser details.
                  </li>
                  <li>
                    <strong>WhatsApp.</strong> See &ldquo;How our forms and WhatsApp links work&rdquo; above.
                  </li>
                  <li>
                    <strong>Social media.</strong> Our website links to our profiles on Facebook, Instagram, LinkedIn and YouTube. Those platforms collect data under their own policies.
                  </li>
                </ul>
                <p className="priv-subtext">
                  ADORN is not responsible for the privacy practices or content of third-party websites and services. We encourage you to read their privacy policies before you share personal information with them.
                </p>
              </div>
            </section>

            {/* Section 11 */}
            <section id="data-retention" className="priv-block">
              <div className="priv-block-header">
                <div className="priv-block-icon">
                  <i className="fas fa-history"></i>
                </div>
                <div>
                  <span className="priv-section-tag">Section 11</span>
                  <h2>Data retention</h2>
                </div>
              </div>

              <div className="priv-block-body">
                <p>We keep personal information only as long as necessary to:</p>
                <ul className="priv-bullet-list">
                  <li>Handle your enquiry or request and follow up with you</li>
                  <li>Meet our legal and regulatory obligations</li>
                  <li>Resolve disputes and enforce our agreements</li>
                </ul>
                <p>
                  If you asked to receive updates, we keep your email address until you unsubscribe. When information is no longer needed, we securely delete or anonymise it.
                </p>
              </div>
            </section>

            {/* Section 12 */}
            <section id="your-privacy-rights" className="priv-block">
              <div className="priv-block-header">
                <div className="priv-block-icon">
                  <i className="fas fa-user-check"></i>
                </div>
                <div>
                  <span className="priv-section-tag">Section 12</span>
                  <h2>Your privacy rights</h2>
                </div>
              </div>

              <div className="priv-block-body">
                <p>Depending on applicable law, you may have the right to:</p>
                <div className="priv-rights-list">
                  <div className="priv-right-row">
                    <i className="fas fa-search"></i>
                    <span>Ask for access to the personal data we hold about you</span>
                  </div>
                  <div className="priv-right-row">
                    <i className="fas fa-edit"></i>
                    <span>Ask us to correct inaccurate information</span>
                  </div>
                  <div className="priv-right-row">
                    <i className="fas fa-trash-alt"></i>
                    <span>Ask us to delete your data</span>
                  </div>
                  <div className="priv-right-row">
                    <i className="fas fa-ban"></i>
                    <span>Ask us to restrict, or object to, certain processing</span>
                  </div>
                  <div className="priv-right-row">
                    <i className="fas fa-file-export"></i>
                    <span>Ask for a copy of your data in a portable format</span>
                  </div>
                  <div className="priv-right-row">
                    <i className="fas fa-undo"></i>
                    <span>Withdraw your consent at any time, without affecting processing already done</span>
                  </div>
                  <div className="priv-right-row">
                    <i className="fas fa-bell-slash"></i>
                    <span>Stop marketing messages, by using the unsubscribe option or telling us you no longer want them</span>
                  </div>
                  <div className="priv-right-row">
                    <i className="fas fa-landmark"></i>
                    <span>Complain to the UAE Data Office</span>
                  </div>
                </div>
                <p className="priv-subtext" style={{ marginTop: '16px' }}>
                  To make a request, contact us using the details below. We may need to confirm your identity first. We will respond within a reasonable time and as the law requires.
                </p>
              </div>
            </section>

            {/* Section 13 */}
            <section id="childrens-privacy" className="priv-block">
              <div className="priv-block-header">
                <div className="priv-block-icon">
                  <i className="fas fa-child"></i>
                </div>
                <div>
                  <span className="priv-section-tag">Section 13</span>
                  <h2>Children&apos;s privacy</h2>
                </div>
              </div>

              <div className="priv-block-body">
                <p>
                  Our website and services are not intended for anyone under the age of 18. We do not knowingly collect personal data from children. If we learn that we have collected it, we will take appropriate steps to delete it.
                </p>
              </div>
            </section>

            {/* Section 14 */}
            <section id="changes-to-policy" className="priv-block">
              <div className="priv-block-header">
                <div className="priv-block-icon">
                  <i className="fas fa-file-signature"></i>
                </div>
                <div>
                  <span className="priv-section-tag">Section 14</span>
                  <h2>Changes to this policy</h2>
                </div>
              </div>

              <div className="priv-block-body">
                <p>
                  We may update this Privacy Policy from time to time. Any update will be posted on this page with a revised &ldquo;Last Updated&rdquo; date. If we make a significant change, we will make it clearly visible on the website.
                </p>
              </div>
            </section>

            {/* Section 15 */}
            <section id="contact-us" className="priv-block priv-block-contact">
              <div className="priv-block-header">
                <div className="priv-block-icon priv-icon-contact">
                  <i className="fas fa-headset"></i>
                </div>
                <div>
                  <span className="priv-section-tag">Section 15</span>
                  <h2>Contact us</h2>
                </div>
              </div>

              <div className="priv-block-body">
                <p>
                  If you have questions about this Privacy Policy or want to make a privacy request, contact:
                </p>
                <div className="priv-contact-card">
                  <div className="priv-contact-company">
                    <h3>Adorn Information Technology Systems LLC</h3>
                    <span className="priv-cc-badge">Data Controller &bull; Dubai, UAE</span>
                  </div>

                  <div className="priv-contact-grid">
                    <a href="mailto:info@adorn.ae" className="priv-cg-item">
                      <div className="priv-cg-icon"><i className="fas fa-envelope"></i></div>
                      <div className="priv-cg-info">
                        <span className="priv-cg-label">Email</span>
                        <span className="priv-cg-val">info@adorn.ae</span>
                      </div>
                    </a>

                    <a href="tel:+97143381499" className="priv-cg-item">
                      <div className="priv-cg-icon"><i className="fas fa-phone-alt"></i></div>
                      <div className="priv-cg-info">
                        <span className="priv-cg-label">Phone</span>
                        <span className="priv-cg-val">+971 4 338 1499</span>
                      </div>
                    </a>

                    <a
                      href="https://wa.me/971526387275"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="priv-cg-item priv-cg-wa"
                    >
                      <div className="priv-cg-icon"><i className="fab fa-whatsapp"></i></div>
                      <div className="priv-cg-info">
                        <span className="priv-cg-label">WhatsApp</span>
                        <span className="priv-cg-val">+971 52 638 7275</span>
                      </div>
                    </a>

                    <a
                      href="https://adornconnect.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="priv-cg-item"
                    >
                      <div className="priv-cg-icon"><i className="fas fa-globe"></i></div>
                      <div className="priv-cg-info">
                        <span className="priv-cg-label">Website</span>
                        <span className="priv-cg-val">https://adornconnect.com</span>
                      </div>
                    </a>

                    <div className="priv-cg-item priv-cg-full">
                      <div className="priv-cg-icon"><i className="fas fa-map-marker-alt"></i></div>
                      <div className="priv-cg-info">
                        <span className="priv-cg-label">Office Address</span>
                        <span className="priv-cg-val">
                          1405, Mazaya Business Avenue, Jumeirah Lake Towers (JLT), Dubai, United Arab Emirates
                        </span>
                      </div>
                    </div>

                    <div className="priv-cg-item priv-cg-full">
                      <div className="priv-cg-icon"><i className="far fa-clock"></i></div>
                      <div className="priv-cg-info">
                        <span className="priv-cg-label">Working Hours</span>
                        <span className="priv-cg-val">
                          Mon&ndash;Fri, 8:30 AM to 5:30 PM &bull; Sat, 9:00 AM &ndash; 3:30 PM
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="priv-back-home">
                  <Link to="/" className="priv-back-btn">
                    <i className="fas fa-arrow-left"></i> Return to Homepage
                  </Link>
                  <Link to="/support" className="priv-support-btn">
                    Visit Support Center <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </section>
          </article>
        </div>
      </section>
    </>
  );
}

