const React = require('react');

const LocationSelector = ({
  product,
  location,
  children,
  editProduct,
  updateLocation,
}) => (
    <select
      name="location"
      id={product.id}
      value={location.id || null}
      onChange={(e) => {
        updateLocation(e);
      }}
    >
      <option
        key={location.parent_id}
        value={location.parent_id}
        product_id={product.id}
      >PARENT</option>
      {children.map((child) => (
        <option
          key={child.id}
          value={child.id}
          product_id={product.id}
        >{child.path} - {child.name}</option>
      ))}
    </select>
);

module.exports = LocationSelector;
