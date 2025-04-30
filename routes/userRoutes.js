const express = require('express');
const {getUsers, createUser, loginUser} = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/user/login', loginUser);
router.get('/user', protect , getUsers);
router.post('/user', protect, createUser);

module.exports = router;