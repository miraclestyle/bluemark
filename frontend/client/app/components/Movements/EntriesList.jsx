const React = require('react');
const EntryForm = require('./EntryForm.jsx');

const EntriesList = ({
  entries,
  updateLocation,
  editEntry,
  removeEntry,
}) => (
  <ul>
    {entries.map((entry, index) => (
      <EntryForm
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
