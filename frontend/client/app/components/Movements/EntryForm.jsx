const React = require('react');
const LocationSelector = require('./LocationSelector');

const EntryForm = ({
  index,
  entry,
  updateLocation,
  editEntry,
  removeEntry,
}) => (
  <li>
    <LocationSelector
      index={index}
      location={entry.location}
      updateLocation={updateLocation}
    />
    <input
      type="number"
      placeholder="Qunatity In"
      value={entry.quantity_in}
      name="quantity_in"
      onChange={(e) => editEntry(e, index)}
    />
    <input
      type="number"
      placeholder="Qunatity Out"
      value={entry.quantity_out}
      name="quantity_out"
      onChange={(e) => editEntry(e, index)}
    />
    <button onClick={() => removeEntry(index)}>Remove</button>
  </li>
);

module.exports = EntryForm;
