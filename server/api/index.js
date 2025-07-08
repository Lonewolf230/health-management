require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors({
  origin:['http://localhost:3000','https://health-management-sand.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials:true,
}));
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.send('API is running');
});

// Connect to MongoDB


// TODO: Add routes for auth, doctors, appointments
const authRoutes = require('../routes/auth');
const doctorRoutes = require('../routes/doctors');
const appointmentRoutes = require('../routes/appointments');

app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);

const PORT = process.env.PORT || 5000;
console.log(PORT);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 

module.exports=app;