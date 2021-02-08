const React = require('react');

const ProductRecord = ({product}) => (
  <div>
    <div>{product.name}</div>
    <div>{product.description}</div>
  </div>
);

module.exports = ProductRecord;
