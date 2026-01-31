const express = require('express');
const Assignment = require('../models/Assignment');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all assignments for manager
router.get('/', auth('manager'), async (req, res) => {
  const assignments = await Assignment.find({ manager: req.user.id }).populate('staff shift');
  res.json(assignments);
});

// Add assignment
router.post('/', auth('manager'), async (req, res) => {
  const { staff, shift, date } = req.body;
  if (!staff || !shift || !date) return res.status(400).json({ msg: 'All fields required' });
  const assignment = new Assignment({ staff, shift, date, manager: req.user.id });
  await assignment.save();
  res.json(assignment);
});

// Delete assignment
router.delete('/:id', auth('manager'), async (req, res) => {
  await Assignment.deleteOne({ _id: req.params.id, manager: req.user.id });
  res.json({ msg: 'Assignment deleted' });
});

module.exports = router;
