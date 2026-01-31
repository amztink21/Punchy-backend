const mongoose = require('mongoose');

const LeaveSchema = new mongoose.Schema({
  staff: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
  days: [String], // Array of YYYY-MM-DD
  type: { type: String, enum: ['annual', 'request'], required: true },
  manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Leave', LeaveSchema);