const express = require('express');
const router = express.Router();
const path = require('path');
const dashboardController = require('../Controller/dashboardController.js');
const authMiddleware = require('../Middlewares/auth.js');
// const upload = require('../Controller/upload.js');

router.get('/dashboard-overview', authMiddleware.authenticateToken, dashboardController.dashboardOverview  )


module.exports = router;