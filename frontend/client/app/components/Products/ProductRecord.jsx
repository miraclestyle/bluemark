const React = require('react');

const ProductRecord = ({
  index,
  product,
  selectProduct,
  updateProduct
}) => (
  <li>
    {product.name}&nbsp;|&nbsp;
    {product.description}&nbsp;|&nbsp;
    <button onClick={() => selectProduct(index)}>Select</button>&nbsp;|&nbsp;
    <button onClick={() => updateProduct(index)}>Update</button>
  </li>
);

module.exports = ProductRecord;
