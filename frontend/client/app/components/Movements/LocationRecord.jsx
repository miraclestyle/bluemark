const React = require('react');

const LocationRecord = ({location, selectLocation}) => (
  <li>
    {location.path} -
    {location.name} -
    Quantuty In: {location.qty_in} -
    Quantity Out: {location.qty_out} -
    Quantity Total: {location.qty_total} -
    <button onClick={(event) => selectLocation(location)}>Select</button>
  </li>
);

module.exports = LocationRecord;
