const express = require('express');
const roleController = require('../controllers/roleController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/roles', protect, roleController.view);
router.get('/roles/:id', protect, roleController.viewById);
router.post('/roles', protect, roleController.create);
router.put('/roles/edit/:id', protect, roleController.update);
router.delete('/roles/:id', protect, roleController.delete);

module.exports = router;