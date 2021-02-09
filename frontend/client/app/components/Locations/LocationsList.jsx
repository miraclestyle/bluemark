const React = require('react');
const LocationRecord = require('./LocationRecord.jsx');
const LocationForm = require('./LocationForm.jsx');

const LocationsList = ({
  locations,
  updatedLocation,
  selectLocation,
  updateLocation,
  editLocation,
  saveLocation,
}) => (
  <ul>
    {locations.map((location) => (
      location.id === updatedLocation.id ?
      <LocationForm
        key={location.id}
        location={updatedLocation}
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
