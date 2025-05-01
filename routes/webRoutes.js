const express = require('express');
const router =  express.Router();

const userRoutes = require('./userRoutes');
const roleRoutes = require('./roleRoutes');
const permissionRoutes = require('./permissionRoutes');

router.use(userRoutes);
router.use(roleRoutes);
router.use(permissionRoutes);

module.exports = router;