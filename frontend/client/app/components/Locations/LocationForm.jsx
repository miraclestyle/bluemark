const React = require('react');

const LocationForm = ({
  index,
  location,
  editLocation,
  cancelLocation,
  saveLocation
}) => (
  <li>
    <input
      type="text"
      placeholder="Name"
      value={location.name}
      name="name"
      onChange={(e) => editLocation(e.target.name, e.target.value, index)}
    />
    <input
      type="text"
      placeholder="Description"
      value={location.description}
      name="description"
      onChange={(e) => editLocation(e.target.name, e.target.value, index)}
    />
    <button onClick={() => cancelLocation(index)}>Cancel</button>
    <button onClick={() => saveLocation(index)}>Save</button>
  </li>
);

module.exports = LocationForm;
