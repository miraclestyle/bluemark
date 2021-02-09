const React = require('react');
const api = require('../backendAdapter');
const EntriesList = require('./EntriesList.jsx');

class MovementForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: props.product_id,
      entries: [
        {
          location: {
            id: null,
            parent_id: null,
            path: '',
            name: '',
            description: '',
            children: [],
          },
          quantity_in: 0,
          quantity_out: 0,
        },
        {
          location: {
            id: null,
            parent_id: null,
            path: '',
            name: '',
            description: '',
            children: [],
          },
          quantity_in: 0,
          quantity_out: 0,
        },
      ],
    };
    this.locationTemplate = this.locationTemplate.bind(this);
    this.entryTemplate = this.entryTemplate.bind(this);
    this.updateEntries = this.updateEntries.bind(this);
    this.newEntry = this.newEntry.bind(this);
    this.removeEntry = this.removeEntry.bind(this);
    this.editEntry = this.editEntry.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
  }

  componentDidMount() {

  }

  locationTemplate() {
    return {
      id: null,
      parent_id: null,
      path: '',
      name: '',
      description: '',
      children: [],
    };
  }

  entryTemplate() {
    return {
      location: this.locationTemplate(),
      quantity_in: 0,
      quantity_out: 0,
    };
  }

  updateEntries(index, key, value) {
    this.setState((state) => {
      const entries = state.entries.slice();
      const entry = { ...state.entries[index] };
      entry[key] = value;
      entries.splice(index, 1, entry);
      return { entries };
    });
  }

  newEntry() {
    const entry = this.entryTemplate();
    this.setState((state) => {
      const entries = state.entries.slice();
      entries.push(entry);
      return { entries };
    });
  }

  removeEntry(index) {
    this.setState((state) => {
      const entries = state.entries.slice();
      entries.splice(index, 1);
      return { entries };
    });
  }

  editEntry(event, index) {
    const key = event.target.name;
    const value = event.target.value;
    updateEntries(index, key, value);
  }

  updateLocation(event, index) {
    const location_id = event.target.value;
    if (location_id === null) {
      api.getLocations(null, (records) => {
        const newLocation = this.locationTemplate();
        newLocation.children = records.map((record) => (
          { ...record, children: [] }
        ));
        this.updateEntries(index, 'location', newLocation);
      });
    } else {
      api.getLocation(location_id, (ancestors) => {
        const newLocation = ancestors[0];
        api.getLocations(newLocation.id, (descendants) => {
          newLocation.children = descendants.map((child) => (
            { ...child, children: [] }
          ));
          this.updateEntries(index, 'location', newLocation);
        });
      });
    }
  }

  render() {
    const { entries } = this.state;
    const {
      newEntry,
      updateLocation,
      editEntry,
      removeEntry,
    } = this;
    return (
      <div>
        <button onClick={newEntry}>Add New Entry</button>
        <EntriesList
          entries={entries}
          updateLocation={updateLocation}
          editEntry={editEntry}
          removeEntry={removeEntry}
        />
      </div>
    );
  }
}

module.exports = MovementForm;
