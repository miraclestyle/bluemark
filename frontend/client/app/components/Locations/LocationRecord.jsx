const React = require('react');

const LocationRecord = ({
  index,
  location,
  selectLocation,
  updateLocation,
 }) => (
  <li>
    {location.path}&nbsp;|&nbsp;
    {location.name}&nbsp;|&nbsp;
    {location.description}&nbsp;|&nbsp;
    <button onClick={() => selectLocation(index)}>Select</button>&nbsp;|&nbsp;
    <button onClick={() => updateLocation(index)}>Update</button>
  </li>
);

module.exports = LocationRecord;
