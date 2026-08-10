import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const PRODUCT_RANGE = [
  { icon: 'fa-network-wired', label: 'Category 5e, 6, 6A & 7 LAN cables' },
  { icon: 'fa-layer-group', label: 'Copper & fiber-optic cabling' },
  { icon: 'fa-plug', label: 'Patch cords, keystone jacks, faceplates & connectors' },
  { icon: 'fa-table-cells', label: 'Patch panels & cable management' },
  { icon: 'fa-server', label: 'Network cabinets & server racks' },
  { icon: 'fa-bolt', label: 'Power Distribution Units (PDUs)' },
  { icon: 'fa-broadcast-tower', label: 'Fiber-optic accessories' },
  { icon: 'fa-toolbox', label: 'Installation & connectivity accessories' },
];

const ISO_CERTS = [
  { icon: 'fa-certificate', title: 'ISO 9001:2015', sub: 'Quality Management' },
  { icon: 'fa-leaf', title: 'ISO 14001:2015', sub: 'Environmental Management' },
  { icon: 'fa-hard-hat', title: 'ISO 45001:2018', sub: 'Occupational Health & Safety' },
  { icon: 'fa-lock', title: 'ISO 27001:2022', sub: 'Information Security Management' },
];

const INDUSTRIES = [
  { icon: 'fa-building', label: 'Enterprise & Corporate' },
  { icon: 'fa-database', label: 'Data Centers' },
  { icon: 'fa-microchip', label: 'Smart Buildings' },
  { icon: 'fa-hotel', label: 'Hospitality' },
  { icon: 'fa-graduation-cap', label: 'Education' },
  { icon: 'fa-hospital', label: 'Healthcare' },
  { icon: 'fa-landmark', label: 'Government' },
  { icon: 'fa-store', label: 'Retail' },
  { icon: 'fa-industry', label: 'Industrial Facilities' },
  { icon: 'fa-home', label: 'Residential Developments' },
];

const WHY_CHOOSE = [
  'Reliable, consistently high product quality',
  'Competitive trade & project pricing',
  'Broad product portfolio under one brand',
  'Local stock availability & fast UAE-wide delivery',
  'Technical & project support for integrators, contractors & consultants',
];

export default function About() {
  return (
    <section className="about-section" id="about">
      <div className="container">
        <div className="ab-header">
          <span className="ab-badge">About ADORN</span>
          <h2>Building the Foundation for Connected, Secure, and <span className="ab-hl">Intelligent</span> Infrastructure</h2>
        </div>

        <div className="ab-intro">
          <p>ADORN is an ISO-certified brand specializing in high-quality structured cabling and Extra-Low Voltage (ELV) infrastructure solutions. We support commercial, industrial, residential, and data center projects throughout the UAE, GCC, and international markets.</p>
          <p>Our goal is to provide dependable infrastructure solutions that simplify installation, strengthen network performance, and meet the evolving connectivity requirements of modern buildings and enterprises.</p>
        </div>

        <div className="ab-block">
          <div className="ab-block-head">
            <span className="ab-block-icon"><i className="fas fa-boxes"></i></span>
            <div>
              <h3>Complete Infrastructure Solutions</h3>
              <p>ADORN offers a comprehensive portfolio of structured cabling and ELV infrastructure products designed for reliable data transmission, seamless connectivity, and long-term performance. Our product range includes:</p>
            </div>
          </div>
          <div className="ab-prod-grid">
            {PRODUCT_RANGE.map((item, i) => (
              <div className="ab-prod-item" key={i}>
                <span className="ab-prod-icon"><i className={`fas ${item.icon}`}></i></span>
                {item.label}
              </div>
            ))}
          </div>
        </div>

        <div className="ab-block">
          <div className="ab-block-head">
            <span className="ab-block-icon"><i className="fas fa-award"></i></span>
            <div>
              <h3>Certified Quality &amp; Responsible Operations</h3>
              <p>Quality is central to everything we do. ADORN products are manufactured using carefully selected materials and undergo stringent quality-control procedures to ensure consistent performance and reliability. ADORN is certified to internationally recognized management system standards:</p>
            </div>
          </div>
          <div className="ab-iso-grid">
            {ISO_CERTS.map((c, i) => (
              <div className="ab-iso-card" key={i}>
                <span className="ab-iso-icon"><i className={`fas ${c.icon}`}></i></span>
                <strong>{c.title}</strong>
                <span>{c.sub}</span>
              </div>
            ))}
          </div>
          <p className="ab-block-foot">These certifications reflect our commitment to quality, responsible operations, workplace safety, environmental awareness, and secure information-management practices.</p>
        </div>

        <div className="ab-block">
          <div className="ab-block-head">
            <span className="ab-block-icon"><i className="fas fa-globe"></i></span>
            <div>
              <h3>Supporting a Wide Range of Industries</h3>
              <p>Our products are designed to support networking and ELV infrastructure requirements across diverse sectors, including:</p>
            </div>
          </div>
          <div className="ab-ind-grid">
            {INDUSTRIES.map((ind, i) => (
              <div className="ab-ind-item" key={i}>
                <span className="ab-ind-icon"><i className={`fas ${ind.icon}`}></i></span>
                {ind.label}
              </div>
            ))}
          </div>
          <p className="ab-block-foot">Whether it is a small installation or a large-scale infrastructure project, ADORN provides solutions designed to deliver efficiency, scalability, and dependable performance.</p>
        </div>

        <div className="ab-block">
          <div className="ab-block-head">
            <span className="ab-block-icon"><i className="fas fa-thumbs-up"></i></span>
            <div>
              <h3>Why Choose ADORN?</h3>
              <p>Customers choose ADORN for our reliable product quality, competitive pricing, broad product portfolio, local stock availability, and responsive delivery. We also provide technical and project support to help system integrators, contractors, consultants, distributors, and enterprises select suitable solutions for their requirements.</p>
            </div>
          </div>
          <ul className="ab-check-list">
            {WHY_CHOOSE.map((f, i) => (
              <li key={i}><i className="fas fa-check-circle"></i> {f}</li>
            ))}
          </ul>
          <p className="ab-block-foot">As an own-brand manufacturer, we maintain a strong focus on product specifications, quality control, practical installation requirements, and continuous improvement. This allows us to provide solutions that meet the demands of today&rsquo;s connected environments while delivering lasting value to our customers and partners.</p>
        </div>

        <div className="ab-block ab-commit">
          <div className="ab-block-head">
            <span className="ab-block-icon"><i className="fas fa-handshake"></i></span>
            <div>
              <h3>Our Commitment</h3>
              <p>At ADORN, we believe that reliable connectivity begins with a strong infrastructure foundation. We are committed to developing innovative, standards-compliant products that make installations more efficient, enhance network performance, and support future growth.</p>
            </div>
          </div>
          <p className="ab-block-foot">By combining dependable products, competitive value, technical expertise, and customer-focused service, we aim to be the preferred infrastructure partner for projects across the UAE and beyond.</p>
        </div>

        <div className="ab-tagline">
          <span className="ab-tag-icon"><i className="fas fa-quote-left"></i></span>
          <p>ADORN &mdash; Building the Foundation for Connected, Secure, and Intelligent Infrastructure.</p>
          <Link to="/products" className="btn btn-primary ab-cta"><i className="fas fa-th-large"></i> Explore Products</Link>
        </div>
      </div>
    </section>
  );
}
