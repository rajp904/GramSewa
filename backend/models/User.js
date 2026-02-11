const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  photoURL: {
    type: String
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
