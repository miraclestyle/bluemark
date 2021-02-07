const db = require('./client');

const getMovements = (product_id, location_path) => {
  const query = `SELECT product_id, location_path, quantity_in, quantity_out
    FROM product_location_inventory WHERE product_id = $1 AND location_path = $2`;
  const q = {
    name: 'select-movements',
    text: query,
    values: [product_id, location_path],
  };
  return db.query(q);
};

const getInventory = (product_id, location_path) => {
  const query = `SELECT SUM(quantity_in) - SUM(quantity_out) AS quantity_total
    FROM product_location_inventory WHERE product_id = $1 AND location_path = $2`;
  const q = {
    name: 'select-inventory',
    text: query,
    values: [product_id, location_path],
  };
  return db.query(q);
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

const validateEntries = (entries) => {
  if (entries.length < 2) return false;
  const quantities_in = entries.map((entry) => (entry[1]));
  const quantitities_out = entries.map((entry) => (entry[2]));
  const sum = (acumulator, value) => (acumulator + value);
  return quantities_in.reduce(sum, 0) === quantitities_out.reduce(sum, 0);
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

const insertMovementEntries = (product_id, entries) => {
  if (!validateEntries(entries)) {
    throw new Error('Invalid entries supplied!');
  }
  return db.connect().then((client) => {
    client.query('BEGIN')
      .then((begin) => (insertMovement(client, product_id)))
      .then((mData) => (insertEntries(client, mData.rows[0].id, entries)))
      .then((eData) => {
        client.query('COMMIT');
        return eData;
      })
      .catch((error) => {
        client.query('ROLLBACK');
        throw error;
      })
      .finally((end) => (client.release()));
  });
};

module.exports = {
  getMovements,
  getInventory,
  insertMovementEntries,
 };
