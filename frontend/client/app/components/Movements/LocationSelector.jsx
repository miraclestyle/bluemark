const React = require('react');

const LocationSelector = ({index, location, updateLocation}) => {
  let parent = null;
  let home = null;
  if (location.parent_id !== null) {
    parent = <option key='parent' value={location.parent_id}>PARENT</option>;
  } else {
    parent = <option key='parent' value={'parent'}>PARENT</option>;
  }
  if (location.id !== null) {
    home = <option key={location.id} value={location.id}>{location.path} - {location.name}</option>;
  }
  return (
    <select
      name="location"
      id={`loc-${index}`}
      value={location.id || 'parent'}
      onChange={(e) => {
        updateLocation(e, index);
      }}
    >
      { parent }
      { home }
      {location.children.map((child) => (
        <option key={child.id} value={child.id}>
          {child.path} - {child.name}
        </option>
      ))}
    </select>
  );
};

module.exports = LocationSelector;
