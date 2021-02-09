const express = require('express');
const requestHandler = require('./request_handler');
const db = require('../database');

const router = express.Router();

const getMovements = (req) => ([
  Number(req.params.product_id),
  Number(req.params.location_path),
]);
const insertMovementEntries = (req) => ([
  Number(req.body.product_id),
  req.body.entries.map((entry) => ([
    String(entry.location_path),
    Number(entry.quantity_in),
    Number(entry.quantity_out),
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
