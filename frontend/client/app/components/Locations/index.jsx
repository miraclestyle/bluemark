const React = require('react');
const api = require('../backendAdapter');
const LocationsList = require('./LocationsList.jsx');
const ParentLocation = require('./ParentLocation.jsx');

class Locations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      selectedLocation: {
        id: null,
        parent_id: null,
        path: '',
        name: '',
        description: '',
      },
      updatedLocation: {
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
      const { selectedLocation } = state;
      const createLocation = {
        id: null,
        parent_id: selectedLocation.id,
        path: '',
        name: '',
        description: '',
      };
      locations.push(createLocation);
      return { locations, updatedLocation: createLocation };
    });
  }

  selectLocation(location) {
    if (location === null) {
      const { selectedLocation } = this.state;
      this.getLocations(selectedLocation.parent_id);
      this.getLocation(selectedLocation.parent_id);
      this.setState(() => ({ updatedLocation: this.template() }));
    } else {
      this.getLocations(location.id);
      this.setState(() => ({
        selectedLocation: location,
        updatedLocation: this.template(),
      }));
    }
  }

  updateLocation(location) {
    this.setState(() => ({ updatedLocation: { ...location } }));
  }

  editLocation(event) {
    const key = event.target.name;
    const value = event.target.value;
    this.setState((state) => {
      const newLocation = { ...state.updatedLocation };
      newLocation[key] = value;
      return { updatedLocation: newLocation };
    });
  }

  updateLocations(location_id, newLocation) {
    this.setState((state) => {
      const locations = state.locations.slice();
      const i = locations.findIndex((location) => (location.id === location_id));
      locations.splice(i, 1, newLocation);
      return { locations, updatedLocation: this.template() };
    });
  }

  getLocations(parent_id = null) {
    api.getLocations(parent_id, (records) => {
      this.setState(() => ({ locations: records }));
    });
  }

  getLocation(location_id) {
    if (location_id === null) {
      this.setState(() => ({ selectedLocation: this.template() }));
    } else {
      api.getLocation(location_id, (records) => {
        this.setState(() => ({ selectedLocation: records[0] }));
      });
    }

  }

  saveLocation() {
    const { updatedLocation } = this.state;
    if (updatedLocation.id !== null) {
      api.updateLocation(
        updatedLocation.id,
        updatedLocation.name,
        updatedLocation.description,
        (records) => (this.updateLocations(updatedLocation.id, records[0]))
      );
    } else {
      api.insertLocation(
        updatedLocation.parent_id,
        updatedLocation.name,
        updatedLocation.description,
        (records) => (this.updateLocations(null, records[0]))
      );
    }
  }

  render() {
    const { locations, selectedLocation, updatedLocation } = this.state;
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
        <ParentLocation
          location={selectedLocation}
          selectLocation={selectLocation}
        />
        <LocationsList
          locations={locations}
          selected={updatedLocation}
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
