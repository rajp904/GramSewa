const express = require('express');
const {
  createComplaint,
  getMyComplaints,
  getPublicComplaints,
  getComplaintById
} = require('../controllers/complaintController');
const { protectUser } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/', protectUser, upload.single('image'), createComplaint);
router.get('/my', protectUser, getMyComplaints);
router.get('/public', getPublicComplaints);
router.get('/:id', getComplaintById);

module.exports = router;
