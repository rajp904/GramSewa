const Admin = require('../models/Admin');
const generateToken = require('../utils/generateToken');

// @desc    Admin login
// @route   POST /api/admin/login
// @access  Public
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Find admin with password field
    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin || !admin.isActive) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordMatch = await admin.matchPassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken(admin._id);

    res.status(200).json({
      success: true,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      },
      token
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create new admin (Super Admin only)
// @route   POST /api/admin/create
// @access  Private/SuperAdmin
exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this email already exists' });
    }

    // Create new admin
    const admin = await Admin.create({
      name,
      email,
      password,
      role: role || 'admin'
    });

    res.status(201).json({
      success: true,
      message: 'Admin created successfully',
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Create admin error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all admins (Super Admin only)
// @route   GET /api/admin/list
// @access  Private/SuperAdmin
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select('-password');
    
    res.status(200).json({
      success: true,
      count: admins.length,
      admins
    });
  } catch (error) {
    console.error('Get admins error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
