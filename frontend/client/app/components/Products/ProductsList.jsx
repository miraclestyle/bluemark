const React = require('react');
const ProductRecord = require('./ProductRecord.jsx');
const ProductForm = require('./ProductForm.jsx');

const ProductsList = ({
  products,
  updatedProduct,
  selectProduct,
  updateProduct,
  editProduct,
  cancelProduct,
  saveProduct,
}) => (
  <ul>
    {products.map((product) => (
      product.id === updatedProduct.id ?
      <ProductForm
        key={product.id}
        product={updatedProduct}
        editProduct={editProduct}
        cancelProduct={cancelProduct}
        saveProduct={saveProduct}
      />
      :
      <ProductRecord
        key={product.id}
        product={product}
        selectProduct={selectProduct}
        updateProduct={updateProduct}
      />
    ))}
  </ul>
);

module.exports = ProductsList;
