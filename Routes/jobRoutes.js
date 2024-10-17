const express = require('express');
const router = express.Router();
const path = require('path');
const jobController = require('../Controller/jobController.js');
const authMiddleware = require('../Middlewares/auth.js');
// const upload = require('../Controller/upload.js');


router.post('/create', authMiddleware.authenticateToken,jobController.upload.single('jobImages'),jobController.createJob)
router.get('/getAllJobs',jobController.getAllJobs)
// jobController.upload.single('jobImages'),
module.exports = router;