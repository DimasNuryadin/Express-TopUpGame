const express = require('express');
const router = express.Router();
const { index, viewCreate, actionCreate, viewEdit, actionEdit, actionDelete } = require('./controller')  // Tempat Bisnis Logic
// Multer
const multer = require('multer')
const os = require('os')

/* Nominal */
router.get('/', index);
router.get('/create', viewCreate);
router.post('/create', multer({ dest: os.tmpdir() }).single('thumbnail'), actionCreate);
router.get('/edit/:id', viewEdit);
router.put('/edit/:id', multer({ dest: os.tmpdir() }).single('thumbnail'), actionEdit);
router.delete('/delete/:id', actionDelete);

module.exports = router;