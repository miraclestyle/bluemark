const React = require('react');
const api = require('./backendAdapter');
const LocationsList = require('./LocationsList.jsx');

class Locations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      readLocation: {
        id: null,
        parent_id: null,
        path: '',
        name: '',
        description: '',
      },
      writeLocation: {
        id: null,
        parent_id: null,
        path: '',
        name: '',
        description: '',
      },
    };
    this.template = this.template.bind(this);
    this.newLocation = this.newLocation.bind(this);
    this.selectLocation = this.selectLocation.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.editLocation = this.editLocation.bind(this);
    this.updateLocations = this.updateLocations.bind(this);
    this.getLocations = this.getLocations.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.saveLocation = this.saveLocation.bind(this);
  }

  componentDidMount() {
    this.getLocations();
  }

  template() {
    return {
      id: null,
      parent_id: null,
      path: '',
      name: '',
      description: '',
    };
  }

  newLocation() {
    this.setState((state) => {
      const locations = state.locations.slice();
      const { readLocation } = state;
      const createLocation = {
        id: null,
        parent_id: readLocation.id,
        path: '',
        name: '',
        description: '',
      };
      locations.push(createLocation);
      return { locations, writeLocation: createLocation };
    });
  }

  selectLocation(location) {
    if (location === null) {
      const { readLocation } = this.state;
      this.getLocations(readLocation.parent_id);
      this.getLocation(readLocation.parent_id);
      this.setState(() => ({ writeLocation: this.template() }));
    } else {
      this.getLocations(location.id);
      this.setState(() => ({
        readLocation: location,
        writeLocation: this.template(),
      }));
    }
  }

  updateLocation(location) {
    this.setState(() => ({ writeLocation: { ...location } }));
  }

  editLocation(event) {
    const key = event.target.name;
    const value = event.target.value;
    this.setState((state) => {
      const newLocation = { ...state.writeLocation };
      newLocation[key] = value;
      return { writeLocation: newLocation };
    });
  }

  updateLocations(location_id, newLocation) {
    this.setState((state) => {
      const locations = state.locations.slice();
      const i = locations.findIndex((location) => (location.id === location_id));
      locations.splice(i, 1, newLocation);
      return { locations, writeLocation: this.template() };
    });
  }

  getLocations(parent_id = null) {
    api.getLocations(parent_id, (records) => {
      this.setState(() => ({ locations: records }));
    });
  }

  getLocation(location_id) {
    if (location_id === null) {
      this.setState(() => ({ readLocation: this.template() }));
    } else {
      api.getLocation(location_id, (records) => {
        this.setState(() => ({ readLocation: records[0] }));
      });
    }

  }

  saveLocation() {
    const { writeLocation } = this.state;
    if (writeLocation.id !== null) {
      api.updateLocation(
        writeLocation.id,
        writeLocation.name,
        writeLocation.description,
        (records) => (this.updateLocations(writeLocation.id, records[0]))
      );
    } else {
      api.insertLocation(
        writeLocation.parent_id,
        writeLocation.name,
        writeLocation.description,
        (records) => (this.updateLocations(null, records[0]))
      );
    }
  }

  render() {
    const { locations, readLocation, writeLocation } = this.state;
    const {
      newLocation,
      selectLocation,
      updateLocation,
      editLocation,
      saveLocation,
      getLocations,
    } = this;
    return (
      <div>
        <h3>Locations</h3>
        <button onClick={newLocation}>Add New Location</button>
        <h4>
          Parent Location - {readLocation.path} - {readLocation.name} - <button onClick={() => selectLocation(null)}>Up</button>
        </h4>
        <LocationsList
          locations={locations}
          selected={writeLocation}
          selectLocation={selectLocation}
          updateLocation={updateLocation}
          editLocation={editLocation}
          saveLocation={saveLocation}
        />
      </div>
    );
  }
}

module.exports = Locations;
