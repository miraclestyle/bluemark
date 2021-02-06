const express = require('express');
const products = require('./products');
const locations = require('./locations');
const movements = require('./movements');

const router = express.Router();

router.use(express.json());

router.use((req, res, next) => {
  console.log(req.method, req.path, req.params, req.body);
  next();
});

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

router.use(products);
router.use(locations);
router.use(movements);

module.exports = router;
