const express = require('express');
const requestHandler = require('./request_handler');
const db = require('../database');

const router = express.Router();

const getInventory = (req) => ([
  Number(req.params.productId),
  req.params.locationId === undefined ? null : Number(req.params.locationId),
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
  '/api/movements/:productId/:locationId?',
  requestHandler(db.getInventory, getInventory)
);
router.post(
  '/api/movements',
  requestHandler(db.insertMovementEntries, insertMovementEntries)
);

module.exports = router;
