const express = require('express');
const config = require('./config');
const router = require('./router');

const app = express();
app.use(router);
app.listen(config.app.BACKEND_PORT, () => {
  console.log(`Server is up and running, accessible on port ${config.app.BACKEND_PORT}.`);
});
