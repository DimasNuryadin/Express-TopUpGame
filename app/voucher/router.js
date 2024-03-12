const express = require('express');
const router = express.Router();
const { index, viewCreate, actionCreate } = require('./controller')  // Tempat Bisnis Logic
const multer = require('multer')
const os = require('os')

/* Nominal */
router.get('/', index);
router.get('/create', viewCreate);
router.post('/create', multer({ dest: os.tmpdir() }).single('thumbnail'), actionCreate);
// router.get('/edit/:id', viewEdit);
// router.put('/edit/:id', actionEdit);
// router.delete('/delete/:id', actionDelete);

module.exports = router;