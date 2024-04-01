const express = require('express');
const router = express.Router();
const { signUp, signIn } = require('./controller')  // Tempat Bisnis Logic
const vercelCors = require('../middleware/vercel')

// Multer
const multer = require('multer')
const os = require('os')


/* GET home page. */
router.post('/signup', multer({ dest: os.tmpdir() }).single('image'), signUp);
router.post('/signin', vercelCors, signIn)

module.exports = router;