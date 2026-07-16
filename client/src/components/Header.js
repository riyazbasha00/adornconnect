import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchCategories } from '../api';
import './Header.css';

const LOGO = 'https://adorn.ae/wp-content/uploads/2026/04/Adorn_Logo_Print_RGB-01.jpg';

export default function Header() {
  const [cats, setCats] = useState([]);
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories().then(setCats).catch(() => {});
  }, []);

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
            <img src={LOGO} alt="ADORN" />
          </Link>
          <nav className="header-nav">
            <Link to="/" className="hn-link" onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Home</Link>
            <Link to="/products" className="hn-link" onClick={() => setMenuOpen(false)}>Products</Link>
            <a href="/#contact" className="hn-link" onClick={() => setMenuOpen(false)}>About</a>
          </nav>
          <form className="search-bar" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit"><i className="fas fa-search"></i></button>
          </form>
          <Link to="/admin" className="btn btn-outline admin-btn">
            <i className="fas fa-shield-alt"></i> Login
          </Link>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <i className={`fas fa-${menuOpen ? 'times' : 'bars'}`}></i>
          </button>
        </div>
      </header>

      <nav className={`cat-nav ${menuOpen ? 'open' : ''}`}>
        <div className="container cat-nav-inner">
          <Link to="/products" className="cat-link all-link" onClick={() => setMenuOpen(false)}>
            <i className="fas fa-th-large"></i> All Categories
          </Link>
          {cats.map(c => (
            <Link
              key={c.id}
              to={`/products?cat=${encodeURIComponent(c.id)}`}
              className="cat-link"
              onClick={() => setMenuOpen(false)}
            >
              <i className={c.icon || 'fas fa-box'}></i> {c.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
