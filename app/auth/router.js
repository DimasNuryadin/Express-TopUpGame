const express = require('express');
const router = express.Router();
const { signUp, signIn } = require('./controller')  // Tempat Bisnis Logic

// Multer
const multer = require('multer')
const os = require('os')

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

/* GET home page. */
router.post('/signup', multer({ dest: os.tmpdir() }).single('image'), signUp);
router.post('/signin', allowCors(signIn))

module.exports = router;