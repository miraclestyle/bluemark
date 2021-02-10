const React = require('react');
const LocationRecord = require('./LocationRecord.jsx');

const LocationsList = ({ locations, selectLocation }) => (
  <ul>
    {locations.map((location) => (
      <LocationRecord
        key={location.location_id}
        location={location}
        selectLocation={selectLocation}
      />
    ))}
  </ul>
);

module.exports = LocationsList;
