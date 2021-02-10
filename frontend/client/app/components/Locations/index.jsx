const React = require('react');
const api = require('../../backendAdapter');
const LocationsList = require('./LocationsList.jsx');
const ParentLocation = require('./ParentLocation.jsx');

class Locations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      selectedLocation: this.locationTemplate(),
      updatedLocation: this.locationTemplate(),
    };
    this.locationTemplate = this.locationTemplate.bind(this);
    this.newLocation = this.newLocation.bind(this);
    this.selectLocation = this.selectLocation.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.editLocation = this.editLocation.bind(this);
    this.updateLocations = this.updateLocations.bind(this);
    this.getLocations = this.getLocations.bind(this);
    this.cancelLocation = this.cancelLocation.bind(this);
    this.saveLocation = this.saveLocation.bind(this);
  }

  componentDidMount() {
    this.getLocations();
  }

  locationTemplate() {
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
      const locations = [ ...state.locations ];
      const { selectedLocation } = state;
      const location = this.locationTemplate();
      location.parent_id = selectedLocation.id;
      locations.push(location);
      return { locations, updatedLocation: location };
    });
  }

  selectLocation(locationId) {
    this.getLocations(locationId);
  }

  updateLocation(location) {
    this.setState({ updatedLocation: { ...location } });
  }

  editLocation(event) {
    const key = event.target.name;
    const value = event.target.value;
    this.setState((state) => {
      const location = { ...state.updatedLocation };
      location[key] = value;
      return { updatedLocation: location };
    });
  }

  updateLocations(locationId, newLocation) {
    this.setState((state) => {
      const locations = [ ...state.locations ];
      const i = locations.findIndex((location) => (location.id === locationId));
      if (i === -1) locations.push(newLocation);
      else locations.splice(i, 1, newLocation);
      return { locations, updatedLocation: this.locationTemplate() };
    });
  }

  getLocations(locationId = null) {
    api.getLocations(locationId, (records) => {
      this.setState({
        locations: locationId === null ? records : records.slice(1),
        selectedLocation: locationId === null ? this.locationTemplate() : records[0],
        updatedLocation: this.locationTemplate(),
      });
    });
  }

  cancelLocation() {
    this.setState({ updatedLocation: this.locationTemplate() });
  }

  saveLocation() {
    const {
      id,
      parent_id,
      name,
      description,
    } = this.state.updatedLocation;
    const callback = (records) => {
      if (id !== null) this.updateLocations(id, records[0])
      else this.updateLocations(null, records[0])
    };
    if (id !== null) {
      api.updateLocation(id, name, description, callback);
    } else {
      api.insertLocation(parent_id, name, description, callback);
    }
  }

  render() {
    const { locations, selectedLocation, updatedLocation } = this.state;
    const {
      newLocation,
      selectLocation,
      updateLocation,
      editLocation,
      cancelLocation,
      saveLocation,
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
          updatedLocation={updatedLocation}
          selectLocation={selectLocation}
          updateLocation={updateLocation}
          editLocation={editLocation}
          cancelLocation={cancelLocation}
          saveLocation={saveLocation}
        />
      </div>
    );
  }
}

module.exports = Locations;
