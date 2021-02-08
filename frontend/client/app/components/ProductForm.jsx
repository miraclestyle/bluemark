const React = require('react');

const ProductForm = ({selected, editProduct, saveProduct}) => (
  <li>
    <input
      type="text"
      placeholder="Name"
      value={selected.name}
      name="name"
      onChange={editProduct}
    />
    <input
      type="text"
      placeholder="Description"
      value={selected.description}
      name="description"
      onChange={editProduct}
    />
    <button onClick={saveProduct}>Save</button>
  </li>
);

module.exports = ProductForm;
