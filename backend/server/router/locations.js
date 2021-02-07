const express = require('express');
const requestHandler = require('./request_handler');
const db = require('../database');

const router = express.Router();

const getLocations = (req) => ([req.query.parent_id]);
const getLocation = (req) => ([req.params.id]);
const insertLocation = (req) => ([
  req.body.name,
  req.body.parent_id,
  req.body.description,
]);
const updateLocation = (req) => ([
  req.params.id, req.body.name,
  req.body.description,
]);

router.get('/api/locations', requestHandler(db.getLocations, getLocations));
router.get('/api/locations/:id', requestHandler(db.getLocation, getLocation));
router.post('/api/locations', requestHandler(db.insertLocation, insertLocation));
router.post('/api/locations/:id', requestHandler(db.updateLocation, updateLocation));

module.exports = router;
