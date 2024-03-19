const express = require('express');
const router = express.Router();
const { landingPage, detailPage, category, checkout, history, historyDetail, dashboard, profile } = require('./controller')  // Tempat Bisnis Logic

// Middelware JWT
const { isLoginPlayer } = require('../middleware/auth')

/* GET home page. */
router.get('/landingpage', landingPage);
router.get('/:id/detail', detailPage);
router.get('/category', category);
router.post('/checkout', isLoginPlayer, checkout);
router.get('/history', isLoginPlayer, history);
router.get('/history/:id/detail', isLoginPlayer, historyDetail);
router.get('/dashboard', isLoginPlayer, dashboard);
router.get('/profile', isLoginPlayer, profile);

module.exports = router;