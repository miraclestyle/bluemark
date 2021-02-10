const express = require('express');
const requestHandler = require('./request_handler');
const db = require('../database');

const router = express.Router();

const getProducts = (req) => ([
  req.query.limit === undefined ? null : Number(req.query.limit),
  req.query.offset === undefined ? null : Number(req.query.offset),
]);
const insertProduct = (req) => ([
  String(req.body.name),
  String(req.body.description),
]);
const updateProduct = (req) => ([
  Number(req.params.id),
  String(req.body.name),
  String(req.body.description),
]);

router.get(
  '/api/products',
  requestHandler(db.getProducts, getProducts)
);
router.post(
  '/api/products',
  requestHandler(db.insertProduct, insertProduct)
);
router.post(
  '/api/products/:id',
  requestHandler(db.updateProduct, updateProduct)
);

module.exports = router;
