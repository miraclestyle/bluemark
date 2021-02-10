const express = require('express');
const requestHandler = require('./request_handler');
const db = require('../database');

const router = express.Router();

const getLocations = (req) => ([
  req.query.parentId === undefined ? null : Number(req.query.parentId),
]);
const getLocation = (req) => ([Number(req.params.id)]);
const insertLocation = (req) => ([
  String(req.body.name),
  req.body.parentId === null ? null : Number(req.body.parentId),
  String(req.body.description),
]);
const updateLocation = (req) => ([
  Number(req.params.id),
  String(req.body.name),
  String(req.body.description),
]);

router.get(
  '/api/locations',
  requestHandler(db.getLocations, getLocations)
);
router.get(
  '/api/locations/:id',
  requestHandler(db.getLocation, getLocation)
);
router.post(
  '/api/locations',
  requestHandler(db.insertLocation, insertLocation)
);
router.post(
  '/api/locations/:id',
  requestHandler(db.updateLocation, updateLocation)
);

module.exports = router;
