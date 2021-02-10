const React = require('react');

const LocationRecord = ({ location, selectLocation, updateLocation }) => (
  <li>
    {location.path}&nbsp;|&nbsp;
    {location.name}&nbsp;|&nbsp;
    {location.description}&nbsp;|&nbsp;
    <button onClick={(event) => selectLocation(location.id)}>Select</button>&nbsp;|&nbsp;
    <button onClick={(event) => updateLocation(location)}>Update</button>
  </li>
);

module.exports = LocationRecord;
