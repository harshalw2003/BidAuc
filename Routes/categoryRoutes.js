const express = require('express');
const router = express.Router();
const path = require('path');
const categoryController = require('../Controller/categoryController.js');
const authMiddleware = require('../Middlewares/auth.js');
// const upload = require('../Controller/upload.js');

// router.get('/getAllCategories', authMiddleware.authenticateToken, categoryController.getAllCategories  )
router.get('/getAllCategories', categoryController.getAllCategories  )
router.post('/getOneCategory', categoryController.getOneCategory  )


module.exports = router;