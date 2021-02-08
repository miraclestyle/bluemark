const React = require('react');

const ProductRecord = ({product, modifyProduct}) => (
  <li>
    {product.name} - {product.description} - <button onClick={(event) => modifyProduct(product)}>Update</button>
  </li>
);

module.exports = ProductRecord;
