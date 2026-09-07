import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { fetchBanner, imgUrl } from '../api';
import { HomeSEO } from '../components/SEO';
import useScrollReveal from '../hooks/useScrollReveal';
import TypingText from '../components/TypingText';
import './Home.css';

const DEFAULT_BANNERS = [];

export default function Home() {
  const [banners, setBanners] = useState(DEFAULT_BANNERS);
  const [current, setCurrent] = useState(0);
  const timer = useRef(null);
  const revealRef = useScrollReveal();

  useEffect(() => {
    fetchBanner().then(b => {
      if (b && Array.isArray(b.images) && b.images.length) setBanners(b.images);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;
    timer.current = setInterval(() => {
      setCurrent(c => (c + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer.current);
  }, [banners.length]);

  const goTo = (i) => {
    setCurrent(i);
    if (timer.current) { clearInterval(timer.current); timer.current = null; }
  };

  return (
    <>
      <HomeSEO />

      {/* ─── Hero ─── */}
      <section className="hero" style={banners.length ? {} : { background: '#f5f5f5' }}>
        {banners.map((b, i) => (
          <div key={i} className={`hero-bg ${i === current ? 'active' : ''}`} style={{ backgroundImage: `url(${imgUrl(b)})` }}></div>
        ))}
        {banners.length > 1 && (
          <>
            <button className="hero-arrow hero-arrow-prev" onClick={() => goTo((current - 1 + banners.length) % banners.length)} aria-label="Previous banner">
              <i className="fas fa-chevron-left"></i>
            </button>
            <button className="hero-arrow hero-arrow-next" onClick={() => goTo((current + 1) % banners.length)} aria-label="Next banner">
              <i className="fas fa-chevron-right"></i>
            </button>
            <div className="hero-dots">
              {banners.map((_, i) => (
                <button key={i} className={`hero-dot ${i === current ? 'active' : ''}`} onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}`}></button>
              ))}
            </div>
          </>
        )}
        <div className="hero-orb hero-orb-1"></div>
        <div className="hero-orb hero-orb-2"></div>

        <div className="container hero-content">
          <div className="hero-badge animate-rise" style={{ animationDelay: '.1s' }}>
            <span className="hero-badge-dot"></span>
            Premium Manufacturer &amp; Supplier
          </div>
          <h1 className="animate-rise" style={{ animationDelay: '.25s' }}>
            Structured Cabling &amp;<br />
            <TypingText words={['Security Solutions', 'Fiber Optic Systems', 'Smart Building Infrastructure', 'Enterprise Networks']} className="hero-hl" />
          </h1>
          <p className="hero-desc-desktop animate-rise" style={{ animationDelay: '.4s' }}>Premium networking infrastructure, surveillance, and access control products for commercial, industrial, and residential projects across the UAE.</p>
          <p className="hero-desc-mobile animate-rise" style={{ animationDelay: '.4s' }}>Premium networking, surveillance &amp; access control products across the UAE.</p>
          <div className="hero-btns animate-rise" style={{ animationDelay: '.55s' }}>
            <Link to="/products" className="hero-btn hero-btn-primary hero-btn-grow">
              <i className="fas fa-th-large"></i> Explore Products
            </Link>
            <a href="https://wa.me/971526387275" className="hero-btn hero-btn-outline hero-btn-grow" target="_blank" rel="noopener noreferrer">
              <i className="fas fa-handshake"></i> Become a Partner
            </a>
          </div>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1000 100" preserveAspectRatio="none">
            <path d="M0,10 C150,90 350,0 500,30 C650,60 850,15 1000,45 L1000,100 L0,100 Z" fill="white"></path>
          </svg>
        </div>
      </section>

      <div ref={revealRef}>

        {/* ─── About ADORN ─── */}
        <section className="web-about">
          <div className="floating-shape floating-shape-1"></div>
          <div className="floating-shape floating-shape-2"></div>
          <div className="container">
            <div className="web-about-inner reveal reveal-fade-up">
              <span className="ab-badge">About ADORN</span>
              <h2>Building the Foundation for a <span className="hl">Connected World</span></h2>
              <p className="web-about-lead">
                ADORN is a UAE-based technology brand specializing in structured cabling, fiber optic connectivity, network cabinets, passive networking solutions, and ELV infrastructure products.
              </p>
              <p>
                Designed for reliability, engineered for performance, and backed by technical expertise, ADORN helps businesses, contractors, system integrators, and consultants build secure, scalable, and future-ready network infrastructures.
              </p>
            </div>
          </div>
        </section>

        <div className="section-wave section-wave-gray">
          <svg viewBox="0 0 1000 100" preserveAspectRatio="none">
            <path d="M0,0 L0,60 C200,100 400,20 600,50 C800,80 900,30 1000,40 L1000,0 Z" fill="white"></path>
          </svg>
        </div>

        {/* ─── Who We Are ─── */}
        <section className="web-who">
          <div className="container">
            <div className="web-who-inner reveal reveal-fade-up">
              <span className="ab-badge">Who We Are</span>
              <h2>Building Connections That Power <span className="hl">Tomorrow</span></h2>
              <p>Technology is transforming the way people live, work, communicate, and do business. Behind every successful digital transformation lies a reliable network infrastructure that connects people, devices, applications, and data.</p>
              <p>At ADORN, we believe network infrastructure is more than cables and connectivity. It is the foundation of every intelligent building, enterprise network, and digital ecosystem.</p>
            </div>
            <div className="web-why-grid">
              <div className="web-why-card reveal reveal-left">
                <div className="web-why-icon"><i className="fas fa-bullseye"></i></div>
                <h3>Why ADORN Exists</h3>
                <p>To empower businesses and technology professionals with reliable infrastructure solutions, practical technical knowledge, and trusted partnerships that enable them to build the connected world of tomorrow.</p>
              </div>
              <div className="web-why-card reveal reveal-up">
                <div className="web-why-icon"><i className="fas fa-comments"></i></div>
                <h3>Beyond Products</h3>
                <p>We understand that success is not achieved by supplying products alone. It is built through confidence, consistency, education, and long-term relationships.</p>
              </div>
              <div className="web-why-card reveal reveal-right">
                <div className="web-why-icon"><i className="fas fa-cubes"></i></div>
                <h3>Our Commitment</h3>
                <p>Every cable, cabinet, fiber solution, connectivity product, and accessory we develop is designed to help our partners deliver dependable and scalable infrastructure that stands the test of time.</p>
              </div>
            </div>
            <div className="web-who-vision reveal reveal-zoom">
              <p>As technology continues to evolve, so will ADORN. We will continue to innovate, expand our solutions, strengthen our partnerships, and raise the standards of networking and ELV infrastructure across the region.</p>
              <p className="web-vision-quote">Because we believe that every great network begins with a strong foundation.<br />And every strong foundation begins with <span className="hl">trust</span>.</p>
            </div>
          </div>
        </section>

        <div className="section-wave section-wave-white">
          <svg viewBox="0 0 1000 100" preserveAspectRatio="none">
            <path d="M0,80 C150,30 350,90 500,50 C650,10 850,70 1000,40 L1000,100 L0,100 Z" fill="#322160" fillOpacity=".03"></path>
          </svg>
        </div>

        {/* ─── Purpose, Vision & Mission ─── */}
        <section className="web-pvm">
          <div className="container">
            <div className="web-pvm-grid">
              <div className="web-pvm-card reveal reveal-left">
                <div className="web-pvm-num">01</div>
                <h3>Purpose</h3>
                <p>To empower the people who build the world's digital infrastructure through trusted products, technical knowledge, and lasting partnerships.</p>
              </div>
              <div className="web-pvm-card reveal reveal-up">
                <div className="web-pvm-num">02</div>
                <h3>Vision</h3>
                <p>To become one of the GCC's most trusted infrastructure technology brands, recognized for quality, innovation, technical excellence, and developing the next generation of networking professionals.</p>
              </div>
              <div className="web-pvm-card reveal reveal-right">
                <div className="web-pvm-num">03</div>
                <h3>Mission</h3>
                <p>We design, develop, and deliver reliable passive networking and ELV infrastructure solutions while supporting our partners through technical expertise, education, and exceptional customer service, enabling them to build secure, scalable, and future-ready networks.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Why Professionals Choose ADORN ─── */}
        <section className="web-why-choose">
          <div className="container">
            <div className="web-pvm-card reveal reveal-fade-up" style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 40px' }}>
              <span className="ab-badge">Why Professionals Choose ADORN</span>
              <h2 style={{ fontSize: '1.4rem', marginTop: 12 }}>Trusted by Professionals Across the Region</h2>
            </div>
            <div className="web-choose-grid">
              {[
                { icon: 'fa-medal', title: 'Quality Without Compromise', desc: 'Every product is manufactured using carefully selected materials and tested to deliver consistent performance and long-term reliability.' },
                { icon: 'fa-layer-group', title: 'Complete Infrastructure Portfolio', desc: 'One trusted brand for structured cabling, fiber, network cabinets, connectivity, and passive networking accessories.' },
                { icon: 'fa-tools', title: 'Built for System Integrators', desc: 'Designed with installers, engineers, and consultants in mind, making deployment faster, simpler, and more reliable.' },
                { icon: 'fa-graduation-cap', title: 'Technical Knowledge', desc: 'More than products. We provide technical guidance, training, and educational resources that help professionals build better networks.' },
                { icon: 'fa-handshake', title: 'Growing Partner Network', desc: 'Building strong relationships with distributors, resellers, contractors, and consultants across the GCC.' },
                { icon: 'fa-rocket', title: 'Future Ready', desc: 'Designed to support modern technologies including AI infrastructure, smart buildings, high-speed networking, PoE, IoT, and next-generation enterprise environments.' },
              ].map((item, i) => (
                <div className={`web-choose-card reveal reveal-${i % 3 === 0 ? 'left' : i % 3 === 2 ? 'right' : 'up'}`} key={i}>
                  <div className="web-choose-icon"><i className={`fas ${item.icon}`}></i></div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Core Values ─── */}
        <section className="web-values">
          <div className="container">
            <div className="web-pvm-card reveal reveal-fade-up" style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 40px' }}>
              <span className="ab-badge">Core Values</span>
              <h2 style={{ fontSize: '1.4rem', marginTop: 12 }}>What Drives Everything We Do</h2>
            </div>
            <div className="web-values-grid">
              {[
                { icon: 'fa-shield-alt', title: 'Trust', desc: 'We build lasting relationships through honesty, transparency, and reliability.' },
                { icon: 'fa-award', title: 'Quality', desc: 'We never compromise on the performance, durability, or reliability of our products.' },
                { icon: 'fa-book-open', title: 'Knowledge', desc: 'We believe education creates stronger professionals, stronger partnerships, and better infrastructure.' },
                { icon: 'fa-lightbulb', title: 'Innovation', desc: 'We continuously evolve our products and solutions to meet the changing demands of technology.' },
                { icon: 'fa-users', title: 'Partnership', desc: 'Our success is built on the success of our customers, channel partners, consultants, and system integrators.' },
                { icon: 'fa-heart', title: 'Commitment', desc: 'We stand behind every product, every partner, and every project with dedication and accountability.' },
              ].map((item, i) => (
                <div className={`web-value-card reveal reveal-${i % 3 === 0 ? 'left' : i % 3 === 2 ? 'right' : 'up'}`} key={i}>
                  <div className="web-value-icon"><i className={`fas ${item.icon}`}></i></div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Featured Solutions ─── */}
        <section className="web-solutions">
          <div className="container">
            <div className="web-pvm-card reveal reveal-fade-up" style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 40px' }}>
              <span className="ab-badge">Featured Solutions</span>
              <h2 style={{ fontSize: '1.4rem', marginTop: 12 }}>Infrastructure Solutions for a Connected World</h2>
              <p style={{ color: 'var(--gray-500)', marginTop: 8 }}>ADORN provides infrastructure solutions designed to support modern digital environments across commercial, enterprise, and technology applications.</p>
            </div>
            <div className="web-solutions-grid">
              {[
                { icon: 'fa-building', title: 'Smart Buildings', desc: 'Infrastructure solutions supporting intelligent, connected, and automated building environments.' },
                { icon: 'fa-network-wired', title: 'Enterprise Networks', desc: 'Reliable structured cabling and passive networking solutions for modern business networks.' },
                { icon: 'fa-server', title: 'Data Centres', desc: 'High-performance connectivity and infrastructure solutions for critical data centre environments.' },
                { icon: 'fa-plug', title: 'Structured Cabling', desc: 'Reliable copper cabling solutions designed for scalable and dependable network performance.' },
                { icon: 'fa-bolt', title: 'Fiber Optic Systems', desc: 'High-speed fiber connectivity solutions for reliable data transmission and modern network infrastructure.' },
                { icon: 'fa-th-large', title: 'Passive Networking', desc: 'Essential connectivity products and accessories for building organized, reliable network infrastructure.' },
                { icon: 'fa-broadcast-tower', title: 'ELV Infrastructure', desc: 'Infrastructure solutions supporting modern low-voltage technology and building systems.' },
              ].map((item, i) => (
                <div className={`web-solution-card reveal reveal-${i % 4 === 0 ? 'left' : i % 4 === 3 ? 'right' : 'up'}`} key={i}>
                  <div className="web-solution-icon"><i className={`fas ${item.icon}`}></i></div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="section-wave section-wave-cta">
          <svg viewBox="0 0 1000 100" preserveAspectRatio="none">
            <path d="M0,10 C200,70 400,20 600,55 C800,90 950,30 1000,50 L1000,100 L0,100 Z" fill="white"></path>
          </svg>
        </div>

        {/* ─── CTA ─── */}
        <section className="web-cta">
          <div className="container">
            <div className="web-cta-inner reveal reveal-zoom">
              <div className="cta-particle cta-particle-1"></div>
              <div className="cta-particle cta-particle-2"></div>
              <div className="cta-particle cta-particle-3"></div>
              <h2>Building the Connected World <span className="hl">Together</span></h2>
              <p>ADORN exists to empower businesses and technology professionals with reliable network infrastructure solutions, technical knowledge, and trusted partnerships that build the connected world of tomorrow.</p>
              <div className="web-cta-btns">
                <Link to="/products" className="hero-btn hero-btn-primary hero-btn-grow">
                  <i className="fas fa-th-large"></i> Explore Products
                </Link>
                <a href="https://wa.me/971526387275" className="hero-btn hero-btn-outline hero-btn-grow" target="_blank" rel="noopener noreferrer">
                  <i className="fas fa-handshake"></i> Become a Partner
                </a>
                <a href="#contact" className="hero-btn hero-btn-outline hero-btn-grow">
                  <i className="fas fa-envelope"></i> Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* ─── Contact ─── */}
      <section className="about-bridge" id="contact">
        <div className="container">
          <div className="ab-head">
            <span className="ab-badge">Contact</span>
            <h2>Get in Touch With ADORN</h2>
            <p>Reach out for product inquiries, project consultations, or technical support.</p>
          </div>
          <div className="about-contact">
            <div className="contact-card">
              <div className="ac-icon"><i className="fas fa-headset"></i></div>
              <h3>Get In Touch</h3>
              <div className="cc-items">
                <div className="cc-item">
                  <span className="cc-icn"><i className="fas fa-phone-alt"></i></span>
                  <div><strong>Phone</strong><span>+971 4 338 1499</span></div>
                </div>
                <div className="cc-item">
                  <span className="cc-icn"><i className="fas fa-envelope"></i></span>
                  <div><strong>Email</strong><span>info@adorn.ae</span></div>
                </div>
                <div className="cc-item">
                  <span className="cc-icn"><i className="fas fa-map-marker-alt"></i></span>
                  <div><strong>Location</strong><span>Dubai, UAE</span></div>
                </div>
                <div className="cc-item">
                  <span className="cc-icn"><i className="fas fa-clock"></i></span>
                  <div><strong>Working Hours</strong><span>Sat–Thu: 8:00 AM – 6:00 PM</span></div>
                </div>
              </div>
              <a href="https://wa.me/971526387275" className="btn btn-primary btn-wa" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-whatsapp"></i> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
