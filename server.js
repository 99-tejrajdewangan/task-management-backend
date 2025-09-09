require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();
app.use(express.json());

// ✅ Allow multiple frontend origins (local + deployed)
const allowedOrigins = [
  'http://localhost:5000',
  'http://localhost:5173',
  'https://task-management-frontend-olive-nine.vercel.app' // your Vercel frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman, curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error('CORS policy: Origin not allowed'), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// simple error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch((err) => console.error('Mongo connect error', err));

