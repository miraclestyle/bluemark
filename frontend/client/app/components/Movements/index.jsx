const React = require('react');
const api = require('../../backendAdapter');
const MovementForm = require('./MovementForm.jsx');
const MovementStats = require('./MovementStats.jsx');

const Movements = ({ product }) => {
  const [newMovement, newMovementButton] = React.useState(false);
  const move = newMovement ? <MovementForm
    product={product}
    cancelMovement={() => newMovementButton(false)}
  />
  :
  <button onClick={() => newMovementButton(true)}>Move Product</button>
  return (
    <div>
      <h4>Movements</h4>
      {move}
      <MovementStats product={product} />
    </div>
  );
};

module.exports = Movements;
