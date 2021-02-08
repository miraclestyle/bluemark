const React = require('react');

const LocationRecord = ({location, selectLocation, updateLocation}) => (
  <li>
    {location.path} - {location.name} - {location.description} - <button
      onClick={(event) => selectLocation(location)}
    >Select</button> - <button
      onClick={(event) => updateLocation(location)}
    >Update</button>
  </li>
);

module.exports = LocationRecord;
