const express = require('express');
const router = express.Router();
const getPrivateData = require('../controllers/privatedata');
const protect = require('../middleware/authMiddleware');

router.get('/private', protect, getPrivateData);

module.exports = router;
