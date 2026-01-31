const express = require('express');
const Shift = require('../models/Shift');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all shifts for manager
router.get('/', auth('manager'), async (req, res) => {
  const shifts = await Shift.find({ manager: req.user.id });
  res.json(shifts);
});

// Add shift
router.post('/', auth('manager'), async (req, res) => {
  const { name, start, end, days, staff } = req.body;
  if (!name || !start || !end) return res.status(400).json({ msg: 'Name, start, end required' });
  const shift = new Shift({ name, start, end, days, staff, manager: req.user.id });
  await shift.save();
  res.json(shift);
});

// Delete shift
router.delete('/:id', auth('manager'), async (req, res) => {
  await Shift.deleteOne({ _id: req.params.id, manager: req.user.id });
  res.json({ msg: 'Shift deleted' });
});

module.exports = router;
