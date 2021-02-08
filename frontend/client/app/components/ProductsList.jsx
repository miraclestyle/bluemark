const React = require('react');
const ProductRecord = require('./ProductRecord.jsx');
const ProductForm = require('./ProductForm.jsx');

const ProductsList = ({
  products,
  selectedProduct,
  modifyProduct,
  editProduct,
  updateProduct,
  newProduct,
}) => (
  <div>
    <h3>Products</h3>
    <button onClick={newProduct}>Add New Product</button>
    <ul>
      {products.map((product) => (
        product.id === selectedProduct.id ?
        <ProductForm
          key={product.id}
          selectedProduct={selectedProduct}
          editProduct={editProduct}
          updateProduct={updateProduct}
        />
        :
        <ProductRecord
          product={product}
          key={product.id}
          modifyProduct={modifyProduct}
        />
      ))}
    </ul>
  </div>
);

module.exports = ProductsList;
