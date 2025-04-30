const express = require('express');
const router =  express.Router();

const userRoutes = require('./userRoutes');
const roleRoutes = require('./roleRoutes');

router.use(userRoutes, );
router.use(roleRoutes);

module.exports = router;