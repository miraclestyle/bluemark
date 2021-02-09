const React = require('react');
const api = require('../backendAdapter');
const MovementForm = require('./MovementForm.jsx');

class Movements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: null,
      newMovement: false,
    };
  }

  componentDidMount() {

  }

  moveProduct() {
    this.setState({ newMovement: true });
  }

  render() {
    const { product_id, newMovement } = this.state;
    const { moveProduct } = this;
    return (
      <div>
        <h3>Movements</h3>
        <button onClick={moveProduct}>Move Product</button>
        <MovementForm
          product_id={product_id}
        />
      </div>
    );
  }
}

module.exports = Movements;
