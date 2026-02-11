const Complaint = require('../models/Complaint');
const uploadToCloudinary = require('../utils/cloudinaryUpload');

// @desc    Create new complaint
// @route   POST /api/complaints
// @access  Private/User
exports.createComplaint = async (req, res) => {
  try {
    const { title, category, description, latitude, longitude, address } = req.body;

    if (!title || !category || !description || !latitude || !longitude) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image' });
    }

    // Upload image to Cloudinary
    const result = await uploadToCloudinary(req.file.buffer);

    // Create complaint
    const complaint = await Complaint.create({
      title,
      category,
      description,
      imageUrl: result.secure_url,
      location: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        address
      },
      createdBy: req.user._id
    });

    const populatedComplaint = await Complaint.findById(complaint._id).populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Complaint created successfully',
      complaint: populatedComplaint
    });
  } catch (error) {
    console.error('Create complaint error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get user's complaints
// @route   GET /api/complaints/my
// @access  Private/User
exports.getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ createdBy: req.user._id })
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: complaints.length,
      complaints
    });
  } catch (error) {
    console.error('Get my complaints error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all complaints (public feed)
// @route   GET /api/complaints/public
// @access  Public
exports.getPublicComplaints = async (req, res) => {
  try {
    // Only show complaints that are Approved, In Progress, or Solved
    const complaints = await Complaint.find({
      status: { $in: ['Approved', 'In Progress', 'Solved'] }
    })
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json({
      success: true,
      count: complaints.length,
      complaints
    });
  } catch (error) {
    console.error('Get public complaints error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get complaint by ID
// @route   GET /api/complaints/:id
// @access  Public
exports.getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate('createdBy', 'name email photoURL')
      .populate('assignedTo', 'name email')
      .populate('statusHistory.updatedBy', 'name email');

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.status(200).json({
      success: true,
      complaint
    });
  } catch (error) {
    console.error('Get complaint error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
