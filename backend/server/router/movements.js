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

const getMovements = (req) => ([req.params.product_id, req.params.location_path]);
const insertMovementEntries = (req) => ([
  req.body.product_id,
  req.body.entries.map((entry) => ([
    entry.location_path,
    entry.quantity_in,
    entry.quantity_out,
  ])),
]);

router.get(
  '/api/movements/:product_id/:location_path',
  requestHandler(db.getMovements, getMovements
));
router.post(
  '/api/movements',
  requestHandler(db.insertMovementEntries, insertMovementEntries
));

module.exports = router;
