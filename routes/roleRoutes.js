const express = require('express');
const roleController = require('../controllers/roleController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/roles', protect, roleController.create);

module.exports = router;