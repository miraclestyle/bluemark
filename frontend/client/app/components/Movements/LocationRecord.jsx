const React = require('react');

const LocationRecord = ({ location, selectLocation }) => (
  <li>
    {location.path}&nbsp;|&nbsp;
    {location.name}&nbsp;|&nbsp;
    Quantuty In: {location.quantity_in}&nbsp;|&nbsp;
    Quantity Out: {location.quantity_out}&nbsp;|&nbsp;
    Quantity Total: {location.quantity_total}&nbsp;|&nbsp;
    <button onClick={(event) => selectLocation(location.location_id)}>
      Select
    </button>
  </li>
);

module.exports = LocationRecord;
