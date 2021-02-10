const React = require('react');
const LocationRecord = require('./LocationRecord.jsx');

const LocationsList = ({ locations, selectLocation }) => (
  <ul>
    {locations.map((location) => (
      <LocationRecord
        location={location}
        key={location.id}
        selectLocation={selectLocation}
      />
    ))}
  </ul>
);

module.exports = LocationsList;
