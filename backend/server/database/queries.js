const products = require('./products');
const locations = require('./locations');

module.exports = {
  ...products,
  ...locations,
 };
