const React = require('react');

const ProductRecord = ({ product, selectProduct, updateProduct }) => (
  <li>
    {product.name}&nbsp;|&nbsp;
    {product.description}&nbsp;|&nbsp;
    <button onClick={(event) => selectProduct(product)}>Select</button>&nbsp;|&nbsp;
    <button onClick={(event) => updateProduct(product)}>Update</button>
  </li>
);

module.exports = ProductRecord;
