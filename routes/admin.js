const express = require('express');
const User = require('../models/User');
const Staff = require('../models/Staff');
const Shift = require('../models/Shift');
const Assignment = require('../models/Assignment');
const Leave = require('../models/Leave');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all users (admin only)
router.get('/users', auth('admin'), async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Delete a user (admin only)
router.delete('/users/:id', auth('admin'), async (req, res) => {
  await User.deleteOne({ _id: req.params.id });
  res.json({ msg: 'User deleted' });
});

// Get all data (admin only)
router.get('/data', auth('admin'), async (req, res) => {
  const users = await User.find();
  const staff = await Staff.find();
  const shifts = await Shift.find();
  const assignments = await Assignment.find();
  const leave = await Leave.find();
  res.json({ users, staff, shifts, assignments, leave });
});

module.exports = router;
