const express = require('express');
const router = express.Router();
const {
  getCertificates,
  getCertificate,
  addCertificate,
  updateCertificate,
  deleteCertificate
} = require('../db');

// GET all certificates (Admin or filter query)
router.get('/', (req, res) => {
  const { status, search, number } = req.query;

  // Direct lookup by certificate number if queried
  if (number) {
    const cert = getCertificate(number);
    if (!cert) return res.status(404).json({ found: false, error: 'Certificate not found' });
    return res.json({ found: true, certificate: cert });
  }

  let list = getCertificates();

  if (status && status !== 'all') {
    list = list.filter(c => c.status && c.status.toLowerCase() === status.toLowerCase());
  }

  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    const qClean = q.replace(/[\s-]/g, '');
    list = list.filter(c => {
      const numClean = (c.certNumber || '').replace(/[\s-]/g, '').toLowerCase();
      return (
        numClean.includes(qClean) ||
        (c.candidateName && c.candidateName.toLowerCase().includes(q)) ||
        (c.courseName && c.courseName.toLowerCase().includes(q)) ||
        (c.company && c.company.toLowerCase().includes(q)) ||
        (c.email && c.email.toLowerCase().includes(q))
      );
    });
  }

  res.json(list);
});

// GET public verification endpoint by 12-digit number or ID
router.get('/verify/:number', (req, res) => {
  const cert = getCertificate(req.params.number);
  if (!cert) {
    return res.status(404).json({
      found: false,
      error: 'No certificate found with this 12-digit credential number.'
    });
  }

  res.json({
    found: true,
    certificate: {
      id: cert.id,
      certNumber: cert.certNumber,
      candidateName: cert.candidateName,
      company: cert.company || '',
      courseName: cert.courseName,
      courseId: cert.courseId || '',
      issueDate: cert.issueDate,
      expiryDate: cert.expiryDate || 'Lifetime',
      grade: cert.grade || 'Certified',
      issuer: cert.issuer || 'ADORN Academy Technical Board',
      trainerName: cert.trainerName || '',
      status: cert.status || 'Active',
      created_at: cert.created_at
    }
  });
});

// POST new certificate (Admin)
router.post('/', (req, res) => {
  const { candidateName, courseName } = req.body;
  if (!candidateName || !candidateName.trim()) {
    return res.status(400).json({ error: 'Candidate name is required' });
  }
  if (!courseName || !courseName.trim()) {
    return res.status(400).json({ error: 'Course name is required' });
  }

  // Validate 12-digit number if supplied
  if (req.body.certNumber) {
    const cleanNum = req.body.certNumber.toString().replace(/[\s-]/g, '');
    if (!/^\d{12}$/.test(cleanNum)) {
      return res.status(400).json({ error: 'Certificate number must be exactly 12 digits' });
    }
    const existing = getCertificate(cleanNum);
    if (existing) {
      return res.status(409).json({ error: 'A certificate with this 12-digit number already exists' });
    }
  }

  const cert = addCertificate(req.body);
  res.status(201).json({ success: true, certificate: cert });
});

// PUT update certificate (Admin)
router.put('/:id', (req, res) => {
  const updated = updateCertificate(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Certificate not found' });
  res.json({ success: true, certificate: updated });
});

// DELETE certificate (Admin)
router.delete('/:id', (req, res) => {
  const deleted = deleteCertificate(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Certificate not found' });
  res.json({ success: true });
});

module.exports = router;

