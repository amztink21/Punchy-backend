const express = require('express');
const Staff = require('../models/Staff');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all staff for manager
router.get('/', auth('manager'), async (req, res) => {
  const staff = await Staff.find({ manager: req.user.id });
  res.json(staff);
});

// Add staff
router.post('/', auth('manager'), async (req, res) => {
  const { name, monthlyHours } = req.body;
  if (!name || !monthlyHours) return res.status(400).json({ msg: 'Name and hours required' });
  const staff = new Staff({ name, monthlyHours, manager: req.user.id });
  await staff.save();
  res.json(staff);
});

// Delete staff
router.delete('/:id', auth('manager'), async (req, res) => {
  await Staff.deleteOne({ _id: req.params.id, manager: req.user.id });
  res.json({ msg: 'Staff deleted' });
});

module.exports = router;
