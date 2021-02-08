const React = require('react');
const LocationRecord = require('./LocationRecord.jsx');
const LocationForm = require('./LocationForm.jsx');

const LocationsList = ({
  locations,
  selected,
  selectLocation,
  updateLocation,
  editLocation,
  saveLocation,
}) => (
  <ul>
    {locations.map((location) => (
      location.id === selected.id ?
      <LocationForm
        key={location.id}
        selected={selected}
        editLocation={editLocation}
        saveLocation={saveLocation}
      />
      :
      <LocationRecord
        location={location}
        key={location.id}
        selectLocation={selectLocation}
        updateLocation={updateLocation}
      />
    ))}
  </ul>
);

module.exports = LocationsList;
