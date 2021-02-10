const React = require('react');

const LocationSelector = ({ index, location, updateLocation }) => {
  const { id, parent_id, path, name, children } = location;
  const home = id === 'none' ? null :
    <option key='location' value={id}>{path} - {name}</option>;
  return (
    <select
      name="location"
      value={id || 'none'}
      onChange={(e) => updateLocation(e, index)}
    >
      <option key='parent' value={parent_id === null ? 'none' : parent_id}>
        PARENT
      </option>
      { home }
      {children.map((child) => (
        <option key={child.id} value={child.id}>
          {child.path} - {child.name}
        </option>
      ))}
    </select>
  );
};

module.exports = LocationSelector;
