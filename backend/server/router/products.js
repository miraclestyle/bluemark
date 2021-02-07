const express = require('express');
const requestHandler = require('./request_handler');
const db = require('../database');

const router = express.Router();

const getProducts = (req) => ([req.query.limit, req.query.offset]);
const getProduct = (req) => ([req.params.id]);
const insertProduct = (req) => ([req.body.name, req.body.description]);
const updateProduct = (req) => ([req.params.id, req.body.name, req.body.description]);

router.get('/api/products', requestHandler(db.getProducts, getProducts));
router.get('/api/products/:id', requestHandler(db.getProduct, getProduct));
router.post('/api/products', requestHandler(db.insertProduct, insertProduct));
router.post('/api/products/:id', requestHandler(db.updateProduct, updateProduct));

module.exports = router;
