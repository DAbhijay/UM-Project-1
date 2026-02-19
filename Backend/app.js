const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const serviceRoutes = require('./routes/serviceRoutes');

const app = express();

// ─── Middleware ──────────────────────────────────────────────
app.use(cors());                           // Allow frontend to call API
app.use(express.json());                   // Parse JSON request bodies
app.use(express.urlencoded({ extended: true }));

// ─── API Routes ──────────────────────────────────────────────
app.use('/api/auth', authRoutes);          // Authentication routes
app.use('/api/services', serviceRoutes);   // Service request routes

// ─── Health Check Endpoint ───────────────────────────────────
app.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Mall & Home Utility Services API is running',
    timestamp: new Date().toISOString()
  });
});

// ─── 404 Handler ─────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: `Route ${req.method} ${req.path} not found` 
  });
});

// ─── Error Handler ───────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

module.exports = app;