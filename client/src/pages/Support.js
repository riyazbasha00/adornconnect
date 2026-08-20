import React, { useState } from 'react';
import { SEO } from '../components/SEO';
import './Support.css';

const TECH_SUPPORT = [
  { icon: 'fas fa-box', label: 'Product Support', desc: 'Product specifications, compatibility, and datasheet assistance for all ADORN products.' },
  { icon: 'fas fa-tools', label: 'Installation Support', desc: 'Step-by-step installation guidance and best practices for structured cabling and ELV systems.' },
  { icon: 'fas fa-wrench', label: 'Troubleshooting', desc: 'Diagnostic help and solutions for connectivity, performance, and infrastructure issues.' },
  { icon: 'fas fa-certificate', label: 'Warranty', desc: 'Warranty claims, coverage details, and replacement process information.' },
  { icon: 'fas fa-question-circle', label: 'FAQs', desc: 'Answers to commonly asked questions about ADORN products and services.' },
  { icon: 'fas fa-stamp', label: 'Certificate Verification', desc: 'Verify the authenticity of ADORN product certificates and certifications.' },
];

const CONTACT_OPTIONS = [
  { icon: 'fas fa-shopping-cart', label: 'Sales Enquiry', desc: 'Pricing, availability, bulk orders, and product recommendations.', action: 'sales' },
  { icon: 'fas fa-cogs', label: 'Technical Enquiry', desc: 'Technical specifications, project design, and engineering support.', action: 'technical' },
  { icon: 'fas fa-graduation-cap', label: 'Training Enquiry', desc: 'ADORN Academy courses, certification programs, and workshop schedules.', action: 'training' },
  { icon: 'fas fa-handshake', label: 'Partnership Enquiry', desc: 'Reseller, system integrator, and channel partner opportunities.', action: 'partnership' },
  { icon: 'fas fa-map-marker-alt', label: 'Locations', desc: 'Find ADORN offices, showrooms, and authorized distributors near you.', action: 'locations' },
];

const FAQS = [
  { q: 'What warranty do ADORN products carry?', a: 'ADORN products come with a standard manufacturer warranty. Coverage varies by product category. Contact our support team for specific product warranty details.' },
  { q: 'How do I verify my product certificate?', a: 'You can verify your ADORN product certificate by contacting our support team with your certificate number, or visit our Certificate Verification section above.' },
  { q: 'Do you offer installation services?', a: 'ADORN provides technical guidance and installation support. For on-site installation, contact our team or reach out to one of our authorized system integrator partners.' },
  { q: 'How can I become an ADORN partner?', a: 'Visit our Partner Program page or fill out the Partnership Enquiry form below. Our team will contact you to discuss the best partnership model for your business.' },
  { q: 'Do you offer training programs?', a: 'Yes, ADORN Academy offers technical training and certification programs for structured cabling, fiber optics, and network infrastructure. Contact us for upcoming schedules.' },
];

