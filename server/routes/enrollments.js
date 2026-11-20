const express = require('express');
const router = express.Router();
const { getEnrollments, getEnrollment, addEnrollment, updateEnrollment, deleteEnrollment } = require('../db');

// GET all enrollments (with optional filtering)
router.get('/', (req, res) => {
  const { status, course, emirate, search } = req.query;
  let list = getEnrollments();

  if (status && status !== 'all') {
    list = list.filter(e => e.status && e.status.toLowerCase() === status.toLowerCase());
  }

  if (course && course !== 'all') {
    list = list.filter(e => e.courseName && e.courseName.toLowerCase().includes(course.toLowerCase()));
  }

  if (emirate && emirate !== 'all') {
    list = list.filter(e => e.emirate && e.emirate.toLowerCase() === emirate.toLowerCase());
  }

  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    list = list.filter(e =>
      (e.fullName && e.fullName.toLowerCase().includes(q)) ||
      (e.email && e.email.toLowerCase().includes(q)) ||
      (e.phone && e.phone.toLowerCase().includes(q)) ||
      (e.company && e.company.toLowerCase().includes(q)) ||
      (e.courseName && e.courseName.toLowerCase().includes(q)) ||
      (e.id && e.id.toLowerCase().includes(q))
    );
  }

  res.json(list);
});

// GET single enrollment by ID
router.get('/:id', (req, res) => {
  const item = getEnrollment(req.params.id);
  if (!item) return res.status(404).json({ error: 'Enrollment not found' });
  res.json(item);
});

// POST new enrollment registration
router.post('/', (req, res) => {
  const {
    courseName,
    fullName,
    email,
    phone,
    emirate,
    company,
    designation,
    trainingMode,
    preferredBatch,
    siraLicense,
    notes
  } = req.body;

  if (!courseName || !courseName.trim()) {
    return res.status(400).json({ error: 'Course selection is required' });
  }

  if (!fullName || !fullName.trim()) {
    return res.status(400).json({ error: 'Full name is required' });
  }

  if (!email || !email.trim()) {
    return res.status(400).json({ error: 'Email address is required' });
  }

  if (!phone || !phone.trim()) {
    return res.status(400).json({ error: 'Phone / WhatsApp number is required' });
  }

  const enrollment = addEnrollment({
    courseName: courseName.trim(),
    fullName: fullName.trim(),
    email: email.trim(),
    phone: phone.trim(),
    emirate: emirate || 'Dubai',
    company: company ? company.trim() : 'Individual',
    designation: designation ? designation.trim() : 'Technical Professional',
    trainingMode: trainingMode || 'In-Person Dubai Lab',
    preferredBatch: preferredBatch || 'Weekend Batch',
    siraLicense: siraLicense ? siraLicense.trim() : '',
    notes: notes ? notes.trim() : '',
    status: 'Pending'
  });

  res.json({ success: true, enrollment });
});

// PUT update status or details
router.put('/', (req, res) => {
  const id = req.query.id || req.body.id;
  if (!id) return res.status(400).json({ error: 'Enrollment ID is required' });

  const updated = updateEnrollment(id, req.body);
  if (!updated) return res.status(404).json({ error: 'Enrollment not found' });

  res.json({ success: true, enrollment: updated });
});

// DELETE enrollment
router.delete('/', (req, res) => {
  const id = req.query.id || req.body.id;
  if (!id) return res.status(400).json({ error: 'Enrollment ID is required' });

  const ok = deleteEnrollment(id);
  if (!ok) return res.status(404).json({ error: 'Enrollment not found' });

  res.json({ success: true });
});

module.exports = router;

