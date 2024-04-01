const express = require('express');
const router = express.Router();
const { signUp, signIn } = require('./controller')  // Tempat Bisnis Logic

// Multer
const multer = require('multer')
const os = require('os')

const vercelCors = require('../middleware/auth')

/* GET home page. */
router.post('/signup', multer({ dest: os.tmpdir() }).single('image'), signUp);
router.post('/signin', vercelCors(signIn))

module.exports = router;