export default function Support() {
  const [openFaq, setOpenFaq] = useState(null);
  const [contactForm, setContactForm] = useState({ type: '', name: '', email: '', phone: '', message: '' });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.type || !contactForm.name.trim()) return;
    const msg = `Hi ADORN, I have a ${contactForm.type} enquiry.\n\nName: ${contactForm.name.trim()}\nEmail: ${contactForm.email.trim()}\nPhone: ${contactForm.phone.trim()}\nMessage: ${contactForm.message.trim()}`;
    window.open('https://wa.me/971526387275?text=' + encodeURIComponent(msg), '_blank');
  };

  return (
    <>
      <SEO
        title="Support"
        description="Get technical support, product assistance, troubleshooting, and contact ADORN for sales, training, and partnership enquiries."
        url="/support"
      />

      <section className="sup-hero">
        <div className="container">
          <span className="sup-badge">We're Here to Help</span>
          <h1>Support <span className="hl">Center</span></h1>
          <p>Technical support, product assistance, and everything you need from ADORN.</p>
        </div>
      </section>

      {/* Technical Support */}
      <section className="sup-section">
        <div className="container">
          <div className="sup-head">
            <span className="sup-count">{TECH_SUPPORT.length} Topics</span>
            <h2>Technical Support</h2>
            <p>Expert help for products, installation, troubleshooting, and more.</p>
          </div>
          <div className="sup-grid">
            {TECH_SUPPORT.map((s, i) => (
              <div className="sup-card" key={i}>
                <div className="sup-card-icon"><i className={s.icon}></i></div>
                <h3>{s.label}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="sup-section sup-faqs">
        <div className="container">
          <div className="sup-head">
            <span className="sup-count">{FAQS.length} Questions</span>
            <h2>Frequently Asked Questions</h2>
            <p>Quick answers to common questions.</p>
          </div>
          <div className="sup-faq-list">
            {FAQS.map((f, i) => (
              <div className={`sup-faq-item ${openFaq === i ? 'open' : ''}`} key={i}>
                <button className="sup-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{f.q}</span>
                  <i className={`fas fa-chevron-${openFaq === i ? 'up' : 'down'}`}></i>
                </button>
                <div className="sup-faq-a">
                  <p>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact ADORN */}
      <section className="sup-section sup-contact">
        <div className="container">
          <div className="sup-head">
            <span className="sup-count">{CONTACT_OPTIONS.length} Ways</span>
            <h2>Contact ADORN</h2>
            <p>Reach out to the right team for your enquiry.</p>
          </div>
          <div className="sup-contact-grid">
            {CONTACT_OPTIONS.map((c, i) => (
              <div className="sup-contact-card" key={i} onClick={() => setContactForm({ ...contactForm, type: c.label })}>
                <div className="sup-contact-icon"><i className={c.icon}></i></div>
                <h4>{c.label}</h4>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="sup-section sup-form-section">
        <div className="container">
          <div className="sup-form-card">
            <div className="sup-form-left">
              <span className="sup-badge">Get in Touch</span>
              <h2>Send Us a <span className="hl">Message</span></h2>
              <p>Select an enquiry type above or fill out the form below. Our team will respond via WhatsApp.</p>
              <div className="sup-form-info">
                <div className="sup-info-item">
                  <i className="fas fa-phone-alt"></i>
                  <div>
                    <strong>Phone</strong>
                    <span>+971 4 338 1499</span>
                  </div>
                </div>
                <div className="sup-info-item">
                  <i className="fas fa-envelope"></i>
                  <div>
                    <strong>Email</strong>
                    <span>info@adorn.ae</span>
                  </div>
                </div>
                <div className="sup-info-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <div>
                    <strong>Location</strong>
                    <span>Dubai, UAE</span>
                  </div>
                </div>
              </div>
            </div>
            <form className="sup-form-right" onSubmit={handleContactSubmit}>
              <h3>Contact Form</h3>
              <div className="sup-field">
                <label>Enquiry Type</label>
                <select value={contactForm.type} onChange={e => setContactForm({ ...contactForm, type: e.target.value })} required>
                  <option value="" disabled>Select enquiry type</option>
                  {CONTACT_OPTIONS.map((c, i) => (
                    <option key={i} value={c.label}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div className="sup-field">
                <label>Name</label>
                <input type="text" placeholder="Enter your full name" value={contactForm.name} onChange={e => setContactForm({ ...contactForm, name: e.target.value })} required />
              </div>
              <div className="sup-field">
                <label>Email</label>
                <input type="email" placeholder="you@example.com" value={contactForm.email} onChange={e => setContactForm({ ...contactForm, email: e.target.value })} />
              </div>
              <div className="sup-field">
                <label>Phone</label>
                <input type="tel" placeholder="+971 50 000 0000" value={contactForm.phone} onChange={e => setContactForm({ ...contactForm, phone: e.target.value })} />
              </div>
              <div className="sup-field">
                <label>Message</label>
                <textarea rows="3" placeholder="Tell us how we can help..." value={contactForm.message} onChange={e => setContactForm({ ...contactForm, message: e.target.value })}></textarea>
              </div>
              <button type="submit" className="sup-submit">
                <i className="fab fa-whatsapp"></i> Send via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
