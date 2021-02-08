const React = require('react');

const LocationForm = ({selected, editLocation, saveLocation}) => (
  <li>
    <input
      type="text"
      placeholder="Name"
      value={selected.name}
      name="name"
      onChange={editLocation}
    />
    <input
      type="text"
      placeholder="Description"
      value={selected.description}
      name="description"
      onChange={editLocation}
    />
    <button onClick={saveLocation}>Save</button>
  </li>
);

module.exports = LocationForm;
