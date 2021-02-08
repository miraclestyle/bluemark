const React = require('react');
const axios = require('axios');
const ProductsList = require('./ProductsList.jsx');
const { BACKEND_ENDPOINT, PRODUCTS } = require('../../config');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
    this.updateProducts = this.updateProducts.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts(limit = 1000, offset = 0) {
    const uri = `${BACKEND_ENDPOINT}${PRODUCTS}?limit=${limit}&offset=${offset}`;
    axios(uri)
      .then((response) => this.updateProducts(response.data))
      .catch((error) => (console.log('getProducts error:', error)));
  }

  updateProducts(data) {
    console.log(data.rows);
    const newProducts = data.rows.map((product) => {
      const id = product.id;
      const url = `${BACKEND_ENDPOINT}${PRODUCTS}/${id}`;
      return { ...product, url };
    });
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
