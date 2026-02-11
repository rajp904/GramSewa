const express = require('express');
const {
  getAllComplaints,
  updateComplaintStatus,
  assignComplaint,
  getComplaintStats
} = require('../controllers/adminComplaintController');
const { protectAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', protectAdmin, getAllComplaints);
router.get('/stats', protectAdmin, getComplaintStats);
router.put('/:id/status', protectAdmin, updateComplaintStatus);
router.put('/:id/assign', protectAdmin, assignComplaint);

module.exports = router;
