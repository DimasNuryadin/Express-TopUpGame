const express = require('express');
const router = express.Router();
const { viewSignIn, actionSignIn } = require('./controller')  // Tempat Bisnis Logic

/* Nominal */
router.get('/', viewSignIn);
router.post('/', actionSignIn);

module.exports = router;