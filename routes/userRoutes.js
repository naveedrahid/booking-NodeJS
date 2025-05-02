const express = require('express');
const user = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/user', protect , user.getUsers);
router.get('/user/:id', protect , user.getUserById);
router.post('/user', protect, user.createUser);
router.put('/user/:id', protect, user.update);
router.delete('/user/:id', protect, user.delete);

module.exports = router;