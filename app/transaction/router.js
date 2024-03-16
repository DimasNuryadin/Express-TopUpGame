const express = require('express');
const router = express.Router();
const { index } = require('./controller')  // Tempat Bisnis Logic

// Middleware login
const { isLoginAdmin } = require('../middleware/auth')
router.use(isLoginAdmin)

/* Payment */
router.get('/', index);

module.exports = router;