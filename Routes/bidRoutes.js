const express = require('express');
const router = express.Router();
const path = require('path');
const bidController = require('../Controller/bidController.js');
const authMiddleware = require('../Middlewares/auth.js');
// const upload = require('../Controller/upload.js');


router.post('/post', authMiddleware.authenticateToken,bidController.postBid)
router.post('/getOneJobBids', authMiddleware.authenticateToken, bidController.getOneJobBids)
router.post('/acceptedBids', authMiddleware.authenticateToken, bidController.acceptedBids)


module.exports = router;