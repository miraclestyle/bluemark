const React = require('react');
const Products = require('./Products/index.jsx');
const Locations = require('./Locations/index.jsx');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: '',
    };
    this.navigate = this.navigate.bind(this);
  }

  navigate(item) {
    this.setState({ menu: item });
  }

  render() {
    const { menu } = this.state;
    const { navigate } = this;
    let page = null;
    if (menu === 'products') {
      page = <Products />;
    } else if (menu === 'locations') {
      page = <Locations />;
    }
    return (
      <div>
        <h2>Bluemark Product Movements</h2>
        <button onClick={() => navigate('products')}>Products</button>
        <button onClick={() => navigate('locations')}>Locations</button>
        { page }
      </div>
    );
  }
}

module.exports = App;
