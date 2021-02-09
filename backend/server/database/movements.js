const db = require('./client');

const getMovements = (product_id, location_path) => {
  const query = `SELECT product_id, location_path, quantity_in, quantity_out
    FROM product_location_inventory WHERE product_id = $1 AND location_path <@ $2`;
  const q = {
    name: 'select-movements',
    text: query,
    values: [product_id, location_path],
  };
  return db.query(q);
};

const getInventory = (product_id, location_path) => {
  const query = `SELECT SUM(quantity_in) - SUM(quantity_out) AS quantity_total
    FROM product_location_inventory
    WHERE product_id = $1 AND location_path = $2`;
  const q = {
    name: 'select-inventory',
    text: query,
    values: [product_id, location_path],
  };
  return db.query(q);
};

const validateEntries = (entries, key_in = 1, key_out = 2) => (
  new Promise((resolve, reject) => {
    if (entries.length < 2) {
      reject(new Error('Invalid entries supplied!'));
      return;
    }
    const quantities_in = entries.map((entry) => (entry[key_in]));
    const quantitities_out = entries.map((entry) => (entry[key_out]));
    const sum = (acumulator, value) => (acumulator + Number(value));
    console.log(key_in, key_out);
    console.log(quantities_in, quantitities_out);
    if (quantities_in.reduce(sum, 0) !== quantitities_out.reduce(sum, 0)) {
      reject(new Error('Invalid entries supplied!'));
      return;
    }
    resolve('Entries valid.');
  })
);

const getMovement = (client, product_movement_id) => {
  const query = `SELECT
    pm.product_movement_id AS id,
    pm.product_id AS product_id, pm.created AS created,
    pme.location_path AS location_path,
    pme.quantity_out AS quantity_out,
    pme.quantity_in AS quantity_in FROM
    product_movements AS pm INNER JOIN product_movement_entries AS pme
    ON (pm.product_movement_id = pme.product_movement_id)
    WHERE pm.product_movement_id = $1`;
  const q = {
    name: 'select-movement',
    text: query,
    values: [product_movement_id],
  };
  return client.query(q);
};

const insertMovement = (client, product_id) => {
  const query = `INSERT INTO product_movements (product_id) VALUES ($1)
    RETURNING product_movement_id AS id`;
  const q = {
    name: 'insert-movement',
    text: query,
    values: [product_id],
  };
  return client.query(q);
};

const insertEntry = (client, id, path, qty_in = 0, qty_out = 0) => {
  const query = `INSERT INTO product_movement_entries
    (product_movement_id, location_path, quantity_in, quantity_out)
    VALUES ($1, $2, $3, $4)
    RETURNING product_movement_entry_id AS id`;
  const q = {
    name: 'insert-entry',
    text: query,
    values: [id, path, qty_in, qty_out],
  };
  return client.query(q);
};

const insertEntries = (client, id, entries) => (
  Promise.all(entries.map((entry) => (insertEntry(client, id, ...entry))))
  );

const insertMovementEntries = (product_id, entries) => (
  validateEntries(entries)
    .then(() => (
      db.connect().then((client) => (
        client.query('BEGIN')
          .then((begin) => (insertMovement(client, product_id)))
          .then((movement) => {
            return insertEntries(client, movement.rows[0].id, entries)
              .then((entiresData) => (getMovement(client, movement.rows[0].id)))
              .then((data) => {
                validateEntries(data.rows, 'quantity_in', 'quantity_out')
                  .then(() => (client.query('COMMIT')))
                  .catch((error) => {
                    throw error;
                  });
                return data;
              });
          })
          .catch((error) => {
            client.query('ROLLBACK');
            throw error;
          })
          .finally((end) => (client.release()))
      ))
    ))
);

module.exports = {
  getMovements,
  getInventory,
  insertMovementEntries,
 };
