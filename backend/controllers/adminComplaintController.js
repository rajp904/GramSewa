const Complaint = require('../models/Complaint');

// @desc    Get all complaints with filters (Admin)
// @route   GET /api/admin/complaints
// @access  Private/Admin
exports.getAllComplaints = async (req, res) => {
  try {
    const { category, status, search, page = 1, limit = 20 } = req.query;

    // Build query
    const query = {};

    if (category) {
      query.category = category;
    }

    if (status) {
      query.status = status;
    }

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const complaints = await Complaint.find(query)
      .populate('createdBy', 'name email photoURL')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Complaint.countDocuments(query);

    res.status(200).json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      complaints
    });
  } catch (error) {
    console.error('Get all complaints error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update complaint status (Admin)
// @route   PUT /api/admin/complaints/:id/status
// @access  Private/Admin
exports.updateComplaintStatus = async (req, res) => {
  try {
    const { status, remark } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    const validStatuses = ['Pending', 'Approved', 'In Progress', 'Solved', 'Rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Update status
    complaint.status = status;

    // Add to status history
    complaint.statusHistory.push({
      status,
      remark: remark || `Status updated to ${status}`,
      updatedBy: req.admin._id,
      timestamp: new Date()
    });

    await complaint.save();

    const updatedComplaint = await Complaint.findById(complaint._id)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .populate('statusHistory.updatedBy', 'name email');

    res.status(200).json({
      success: true,
      message: 'Status updated successfully',
      complaint: updatedComplaint
    });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Assign complaint to admin (Admin)
// @route   PUT /api/admin/complaints/:id/assign
// @access  Private/Admin
exports.assignComplaint = async (req, res) => {
  try {
    const { adminId } = req.body;

    if (!adminId) {
      return res.status(400).json({ message: 'Admin ID is required' });
    }

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    complaint.assignedTo = adminId;
    await complaint.save();

    const updatedComplaint = await Complaint.findById(complaint._id)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email');

    res.status(200).json({
      success: true,
      message: 'Complaint assigned successfully',
      complaint: updatedComplaint
    });
  } catch (error) {
    console.error('Assign complaint error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get complaint statistics (Admin)
// @route   GET /api/admin/complaints/stats
// @access  Private/Admin
exports.getComplaintStats = async (req, res) => {
  try {
    const totalComplaints = await Complaint.countDocuments();
    const pendingComplaints = await Complaint.countDocuments({ status: 'Pending' });
    const approvedComplaints = await Complaint.countDocuments({ status: 'Approved' });
    const inProgressComplaints = await Complaint.countDocuments({ status: 'In Progress' });
    const solvedComplaints = await Complaint.countDocuments({ status: 'Solved' });
    const rejectedComplaints = await Complaint.countDocuments({ status: 'Rejected' });

    const categoryStats = await Complaint.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      stats: {
        total: totalComplaints,
        pending: pendingComplaints,
        approved: approvedComplaints,
        inProgress: inProgressComplaints,
        solved: solvedComplaints,
        rejected: rejectedComplaints,
        byCategory: categoryStats
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
