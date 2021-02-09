const React = require('react');

const ProductForm = ({product, editProduct, saveProduct}) => (
  <li>
    <input
      type="text"
      placeholder="Name"
      value={product.name}
      name="name"
      onChange={editProduct}
    />
    <input
      type="text"
      placeholder="Description"
      value={product.description}
      name="description"
      onChange={editProduct}
    />
    <button onClick={saveProduct}>Save</button>
  </li>
);

module.exports = ProductForm;
