const React = require('react');

const ProductRecord = ({product, selectProduct, updateProduct}) => (
  <li>
    {product.name} - {product.description} - <button onClick={(event) => selectProduct(product)}>Select</button> - <button onClick={(event) => updateProduct(product)}>Update</button>
  </li>
);

module.exports = ProductRecord;
