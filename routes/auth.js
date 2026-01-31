const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register admin or manager (admin only)
router.post('/register', async (req, res) => {
  try {
    const { username, password, name, role } = req.body;
    if (!username || !password || !name || !role) return res.status(400).json({ msg: 'All fields required' });
    const exists = await User.findOne({ username });
    if (exists) return res.status(400).json({ msg: 'Username already exists' });
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hash, name, role });
    await user.save();
    res.json({ msg: 'User registered', user: { username, name, role } });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', err });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, username: user.username, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', err });
  }
});

module.exports = router;
