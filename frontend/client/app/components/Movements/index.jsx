const React = require('react');
const api = require('../backendAdapter');
const MovementForm = require('./MovementForm.jsx');
const MovementStats = require('./MovementStats.jsx');

class Movements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: props.product,
      newMovement: false,
    };
    this.moveProduct = this.moveProduct.bind(this);
    this.closeMovementForm = this.closeMovementForm.bind(this);
  }

  moveProduct() {
    this.setState({ newMovement: true });
  }

  closeMovementForm() {
    this.setState({ newMovement: false });
  }

  render() {
    const { product, newMovement } = this.state;
    const { moveProduct, closeMovementForm } = this;
    let move_product = null;
    let movment_form = null;
    if (newMovement) {
      movment_form = <MovementForm
        product={product}
        closeMovementForm={closeMovementForm}
      />;
    } else {
      move_product = <button onClick={moveProduct}>Move Product</button>;
    }
    return (
      <div>
        <h3>Movements</h3>
        <h5>{product.id} - {product.name} - {product.description}</h5>
        { move_product }
        { movment_form }
        <MovementStats product={product} />
      </div>
    );
  }
}

module.exports = Movements;
