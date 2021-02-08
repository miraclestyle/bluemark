const React = require('react');

const LocationSelector = ({index, location, updateLocation}) => (
    <select
      name="location"
      value={location.id || null}
      onChange={(e) => {
        updateLocation(e, index);
      }}
    >
      <option key={null} value={null}>NONE</option>
      <option key={location.parent_id} value={location.parent_id}>
        PARENT
      </option>
      <option key={location.id} value={location.id}>
        {location.path} - {location.name}
      </option>
      {location.children.map((child) => (
        <option key={child.id} value={child.id}>
          {child.path} - {child.name}
        </option>
      ))}
    </select>
);

module.exports = LocationSelector;
