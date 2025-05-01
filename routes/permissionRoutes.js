const express = require('express');
const permissionController = require('../controllers/permissionController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/permissions', protect, permissionController.view);
router.get('/permissions/:id', protect, permissionController.viewById);
router.post('/permissions', protect, permissionController.create);
router.put('/permissions/:id', protect, permissionController.update);
router.delete('/permissions/:id', protect, permissionController.delete);

module.exports = router;