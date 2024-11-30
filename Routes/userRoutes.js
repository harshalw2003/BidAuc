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
router.get('/isLoggedIn',authMiddleware.authenticateToken)
router.post('/updatePersonalDetails', authMiddleware.authenticateToken, userController.updatePersonalDetails);
router.get('/getAllProviders', userController.getAllProviders);
router.post('/uploadProfilePicture',authMiddleware.authenticateToken, userController.upload.single('profilePicture'),userController.uploadProfilePicture),
router.get('/loadProfile', authMiddleware.authenticateToken, userController.getUserDetails),
router.get('/isProvider', authMiddleware.authenticateToken, userController.checkUserIsProvider)
router.get('/isSeeker', authMiddleware.authenticateToken, userController.checkUserIsSeeker)
// router.get('/getAllCategories', authMiddleware.authenticateToken, categoryController.getAllCategories  


module.exports = router;