const React = require('react');
const api = require('../../backendAdapter');
const EntriesList = require('./EntriesList.jsx');

class MovementForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: props.product,
      entries: [],
    };
    this.locationTemplate = this.locationTemplate.bind(this);
    this.entryTemplate = this.entryTemplate.bind(this);
    this.cancelMovement = this.cancelMovement.bind(this);
    this.saveMovement = this.saveMovement.bind(this);
    this.updateEntries = this.updateEntries.bind(this);
    this.newEntry = this.newEntry.bind(this);
    this.removeEntry = this.removeEntry.bind(this);
    this.editEntry = this.editEntry.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
  }

  componentDidMount() {
    this.newEntry();
    this.newEntry();
  }

  locationTemplate() {
    return {
      id: 'none',
      parent_id: 'none',
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

  cancelMovement() {
    this.props.cancelMovement();
  }

  saveMovement() {
    const { product, entries } = this.state;
    const preparedEntries = entries.map((entry) => ({
      locationPath: entry.location.path,
      quantityIn: entry.quantity_in,
      quantityOut: entry.quantity_out,
    }));
    api.insertMovementEntries(product.id, preparedEntries, (records) => (
      this.cancelMovement()
    ));
  }

  updateEntries(index, key, value) {
    this.setState((state) => {
      const entries = [ ...state.entries ];
      const entry = { ...state.entries[index] };
      entry[key] = value;
      entries.splice(index, 1, entry);
      return { entries };
    });
  }

  newEntry() {
    api.getLocations(null, (records) => {
      this.setState((state) => {
        const entry = this.entryTemplate();
        const location = this.locationTemplate();
        const children = records;
        location.children = children.map((child) => ({ ...child, children: [] }));
        entry.location = location
        const entries = [ ...state.entries ];
        entries.push(entry);
        return { entries };
      });
    });
  }

  removeEntry(index) {
    this.setState((state) => {
      const entries = [ ...state.entries ];
      entries.splice(index, 1);
      return { entries };
    });
  }

  editEntry(event, index) {
    const key = event.target.name;
    const value = event.target.value;
    this.updateEntries(index, key, value);
  }

  updateLocation(event, index) {
    let locationId = null;
    if (event !==  null && event.target.value !== 'none') {
      locationId = event.target.value;
    }
    api.getLocations(locationId, (records) => {
      let location = this.locationTemplate();
      let children = records;
      if (locationId !== null) {
        location = records[0];
        children = records.slice(1);
      }
      location.children = children.map((child) => ({ ...child, children: [] }));
      this.updateEntries(index, 'location', location);
    });
  }

  render() {
    const { entries } = this.state;
    const {
      cancelMovement,
      saveMovement,
      newEntry,
      updateLocation,
      editEntry,
      removeEntry,
    } = this;
    return (
      <div>
        <h5>New Movement</h5>
        <button onClick={cancelMovement}>Cancel</button>
        <button onClick={saveMovement}>Save</button>
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
