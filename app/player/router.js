const express = require('express');
const router = express.Router();
const { landingPage } = require('./controller')  // Tempat Bisnis Logic

/* GET home page. */
router.get('/landingpage', landingPage);

module.exports = router;