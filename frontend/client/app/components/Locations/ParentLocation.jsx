const React = require('react');

const ParentLocation = ({ index, location, selectLocation }) => (
  <div>
    <h4>Parent Location</h4>
    <div>
      {location.path}&nbsp;|&nbsp;
      {location.name}&nbsp;|&nbsp;
      {location.description}&nbsp;|&nbsp;
      <button onClick={() => selectLocation(index, location.parent_id)}>Up</button>
    </div>
  </div>
);

module.exports = ParentLocation;
