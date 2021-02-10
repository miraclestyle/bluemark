const React = require('react');
const api = require('../../backendAdapter');
const LocationsList = require('./LocationsList.jsx');
const ParentLocation = require('./ParentLocation.jsx');

class Locations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      selectedLocation: -1,
      updatedLocation: -1,
    };
    this.locationTemplate = this.locationTemplate.bind(this);
    this.newLocation = this.newLocation.bind(this);
    this.selectLocation = this.selectLocation.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.editLocation = this.editLocation.bind(this);
    this.updateLocations = this.updateLocations.bind(this);
    this.cancelLocation = this.cancelLocation.bind(this);
    this.saveLocation = this.saveLocation.bind(this);
  }

  componentDidMount() {
    this.selectLocation();
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
      return { locations, updatedLocation: locations.length - 1 };
    });
  }

  updateLocation(index) {
    this.setState({ updatedLocation: index });
  }

  editLocation(key, value, index) {
    this.setState((state) => {
      const locations = [ ...state.locations ];
      const location = { ...locations[index] };
      location[key] = value;
      locations[index] = location;
      return { locations, updatedLocation: index };
    });
  }

  updateLocations(locationId, newLocation) {
    this.setState((state) => {
      const locations = [ ...state.locations ];
      const i = locations.findIndex((location) => (location.id === locationId));
      if (i === -1) locations.push(newLocation);
      else locations.splice(i, 1, newLocation);
      return { locations, updatedLocation: -1 };
    });
  }

  selectLocation(index = null, parentId = undefined) {
    let id = index === null ? null : this.state.locations[index].id;
    if (parentId !== undefined) id = parentId;
    api.getLocations(id, (locations) => {
      this.setState({
        locations,
        selectedLocation: id === null ? -1 : 0,
        updatedLocation: -1,
      });
    });
  }

  cancelLocation(index) {
    this.setState((state) => {
      const { id } = state.locations[index];
      if (id === null) {
        const locations = [ ...state.locations ];
        locations.splice(index, 1);
        return { locations, updatedLocation: -1 };
      } else {
        return { updatedLocation: -1 };
      }
    });
  }

  saveLocation(index) {
    const {
      id,
      parent_id,
      name,
      description,
    } = this.state.locations[index];
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
    let parentLocation = null;
    if (selectedLocation > -1) {
      parentLocation = <ParentLocation
        index={selectedLocation}
        location={locations[selectedLocation]}
        selectLocation={selectLocation}
      />
    }
    return (
      <div>
        <h3>Locations</h3>
        <button onClick={newLocation}>Add New Location</button>
        {parentLocation}
        <LocationsList
          locations={locations}
          selectedLocation={selectedLocation}
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
