import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import AboutPage from './pages/AboutPage';
import PartnerProgram from './pages/PartnerProgram';
import Support from './pages/Support';
import KnowledgeCenter from './pages/KnowledgeCenter';
import Downloads from './pages/Downloads';
import Admin from './pages/Admin';
import Maintenance from './pages/Maintenance';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Portfolio from './pages/Portfolio';
import Academy from './pages/Academy';
import Insights from './pages/Insights';
import Resources from './pages/Resources';
import PartnerNetwork from './pages/PartnerNetwork';
import WhereToBuy from './pages/WhereToBuy';
import Projects from './pages/Projects';
import VerifyCertificate from './pages/VerifyCertificate';
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
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product" element={<ProductDetail />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/solutions" element={<Navigate to="/portfolio" replace />} />
            <Route path="/partner-network" element={<PartnerNetwork />} />
            <Route path="/partner-program" element={<PartnerNetwork />} />
            <Route path="/support" element={<Support />} />
            <Route path="/knowledge-center" element={<KnowledgeCenter />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/downloads" element={<Resources />} />
            <Route path="/academy" element={<Academy />} />
            <Route path="/adorn-academy" element={<Academy />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/adorn-insights" element={<Insights />} />
            <Route path="/knowledge-center" element={<Insights />} />
            <Route path="/where-to-buy" element={<WhereToBuy />} />
            <Route path="/order" element={<Navigate to="/products" replace />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/verify" element={<VerifyCertificate />} />
            <Route path="/verify-certificate" element={<VerifyCertificate />} />
            <Route path="/certificate/:certNumber" element={<VerifyCertificate />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
