const admin = require('../config/firebase');
const User = require('../models/User');

// @desc    Google OAuth login/register
// @route   POST /api/auth/google
// @access  Public
exports.googleAuth = async (req, res) => {
  try {
    if (!admin) {
      return res.status(500).json({ message: 'Firebase authentication not configured. Please check server configuration.' });
    }

    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ message: 'ID token is required' });
    }

    // Verify Firebase token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    const { uid, email, name, picture } = decodedToken;

    // Check if user exists
    let user = await User.findOne({ googleId: uid });

    if (!user) {
      // Create new user
      user = await User.create({
        name: name || email.split('@')[0],
        email,
        googleId: uid,
        photoURL: picture
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        photoURL: user.photoURL
      },
      token: idToken
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(401).json({ message: 'Authentication failed', error: error.message });
  }
};
