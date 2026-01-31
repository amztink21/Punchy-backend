require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Health check route
app.get('/', (req, res) => {
  res.send('Punchy Rota Backend API running');
});

// TODO: Add routes for auth, managers, staff, rota, leave

const staffRoutes = require('./routes/staff');
const shiftRoutes = require('./routes/shifts');
const assignmentRoutes = require('./routes/assignments');
const leaveRoutes = require('./routes/leave');
const adminRoutes = require('./routes/admin');
require('./backup/autoBackup');

app.use('/api/auth', require('./routes/auth'));
app.use('/api/staff', staffRoutes);
app.use('/api/shifts', shiftRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/leave', leaveRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
