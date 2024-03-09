const express = require('express');
const router = express.Router();
const { index } = require('./controller')  // Tempat Bisnis Logic

/* GET home page. */
router.get('/', index);

module.exports = router;