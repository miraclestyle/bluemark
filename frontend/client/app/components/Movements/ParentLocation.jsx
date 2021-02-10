const React = require('react');

const ParentLocation = ({ location, selectLocation }) => (
  <div>
    <h4>Parent Location</h4>
    <div>
      {location.path}&nbsp;|&nbsp;
      {location.name}&nbsp;|&nbsp;
      <button onClick={() => selectLocation(null)}>Up</button>
    </div>
  </div>
);

module.exports = ParentLocation;
