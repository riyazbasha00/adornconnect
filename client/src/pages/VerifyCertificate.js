import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useParams, Link } from 'react-router-dom';
import { verifyCertificate } from '../api';
import { QRCodeView } from '../utils/qr';
import { SEO } from '../components/SEO';
import './VerifyCertificate.css';

const LOGO = 'https://adorn.ae/wp-content/uploads/2026/04/Adorn_Logo_Print_RGB-01.jpg';

function format12Digits(val) {
  if (!val) return '';
  const digits = val.toString().replace(/\D/g, '').slice(0, 12);
  const parts = [];
  for (let i = 0; i < digits.length; i += 4) {
    parts.push(digits.slice(i, i + 4));
  }
  return parts.join(' - ');
}

export default function VerifyCertificate() {
  const [searchParams, setSearchParams] = useSearchParams();
  const routeParams = useParams();
  const [certInput, setCertInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [searchedNum, setSearchedNum] = useState('');
  const [copied, setCopied] = useState(false);

  const initialNum = routeParams.certNumber || searchParams.get('cert') || searchParams.get('id') || searchParams.get('number') || '';

  const doVerify = useCallback(async (numToVerify) => {
    if (!numToVerify) return;
    const clean = numToVerify.toString().replace(/[\s-]/g, '');
    if (!clean) return;

    setLoading(true);
    setSearchedNum(clean);
    try {
      const res = await verifyCertificate(clean);
      if (res && res.found && res.certificate) {
        setResult({ success: true, cert: res.certificate });
      } else {
        setResult({ success: false, error: 'Certificate not found in official registry' });
      }
    } catch (err) {
      setResult({
        success: false,
        error: err.message || 'Unable to verify certificate. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialNum) {
      setCertInput(format12Digits(initialNum));
      doVerify(initialNum);
    }
  }, [initialNum, doVerify]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const clean = certInput.replace(/[\s-]/g, '');
    if (clean.length !== 12) {
      setResult({
        success: false,
        error: 'Please enter a valid 12-digit certificate credential number.'
      });
      return;
    }
    setSearchParams({ cert: clean });
    doVerify(clean);
  };

  const handleInputChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 12);
    setCertInput(format12Digits(raw));
  };

  const copyVerifyLink = () => {
    const clean = searchedNum || (result?.cert?.certNumber);
    const url = `${window.location.origin}/verify?cert=${clean}`;
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const printCert = () => {
    window.print();
  };

  const cert = result?.cert;
  const verifyUrl = cert ? `${window.location.origin}/verify?cert=${cert.certNumber}` : '';

  return (
    <div className="verify-page">
      <SEO
        title="Official Certificate Verification | ADORN Academy"
        description="Verify official credentials, diplomas, and technical certifications issued by ADORN Academy using the 12-digit credential number or printed QR code."
        url="/verify"
      />

      <div className="verify-hero no-print">
        <div className="container">
          <div className="vh-badge">
            <i className="fas fa-shield-alt"></i> Official Credential Registry
          </div>
          <h1>ADORN Academy Certificate Verification</h1>
          <p className="vh-desc">
            Verify the authenticity of professional certifications, diplomas, and accreditations issued by ADORN Academy. Enter the 12-digit credential number or scan the QR code printed on the physical certificate.
          </p>

          <form className="verify-form-card" onSubmit={handleSubmit}>
            <label htmlFor="certInput" className="vf-label">
              <i className="fas fa-barcode"></i> Enter 12-Digit Certificate Number:
            </label>
            <div className="vf-input-wrap">
              <input
                id="certInput"
                type="text"
                placeholder="e.g. 8492 - 0183 - 7462"
                value={certInput}
                onChange={handleInputChange}
                maxLength={19}
                className="vf-input"
                autoComplete="off"
                spellCheck="false"
              />
              <button type="submit" className="vf-btn" disabled={loading}>
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Verifying...
                  </>
                ) : (
                  <>
                    <i className="fas fa-check-circle"></i> Verify Now
                  </>
                )}
              </button>
            </div>
            <div className="vf-hint">
              <span><i className="fas fa-qrcode"></i> Or scan the QR code printed on your certificate to verify instantly.</span>
              <span className="vf-samples">
                Try demo:{' '}
                <button type="button" onClick={() => { setCertInput(format12Digits('849201837462')); doVerify('849201837462'); }}>
                  8492-0183-7462
                </button>
                {' '}&bull;{' '}
                <button type="button" onClick={() => { setCertInput(format12Digits('518392047163')); doVerify('518392047163'); }}>
                  5183-9204-7163
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>

      <div className="container verify-results-wrap">
        {loading && (
          <div className="verify-loading no-print">
            <div className="verify-spinner"></div>
            <h3>Verifying Credential in ADORN Registry...</h3>
            <p>Checking security signatures and validity status.</p>
          </div>
        )}

        {!loading && result && result.success && cert && (
          <div className="verify-success-block">
            {/* Status Banner */}
            <div className="verify-status-banner no-print">
              <div className="vsb-icon">
                <i className="fas fa-check-circle"></i>
              </div>
              <div className="vsb-text">
                <h2>Authentic Credential Verified</h2>
                <p>
                  This official certification is registered and recognized in the ADORN Academy registry in Dubai, UAE.
                </p>
              </div>
              <div className="vsb-actions">
                <button onClick={copyVerifyLink} className="btn-act btn-act-outline">
                  <i className={`fas ${copied ? 'fa-check' : 'fa-link'}`}></i>
                  {copied ? 'Link Copied!' : 'Copy Verification Link'}
                </button>
                <button onClick={printCert} className="btn-act btn-act-primary">
                  <i className="fas fa-print"></i> Print Official Certificate
                </button>
              </div>
            </div>

            {/* Quick Summary Grid */}
            <div className="verify-details-grid no-print">
              <div className="vd-card">
                <span className="vd-label">Candidate Name</span>
                <strong className="vd-val vd-name">{cert.candidateName}</strong>
              </div>
              <div className="vd-card">
                <span className="vd-label">12-Digit Certificate ID</span>
                <strong className="vd-val vd-id">{format12Digits(cert.certNumber)}</strong>
              </div>
              <div className="vd-card">
                <span className="vd-label">Course / Program</span>
                <strong className="vd-val">{cert.courseName}</strong>
              </div>
              <div className="vd-card">
                <span className="vd-label">Status</span>
                <span className={`vd-badge status-${(cert.status || 'Active').toLowerCase()}`}>
                  <i className="fas fa-circle"></i> {cert.status || 'Active'}
                </span>
              </div>
              <div className="vd-card">
                <span className="vd-label">Issue Date</span>
                <strong className="vd-val">{cert.issueDate || '—'}</strong>
              </div>
              <div className="vd-card">
                <span className="vd-label">Validity / Expiry</span>
                <strong className="vd-val">{cert.expiryDate || 'Lifetime'}</strong>
              </div>
              <div className="vd-card">
                <span className="vd-label">Grade / Achievement</span>
                <strong className="vd-val">{cert.grade || 'Certified Specialist'}</strong>
              </div>
              <div className="vd-card">
                <span className="vd-label">Issuing Authority</span>
                <strong className="vd-val">{cert.issuer || 'ADORN Academy Technical Board'}</strong>
              </div>
            </div>

            {/* Printable Digital Certificate */}
            <div className="certificate-print-frame">
              <div className="cert-sheet">
                <div className="cert-border-outer">
                  <div className="cert-border-inner">
                    <div className="cert-corner corner-tl"></div>
                    <div className="cert-corner corner-tr"></div>
                    <div className="cert-corner corner-bl"></div>
                    <div className="cert-corner corner-br"></div>

                    {/* Certificate Header */}
                    <div className="cert-header">
                      <div className="cert-logo-wrap">
                        <img src={LOGO} alt="ADORN" className="cert-logo" />
                      </div>
                      <div className="cert-org-title">
                        ADORN ACADEMY OF NETWORK &amp; INFRASTRUCTURE TECHNOLOGY
                      </div>
                      <div className="cert-reg-sub">
                        DUBAI, UNITED ARAB EMIRATES &bull; ACCREDITED TECHNICAL TRAINING
                      </div>
                      <div className="cert-divider-line"></div>
                      <h1 className="cert-award-title">CERTIFICATE OF ACHIEVEMENT</h1>
                      <p className="cert-award-sub">THIS IS TO OFFICIALLY CERTIFY THAT</p>
                    </div>

                    {/* Candidate Name */}
                    <div className="cert-candidate-block">
                      <div className="cert-candidate-name">{cert.candidateName}</div>
                      {cert.company && (
                        <div className="cert-candidate-company">Representing: {cert.company}</div>
                      )}
                    </div>

                    <p className="cert-body-text">
                      has successfully satisfied all rigorous curriculum benchmarks, practical lab assessments, and examination requirements prescribed for the certification of
                    </p>

                    {/* Course Title */}
                    <div className="cert-course-block">
                      <div className="cert-course-title">{cert.courseName}</div>
                      <div className="cert-grade-tag">Performance: {cert.grade || 'Certified Practitioner'}</div>
                    </div>

                    {/* Certificate Footer Row */}
                    <div className="cert-footer-row">
                      {/* Left: Signatures */}
                      <div className="cert-col cert-sig-col">
                        <div className="cert-sig-line">
                          <span className="cert-sig-hand">Eng. Tariq Al Nuaimi</span>
                        </div>
                        <div className="cert-sig-title">Head of Technical Training</div>
                        <div className="cert-sig-sub">ADORN Academy, Dubai</div>
                      </div>

                      {/* Center: Official Seal Badge */}
                      <div className="cert-col cert-seal-col">
                        <div className="cert-official-seal">
                          <div className="seal-ring-outer">
                            <div className="seal-ring-inner">
                              <i className="fas fa-award seal-icon"></i>
                              <span className="seal-txt">ADORN CERTIFIED</span>
                              <span className="seal-sub">DUBAI &bull; UAE</span>
                            </div>
                          </div>
                        </div>
                        <div className="cert-meta-info">
                          <div><strong>Certificate ID:</strong> {format12Digits(cert.certNumber)}</div>
                          <div><strong>Issue Date:</strong> {cert.issueDate} &bull; <strong>Valid:</strong> {cert.expiryDate || 'Lifetime'}</div>
                        </div>
                      </div>

                      {/* Right: QR Code & Verification */}
                      <div className="cert-col cert-qr-col">
                        <div className="cert-qr-box">
                          <QRCodeView value={verifyUrl} size={110} color="#322160" />
                        </div>
                        <div className="cert-qr-label">
                          <i className="fas fa-qrcode"></i> Scan to Verify Credential
                        </div>
                        <div className="cert-qr-url">adornconnect.com/verify</div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {!loading && result && !result.success && (
          <div className="verify-error-card no-print">
            <div className="vec-icon">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h2>Credential Not Found</h2>
            <p>
              We could not find an official certificate matching ID: <strong>{format12Digits(searchedNum)}</strong>.
            </p>
            <div className="vec-tips">
              <h4>Possible Reasons:</h4>
              <ul>
                <li>The 12-digit number was typed incorrectly. Please verify all digits on the printed certificate.</li>
                <li>The certificate was recently issued and may take up to 24 hours to sync to the online registry.</li>
                <li>The credential has been archived or revoked.</li>
              </ul>
            </div>
            <div className="vec-actions">
              <button
                className="btn-act btn-act-primary"
                onClick={() => { setCertInput(''); setResult(null); }}
              >
                <i className="fas fa-redo"></i> Try Another Number
              </button>
              <Link to="/academy" className="btn-act btn-act-outline">
                <i className="fas fa-graduation-cap"></i> Explore ADORN Academy Courses
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

