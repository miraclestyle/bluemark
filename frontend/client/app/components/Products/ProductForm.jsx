const React = require('react');

const ProductForm = ({
  index,
  product,
  editProduct,
  cancelProduct,
  saveProduct,
 }) => (
  <li>
    <input
      type="text"
      placeholder="Name"
      value={product.name}
      name="name"
      onChange={(e) => editProduct(e.target.name, e.target.value, index)}
    />
    <input
      type="text"
      placeholder="Description"
      value={product.description}
      name="description"
      onChange={(e) => editProduct(e.target.name, e.target.value, index)}
    />
    <button onClick={() => cancelProduct(index)}>Cancel</button>
    <button onClick={() => saveProduct(index)}>Save</button>
  </li>
);

module.exports = ProductForm;
