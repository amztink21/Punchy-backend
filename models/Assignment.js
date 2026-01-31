const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
  staff: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
  shift: { type: mongoose.Schema.Types.ObjectId, ref: 'Shift', required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Assignment', AssignmentSchema);