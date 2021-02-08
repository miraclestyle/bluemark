const React = require('react');
const ProductRecord = require('./ProductRecord.jsx');
const ProductForm = require('./ProductForm.jsx');

const ProductsList = ({
  products,
  selected,
  updateProduct,
  editProduct,
  saveProduct,
}) => (
  <ul>
    {products.map((product) => (
      product.id === selected.id ?
      <ProductForm
        key={product.id}
        selected={selected}
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
