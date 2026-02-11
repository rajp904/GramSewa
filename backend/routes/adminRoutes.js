const express = require('express');
const { loginAdmin, createAdmin, getAllAdmins } = require('../controllers/adminController');
const { protectAdmin, isSuperAdmin } = require('../middleware/auth');

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/create', protectAdmin, isSuperAdmin, createAdmin);
router.get('/list', protectAdmin, isSuperAdmin, getAllAdmins);

module.exports = router;
