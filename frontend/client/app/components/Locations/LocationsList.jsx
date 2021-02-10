const React = require('react');
const LocationRecord = require('./LocationRecord.jsx');
const LocationForm = require('./LocationForm.jsx');

const LocationsList = ({
  locations,
  updatedLocation,
  selectedLocation,
  selectLocation,
  updateLocation,
  editLocation,
  cancelLocation,
  saveLocation,
}) => (
  <ul>
    {locations.map((location, index) => (
      index === selectedLocation ? null :
      index === updatedLocation ?
      <LocationForm
        key={index}
        index={index}
        location={location}
        editLocation={editLocation}
        cancelLocation={cancelLocation}
        saveLocation={saveLocation}
      />
      :
      <LocationRecord
        key={index}
        index={index}
        location={location}
        selectLocation={selectLocation}
        updateLocation={updateLocation}
      />
    ))}
  </ul>
);

module.exports = LocationsList;
