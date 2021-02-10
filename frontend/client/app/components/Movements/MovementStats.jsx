const React = require('react');
const api = require('../../backendAdapter');
const LocationsList = require('./LocationsList.jsx');
const ParentLocation = require('./ParentLocation.jsx');

class MovementStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: props.product,
      locations: [],
      selectedLocation: this.locationTemplate(),
    };
    this.locationTemplate = this.locationTemplate.bind(this);
    this.selectLocation = this.selectLocation.bind(this);
    this.getLocations = this.getLocations.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.getMovements = this.getMovements.bind(this);
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

  selectLocation(locationId) {
    this.getLocations(locationId);
  }

  getLocations(locationId = null) {
    const { product } = this.state;
    api.getInventory(product.id, locationId, (records) => {
      this.setState({
        locations: locationId === null ? records : records.slice(1),
        selectedLocation: locationId === null ? this.locationTemplate() : records[0],
      });
    });
  }

  render() {
    const { locations, selectedLocation } = this.state;
    const { selectLocation } = this;
    return (
      <div>
        <h4>Movement Stats</h4>
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
