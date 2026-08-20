import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import AboutPage from './pages/AboutPage';
import Solutions from './pages/Solutions';
import PartnerProgram from './pages/PartnerProgram';
import Support from './pages/Support';
import KnowledgeCenter from './pages/KnowledgeCenter';
import Downloads from './pages/Downloads';
import Admin from './pages/Admin';
import './App.css';

function ScrollTop() {
  const { pathname, search } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [pathname, search]);
  return null;
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Helmet>
          <meta name="robots" content="index, follow" />
          <meta name="author" content="ADORN" />
          <meta name="keywords" content="structured cabling, network cables, Cat6, Cat6A, fiber optic, CCTV, security cameras, NVR, DVR, access control, surveillance, networking, Dubai, UAE, ADORN" />
        </Helmet>
        <ScrollTop />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product" element={<ProductDetail />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/partner-program" element={<PartnerProgram />} />
            <Route path="/support" element={<Support />} />
            <Route path="/knowledge-center" element={<KnowledgeCenter />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
