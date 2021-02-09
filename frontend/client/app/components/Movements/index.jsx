const React = require('react');
const api = require('../backendAdapter');
const MovementForm = require('./MovementForm.jsx');

class Movements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: props.productId,
      newMovement: false,
    };
    this.moveProduct = this.moveProduct.bind(this);
    this.closeMovementForm = this.closeMovementForm.bind(this);
  }

  componentDidMount() {

  }

  moveProduct() {
    this.setState({ newMovement: true });
  }

  closeMovementForm() {
    this.setState({ newMovement: false });
  }

  render() {
    const { product_id, newMovement } = this.state;
    const { moveProduct, closeMovementForm } = this;
    let move_product = null;
    let movment_form = null;
    if (newMovement) {
      movment_form = <MovementForm
        product_id={product_id}
        closeMovementForm={closeMovementForm}
      />;
    } else {
      move_product = <button onClick={moveProduct}>Move Product</button>;
    }
    return (
      <div>
        <h3>Movements</h3>
        { move_product }
        { movment_form }
      </div>
    );
  }
}

module.exports = Movements;
