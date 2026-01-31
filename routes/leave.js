const express = require('express');
const Leave = require('../models/Leave');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all leave for manager
router.get('/', auth('manager'), async (req, res) => {
  const leave = await Leave.find({ manager: req.user.id }).populate('staff');
  res.json(leave);
});

// Add leave
router.post('/', auth('manager'), async (req, res) => {
  const { staff, days, type } = req.body;
  if (!staff || !days || !type) return res.status(400).json({ msg: 'All fields required' });
  const leave = new Leave({ staff, days, type, manager: req.user.id });
  await leave.save();
  res.json(leave);
});

// Delete leave
router.delete('/:id', auth('manager'), async (req, res) => {
  await Leave.deleteOne({ _id: req.params.id, manager: req.user.id });
  res.json({ msg: 'Leave deleted' });
});

module.exports = router;
