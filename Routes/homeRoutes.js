const express = require('express');
const router = express.Router()
const homeController = require('../Controller/homeController.js');
const { model } = require('mongoose');


router.get('/', homeController.homePage)


module.exports = router;