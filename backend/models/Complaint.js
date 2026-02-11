const mongoose = require('mongoose');

const statusHistorySchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Approved', 'In Progress', 'Solved', 'Rejected']
  },
  remark: {
    type: String
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const complaintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Street Light', 'Road', 'Nala/Drainage', 'Water', 'School']
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  location: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    address: {
      type: String
    }
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Approved', 'In Progress', 'Solved', 'Rejected'],
    default: 'Pending'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  statusHistory: [statusHistorySchema]
}, {
  timestamps: true
});

// Add initial status to history on creation
complaintSchema.pre('save', function(next) {
  if (this.isNew) {
    this.statusHistory.push({
      status: 'Pending',
      remark: 'Complaint submitted',
      timestamp: new Date()
    });
  }
  next();
});

module.exports = mongoose.model('Complaint', complaintSchema);
