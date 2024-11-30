const express = require('express');
const router = express.Router();
const path = require('path');
const jobController = require('../Controller/jobController.js');
const authMiddleware = require('../Middlewares/auth.js');
// const upload = require('../Controller/upload.js');


router.post('/create', authMiddleware.authenticateToken,jobController.upload.single('jobImages'),jobController.createJob)
router.get('/getAllJobs',jobController.getAllPendingJobs)
router.get('/getSeekerAllJobs', authMiddleware.authenticateToken,jobController.getOneSeekerAllJobs)
router.get('/getSeekerCompletedJobs', authMiddleware.authenticateToken,jobController.getOneSeekerCompletedJobs)
router.get('/getSeekerPendingJobs', authMiddleware.authenticateToken,jobController.getOneSeekerPendingJobs)
router.get('/getSeekerCanceledJobs', authMiddleware.authenticateToken,jobController.getOneSeekerCanceledJobs)
router.post('/cancelSeekerJob', authMiddleware.authenticateToken,jobController.canceledJob)
router.post('/markAsCompleted', authMiddleware.authenticateToken,jobController.markAsCompleted)
router.get('/getProviderActiveJobs', authMiddleware.authenticateToken, jobController.getProviderActiveJobs)
router.get('/getProviderCompletedJobs', authMiddleware.authenticateToken, jobController.getProviderCompletedJobs)
router.get('/getProviderBidPostedJobs', authMiddleware.authenticateToken, jobController.getProviderBidPostedJobs)

// jobController.upload.single('jobImages'),
module.exports = router;