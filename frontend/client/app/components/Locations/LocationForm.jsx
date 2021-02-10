const React = require('react');

const LocationForm = ({
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
      onChange={editLocation}
    />
    <input
      type="text"
      placeholder="Description"
      value={location.description}
      name="description"
      onChange={editLocation}
    />
    <button onClick={cancelLocation}>Cancel</button>
    <button onClick={saveLocation}>Save</button>
  </li>
);

module.exports = LocationForm;
