const express = require('express');
const router = express.Router();
const { index, viewCreate, actionCreate, viewEdit, actionEdit, actionDelete } = require('./controller')  // Tempat Bisnis Logic

/* Nominal */
router.get('/', index);
router.get('/create', viewCreate);
router.post('/create', actionCreate);
router.get('/edit/:id', viewEdit);
router.put('/edit/:id', actionEdit);
router.delete('/delete/:id', actionDelete);

module.exports = router;