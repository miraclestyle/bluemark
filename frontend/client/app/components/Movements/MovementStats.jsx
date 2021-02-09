const React = require('react');
const api = require('../backendAdapter');
const LocationsList = require('./LocationsList.jsx');
const ParentLocation = require('./ParentLocation.jsx');

class MovementStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: props.product,
      locations: [],
      selectedLocation: {
        id: null,
        parent_id: null,
        path: '',
        name: '',
        description: '',
      },
    };
    this.template = this.template.bind(this);
    this.selectLocation = this.selectLocation.bind(this);
    this.getLocations = this.getLocations.bind(this);
    this.getLocation = this.getLocation.bind(this);
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

  selectLocation(location) {
    if (location === null) {
      const { selectedLocation } = this.state;
      this.getLocations(selectedLocation.parent_id);
      this.getLocation(selectedLocation.parent_id);
    } else {
      this.getLocations(location.id);
      this.setState(() => ({ selectedLocation: location }));
    }
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

  render() {
    const { locations, selectedLocation } = this.state;
    const { selectLocation } = this;
    return (
      <div>
        <h3>Movement Stats</h3>
        <ParentLocation
          location={selectedLocation}
          selectLocation={selectLocation}
        />
        <LocationsList
          locations={locations}
          selectLocation={selectLocation}
        />
      </div>
    );
  }
}

module.exports = MovementStats;
