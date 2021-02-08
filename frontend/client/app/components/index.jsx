const React = require('react');
const api = require('./backendAdapter');
const Products = require('./Products.jsx');
const Locations = require('./Locations.jsx');

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
        <Locations />
      </div>
    );
  }
}

module.exports = App;
