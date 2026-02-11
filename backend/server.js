require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const Admin = require('./models/Admin');

// Debug: Check if environment variables are loaded
console.log('Environment check:');
console.log('- PORT:', process.env.PORT);
console.log('- MONGODB_URI:', process.env.MONGODB_URI ? 'Set ✓' : 'Not set ✗');
console.log('- FIREBASE_PROJECT_ID:', process.env.FIREBASE_PROJECT_ID ? 'Set ✓' : 'Not set ✗');
console.log('- FIREBASE_CLIENT_EMAIL:', process.env.FIREBASE_CLIENT_EMAIL ? 'Set ✓' : 'Not set ✗');
console.log('- CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME ? 'Set ✓' : 'Not set ✗');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/complaints', require('./routes/complaintRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/admin/complaints', require('./routes/adminComplaintRoutes'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'GramSewa API is running' });
});

// Create Super Admin on first run
const createSuperAdmin = async () => {
  try {
    const superAdminExists = await Admin.findOne({ role: 'superadmin' });
    
    if (!superAdminExists) {
      await Admin.create({
        name: process.env.SUPER_ADMIN_NAME || 'Super Admin',
        email: process.env.SUPER_ADMIN_EMAIL || 'admin@gramsewa.com',
        password: process.env.SUPER_ADMIN_PASSWORD || 'SuperAdmin@123',
        role: 'superadmin'
      });
      console.log('Super Admin created successfully');
    }
  } catch (error) {
    console.error('Error creating super admin:', error);
  }
};

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  createSuperAdmin();
});
