const express = require('express');
const router = express.Router();
const { landingPage, detailPage, category, checkout } = require('./controller')  // Tempat Bisnis Logic

// Middelware JWT
const { isLoginPlayer } = require('../middleware/auth')

/* GET home page. */
router.get('/landingpage', landingPage);
router.get('/:id/detail', detailPage);
router.get('/category', category);
router.post('/checkout', isLoginPlayer, checkout);

module.exports = router;