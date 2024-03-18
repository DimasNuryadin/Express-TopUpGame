const express = require('express');
const router = express.Router();
const { landingPage, detailPage, category } = require('./controller')  // Tempat Bisnis Logic

/* GET home page. */
router.get('/landingpage', landingPage);
router.get('/:id/detail', detailPage);
router.get('/category', category);

module.exports = router;