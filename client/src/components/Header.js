import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const LOGO = 'https://adorn.ae/wp-content/uploads/2026/04/Adorn_Logo_Print_RGB-01.jpg';

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Adorn Academy', to: '/academy' },
  { label: 'ADORN Insights', to: '/insights' },
  { label: 'Resources', to: '/resources' },
  { label: 'Partner Network', to: '/partner-network' },
  { label: 'Products', to: '/products' },
  { label: 'Where to buy', to: '/where-to-buy' },
  { label: 'Projects', to: '/projects' },
  { label: 'Support', to: '/support' },
];

export default function Header() {
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [mobileQuery, setMobileQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate('/products?q=' + encodeURIComponent(query.trim()));
  };

  return (
    <>
      <div className="top-bar">
        <div className="container top-bar-inner">
          <div className="tb-left">
            <span><i className="fas fa-phone"></i> +971 4 338 1499</span>
          </div>
          <div className="tb-right">
            <span><i className="fas fa-envelope"></i> info@adorn.ae</span>
            <span><i className="fas fa-map-marker-alt"></i> Dubai, UAE</span>
          </div>
        </div>
      </div>

      <header className="header">
        <div className="container header-inner">
          <Link to="/" className="logo">
            <img src={LOGO} alt="ADORN — Structured Cabling & Security Solutions Dubai" width="140" height="40" />
          </Link>
          <form className="search-bar" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit"><i className="fas fa-search"></i></button>
          </form>
          <div className="header-actions">
            <button className="mobile-search-btn" onClick={() => setShowMobileSearch(true)}>
              <i className="fas fa-search"></i>
            </button>
            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
              <i className={`fas fa-${menuOpen ? 'times' : 'bars'}`}></i>
            </button>
          </div>
        </div>
      </header>

      {showMobileSearch && (
        <div className="mobile-search-overlay" onClick={() => { setShowMobileSearch(false); setMobileQuery(''); }}>
          <div className="mobile-search-box" onClick={e => e.stopPropagation()}>
            <form onSubmit={e => { e.preventDefault(); if (mobileQuery.trim()) { navigate('/products?q=' + encodeURIComponent(mobileQuery.trim())); setShowMobileSearch(false); setMobileQuery(''); } }}>
              <input autoFocus type="text" placeholder="Search products..." value={mobileQuery} onChange={e => setMobileQuery(e.target.value)} />
              <button type="submit"><i className="fas fa-search"></i></button>
            </form>
            <button className="mobile-search-close" onClick={() => { setShowMobileSearch(false); setMobileQuery(''); }}><i className="fas fa-times"></i></button>
          </div>
        </div>
      )}

      <nav className={`cat-nav ${menuOpen ? 'open' : ''}`}>
        <div className="container cat-nav-inner">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.to}
              to={item.to}
              className="cat-link"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
