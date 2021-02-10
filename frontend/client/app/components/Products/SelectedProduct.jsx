const React = require('react');

const SelectedProduct = ({ product }) => (
  product.id === null ?
  <h4></h4>
  :
  <h4>{product.id}&nbsp;|&nbsp;{product.name}&nbsp;|&nbsp;{product.description}</h4>
);

module.exports = SelectedProduct;
