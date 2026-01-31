const mongoose = require('mongoose');

const ShiftSchema = new mongoose.Schema({
  name: { type: String, required: true },
  start: { type: String, required: true },
  end: { type: String, required: true },
  days: [String],
  staff: { type: Number, default: 1 },
  manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Shift', ShiftSchema);