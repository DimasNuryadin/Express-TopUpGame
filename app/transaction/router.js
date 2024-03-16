const express = require('express');
const router = express.Router();
const { index, actionStatus, viewDetail } = require('./controller')  // Tempat Bisnis Logic

// Middleware login
const { isLoginAdmin } = require('../middleware/auth')
router.use(isLoginAdmin)

/* Payment */
router.get('/', index);
router.put('/status/:id', actionStatus);
router.get('/detail/:id', viewDetail);

module.exports = router;