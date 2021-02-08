const path = require('path');
const express = require('express');
const { FRONTEND_PORT } = require('./config');

const app = express();
const publicFolder = express.static(path.join(__dirname, '..', 'public'));
app.use('/', publicFolder);
app.listen(FRONTEND_PORT, () => {
  console.log(`Frontend is up and running, accessible at port ${FRONTEND_PORT}.`);
});
