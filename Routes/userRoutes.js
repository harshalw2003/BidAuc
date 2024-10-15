const express = require('express');
const router = express.Router();
const path = require('path');
const userController = require('../Controller/userController.js');
const authMiddleware = require('../Middlewares/auth.js');
// const upload = require('../Controller/upload.js');


router.post("/generateOtp", userController.generateOtp)
router.post('/register',userController.registerUser)
router.post('/login',userController.loginUser)
router.post('/logout',authMiddleware.authenticateToken,userController.logoutUser)
// router.post('/upload-profile',authMiddleware.authenticateToken,userController.upload.single('profilePicture'), userController.uploadProfile)
// // router.post('/update',userController.login)
// router.post('/updateDetail',authMiddleware.authenticateToken,userController.updateDetails)
// router.post('/logout',authMiddleware.authenticateToken,userController.logoutUser)
// // router.post('/upload-profile',authMiddleware.authenticateToken, userController.upload.single('profilePicture'),userController.uploadProfile)
// router.get('/admin',authMiddleware.authenticateToken,userController.userAdmin)
// router.get('/adminDashboard',authMiddleware.authenticateToken,userController.adminDashboard)


module.exports = router;