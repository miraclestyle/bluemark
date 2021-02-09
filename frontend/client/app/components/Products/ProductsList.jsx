const React = require('react');
const ProductRecord = require('./ProductRecord.jsx');
const ProductForm = require('./ProductForm.jsx');

const ProductsList = ({
  products,
  updatedProduct,
  updateProduct,
  editProduct,
  saveProduct,
}) => (
  <ul>
    {products.map((product) => (
      product.id === updatedProduct.id ?
      <ProductForm
        key={product.id}
        product={updatedProduct}
        editProduct={editProduct}
        saveProduct={saveProduct}
      />
      :
      <ProductRecord
        product={product}
        key={product.id}
        updateProduct={updateProduct}
      />
    ))}
  </ul>
);

module.exports = ProductsList;
