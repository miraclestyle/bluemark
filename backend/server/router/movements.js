const express = require('express');
const requestHandler = require('./request_handler');
const db = require('../database');

const router = express.Router();

const getInventory = (req) => ([
  Number(req.params.productId),
  String(req.params.locationPath || ''),
]);
const insertMovementEntries = (req) => ([
  Number(req.body.productId),
  req.body.entries.map((entry) => ([
    String(entry.locationPath),
    Number(entry.quantityIn),
    Number(entry.quantityOut),
  ])),
]);

router.get(
  '/api/movements/:product_id/:location_path?',
  requestHandler(db.getInventory, getInventory)
);
router.post(
  '/api/movements',
  requestHandler(db.insertMovementEntries, insertMovementEntries)
);

module.exports = router;
