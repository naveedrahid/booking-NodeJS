const express = require('express');
const router =  express.Router();

const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const roleRoutes = require('./roleRoutes');
const permissionRoutes = require('./permissionRoutes');

router.use(authRoutes);
router.use(userRoutes);
router.use(roleRoutes);
router.use(permissionRoutes);

module.exports = router;