const express = require('express');
const db = require('../database');

const router = express.Router();

const requestHandler = (query, argsFormater) => {
  return (req, res) => {
    query(...argsFormater(req))
      .then((data) => {
        console.log(`${query.name} data:`, data);
        res.status(200).json(data);
      })
      .catch((error) => {
        console.log(`${query.name} error:`, error);
        res.status(500).end('Something went wrong. Please try again later.');
      });
  };
};

const getProducts = (req) => ([req.query.limit, req.query.offset]);
const getProduct = (req) => ([req.params.id]);
const insertProduct = (req) => ([req.body.name, req.body.description]);
const updateProduct = (req) => ([req.params.id, req.body.name, req.body.description]);

router.get('/api/products', requestHandler(db.getProducts, getProducts));
router.get('/api/products/:id', requestHandler(db.getProduct, getProduct));
router.post('/api/products', requestHandler(db.insertProduct, insertProduct));
router.post('/api/products/:id', requestHandler(db.updateProduct, updateProduct));

module.exports = router;
