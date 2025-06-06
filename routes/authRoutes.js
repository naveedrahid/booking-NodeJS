const express = require('express');
const auth = require('../controllers/authController');
const router = express.Router();

router.post('/login', auth.login);
router.post('/logout', auth.logout);
router.post('/register', auth.register);
router.post('/forgot-password', auth.forgotPassword);
router.post('/reset-password', auth.resetPassword);

module.exports = router;