const React = require('react');
const api = require('./backendAdapter');
const ProductsList = require('./ProductsList.jsx');
const { BACKEND_ENDPOINT, PRODUCTS } = require('../../config');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      locations: [],
    };
    this.stateProducts = this.stateProducts.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts(limit = 1000, offset = 0) {
    api.getProducts(limit, offset, (records) => {
      this.setState(() => ({ products: records }));
    });
  }

  getProduct(product_id) {
    api.getProduct(product_id);
  }

  insertProduct(name, description) {
    api.insertProduct(name, description);
  }

  updateProduct(product_id, name, description) {
    api.updateProduct(product_id, name, description);
  }

  getLocations(parent_id = null) {
    api.getLocations(parent_id);
  }

  getLocation(location_id) {
    api.getLocation(location_id);
  }

  insertLocation(parent_id, name, description) {
    api.insertLocation(parent_id, name, description);
  }

  updateLocation(location_id, name, description) {
    api.updateLocation(location_id, name, description);
  }

  getMovements(product_id, location_path) {
    api.getMovements(product_id, location_path);
  }

  insertMovementEntries(product_id, entries) {
    api.insertMovementEntries(product_id, entries);
  }

  updateStateProducts(records) {
    this.setState(() => ({ products: newProducts }));
  }

  render() {
    const { products } = this.state;
    return (
      <div>
        <h1>Bluemark Product Movements</h1>
        <div id="bluemark-app">
          <ProductsList
            products={products}
          />
        </div>
      </div>
    );
  }
}

module.exports = App;
