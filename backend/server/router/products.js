const express = require('express');
const db = require('../database');

const router = express.Router();

router.get('/api/products/:id', (req, res, next) => {
  console.log('/api/products endpoint reached', req.params);
  res.status(200).type('application/json').end('/api/products endpoint reached\n');
});

module.exports = router;
