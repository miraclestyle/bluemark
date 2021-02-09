const React = require('react');

const LocationRecord = ({location, selectLocation}) => (
  <li>
    {location.path} - {location.name} - <button
      onClick={(event) => selectLocation(location)}
    >Select</button>
  </li>
);

module.exports = LocationRecord;
