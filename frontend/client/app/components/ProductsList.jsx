const React = require('react');
const ProductRecord = require('./ProductRecord.jsx');

const ProductsList = ({products}) => (
  <div>
    <h3>Products</h3>
    <div>
      {products.map((product) => (
        <ProductRecord
          product={product}
          key={product.id}
        />
      ))}
    </div>
  </div>
);

module.exports = ProductsList;
