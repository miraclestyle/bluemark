const products = require('./products');
const locations = require('./locations');
const movements = require('./movements');

module.exports = {
  ...products,
  ...locations,
  ...movements,
 };
