const React = require('react');

const ParentLocation = ({location, selectLocation}) => (
  <div>
    <h4>Parent Location</h4>
    <div>
    {location.path} - {location.name} - <button
      onClick={() => selectLocation(null)}
      >Up</button>
    </div>
  </div>
);

module.exports = ParentLocation;
