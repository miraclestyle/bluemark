const React = require('react');
const ProductRecord = require('./ProductRecord.jsx');
const ProductForm = require('./ProductForm.jsx');

const ProductsList = ({
  products,
  updatedProduct,
  selectedProduct,
  selectProduct,
  updateProduct,
  editProduct,
  cancelProduct,
  saveProduct,
}) => (
  <ul>
    {products.map((product, index) => (
      index === selectedProduct ? null :
      index === updatedProduct ?
      <ProductForm
        key={index}
        index={index}
        product={product}
        editProduct={editProduct}
        cancelProduct={cancelProduct}
        saveProduct={saveProduct}
      />
      :
      <ProductRecord
        key={index}
        index={index}
        product={product}
        selectProduct={selectProduct}
        updateProduct={updateProduct}
      />
    ))}
  </ul>
);

module.exports = ProductsList;
