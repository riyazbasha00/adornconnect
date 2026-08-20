import React, { useState, useEffect } from 'react';
import { SEO } from '../components/SEO';
import { fetchDownloads, imgUrl } from '../api';
import './Downloads.css';

const CATEGORIES = [
  { id: 'product-catalogue', icon: 'fas fa-book', label: 'Product Catalogue' },
  { id: 'product-datasheets', icon: 'fas fa-file-alt', label: 'Product Datasheets' },
  { id: 'technical-datasheets', icon: 'fas fa-microchip', label: 'Technical Datasheets' },
  { id: 'installation-guides', icon: 'fas fa-tools', label: 'Installation Guides' },
  { id: 'product-certifications', icon: 'fas fa-certificate', label: 'Product Certifications' },
  { id: 'compliance-documents', icon: 'fas fa-check-circle', label: 'Compliance Documents' },
  { id: 'brochures', icon: 'fas fa-newspaper', label: 'Brochures' },
  { id: 'company-profile', icon: 'fas fa-building', label: 'Company Profile' },
  { id: 'marketing-resources', icon: 'fas fa-bullhorn', label: 'Marketing Resources' },
];

function formatSize(bytes) {
  if (!bytes) return '';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}

function getFileIcon(name) {
  if (!name) return 'fas fa-file';
  const ext = name.split('.').pop().toLowerCase();
  const map = { pdf: 'fas fa-file-pdf', doc: 'fas fa-file-word', docx: 'fas fa-file-word', xls: 'fas fa-file-excel', xlsx: 'fas fa-file-excel', ppt: 'fas fa-file-powerpoint', pptx: 'fas fa-file-powerpoint', zip: 'fas fa-file-archive', rar: 'fas fa-file-archive' };
  return map[ext] || 'fas fa-file';
}

export default function Downloads() {
  const [downloads, setDownloads] = useState([]);
  const [active, setActive] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDownloads().then(d => { setDownloads(d || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const filtered = active === 'all' ? downloads : downloads.filter(d => d.category === active);

  const counts = {};
  downloads.forEach(d => { counts[d.category] = (counts[d.category] || 0) + 1; });

  return (
    <>
      <SEO
        title="Downloads"
        description="Download ADORN product catalogues, datasheets, installation guides, certifications, brochures, and technical documentation."
        url="/downloads"
      />

      <section className="dl-hero">
        <div className="container">
          <span className="dl-badge">Resource Library</span>
          <h1>Downloads <span className="hl">& Resources</span></h1>
          <p>Access product catalogues, technical datasheets, installation guides, certifications, and more.</p>
        </div>
      </section>

      <section className="dl-layout">
        <div className="container">
          <div className="dl-main">
            <aside className="dl-sidebar">
              <div className="dl-sidebar-head">
                <span>{CATEGORIES.length} Categories</span>
              </div>
              <nav className="dl-sidebar-list">
                <button className={`dl-sidebar-item ${active === 'all' ? 'active' : ''}`} onClick={() => setActive('all')}>
                  <i className="fas fa-th-large"></i>
                  <span>All Documents</span>
                  <span className="dl-count">{downloads.length}</span>
                </button>
                {CATEGORIES.map(c => (
                  <button key={c.id} className={`dl-sidebar-item ${active === c.id ? 'active' : ''}`} onClick={() => setActive(c.id)}>
                    <i className={c.icon}></i>
                    <span>{c.label}</span>
                    {counts[c.id] > 0 && <span className="dl-count">{counts[c.id]}</span>}
                  </button>
                ))}
              </nav>
            </aside>

            <main className="dl-content">
              <div className="dl-content-head">
                <h2>{active === 'all' ? 'All Documents' : CATEGORIES.find(c => c.id === active)?.label}</h2>
                <span className="dl-result-count">{filtered.length} document{filtered.length !== 1 ? 's' : ''}</span>
              </div>

              {loading ? (
                <div className="dl-loading"><i className="fas fa-spinner fa-spin"></i> Loading documents...</div>
              ) : filtered.length === 0 ? (
                <div className="dl-empty">
                  <i className="fas fa-folder-open"></i>
                  <h3>No documents available</h3>
                  <p>Documents will appear here once uploaded by the admin.</p>
                </div>
              ) : (
                <div className="dl-list">
                  {filtered.map((d, i) => (
                    <div className="dl-item" key={d.id || i}>
                      <div className="dl-item-icon"><i className={getFileIcon(d.fileName || d.fileUrl)}></i></div>
                      <div className="dl-item-info">
                        <h4>{d.title}</h4>
                        <div className="dl-item-meta">
                          <span className="dl-cat-badge">{CATEGORIES.find(c => c.id === d.category)?.label || d.category}</span>
                          {d.fileName && <span>{d.fileName}</span>}
                          {d.fileSize > 0 && <span>{formatSize(d.fileSize)}</span>}
                        </div>
                      </div>
                      <a href={imgUrl(d.fileUrl)} download={d.fileName || ''} target="_blank" rel="noreferrer" className="dl-download-btn">
                        <i className="fas fa-download"></i> Download
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </section>
    </>
  );
}
