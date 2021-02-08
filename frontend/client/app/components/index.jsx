const React = require('react');
const Products = require('./Products/index.jsx');
const Locations = require('./Locations/index.jsx');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <h2>Bluemark Product Movements</h2>
        <Products />
      </div>
    );
  }
}

module.exports = App;
