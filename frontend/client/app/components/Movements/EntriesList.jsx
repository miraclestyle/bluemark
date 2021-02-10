const React = require('react');
const EntryForm = require('./EntryForm.jsx');

const EntriesList = ({
  entries,
  updateLocation,
  editEntry,
  removeEntry,
}) => (
  <ul>
    <li>Location | Qunatity In | Qunatity Out</li>
    {entries.map((entry, index) => (
      <EntryForm
        key={index}
        index={index}
        entry={entry}
        updateLocation={updateLocation}
        editEntry={editEntry}
        removeEntry={removeEntry}
      />
    ))}
  </ul>
);

module.exports = EntriesList;
