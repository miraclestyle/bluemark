const React = require('react');

const ProductRecord = ({product, updateProduct}) => (
  <li>
    {product.name} - {product.description} - <button onClick={(event) => updateProduct(product)}>Update</button>
  </li>
);

module.exports = ProductRecord;
