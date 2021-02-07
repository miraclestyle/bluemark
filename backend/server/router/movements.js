const express = require('express');
const requestHandler = require('./request_handler');
const db = require('../database');

const router = express.Router();

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
