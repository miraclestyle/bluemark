const React = require('react');

const ProductForm = ({selectedProduct, editProduct, updateProduct}) => (
  <li>
    <input
      type="text"
      placeholder="Name"
      value={selectedProduct.name}
      name="name"
      onChange={editProduct}
    />
    <input
      type="text"
      placeholder="Description"
      value={selectedProduct.description}
      name="description"
      onChange={editProduct}
    />
    <button onClick={updateProduct}>Save</button>
  </li>
);

module.exports = ProductForm;
