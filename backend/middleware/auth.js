const jwt = require('jsonwebtoken');
const admin = require('../config/firebase');
const User = require('../models/User');
const Admin = require('../models/Admin');

// Protect user routes - verify Firebase token
exports.protectUser = async (req, res, next) => {
  try {
    if (!admin) {
      return res.status(500).json({ message: 'Firebase authentication not configured' });
    }

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    // Verify Firebase token
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // Find user in database
    const user = await User.findOne({ googleId: decodedToken.uid });
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

// Protect admin routes - verify JWT token
exports.protectAdmin = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find admin in database
    const adminUser = await Admin.findById(decoded.id);
    
    if (!adminUser || !adminUser.isActive) {
      return res.status(401).json({ message: 'Admin not found or inactive' });
    }

    req.admin = adminUser;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

// Check if admin is superadmin
exports.isSuperAdmin = (req, res, next) => {
  if (req.admin && req.admin.role === 'superadmin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Super Admin only.' });
  }
};
