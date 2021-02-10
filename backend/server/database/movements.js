const db = require('./client');

const getRootInventory = (prefix, productId) => {
  const sufix = `AND location_parent_id IS NULL
    ORDER BY location_path`;
  const query = `${prefix} ${sufix}`;
  const q = {
    name: 'select-root-inventory',
    text: query,
    values: [productId],
  };
  return db.query(q);
};

const getRelatedInventory = (prefix, productId, locationId) => {
  const sufix = `AND (location_id = $2 OR location_parent_id = $2)
    ORDER BY location_path`;
  const query = `${prefix} ${sufix}`;
  const q = {
    name: 'select-related-inventory',
    text: query,
    values: [productId, locationId],
  };
  return db.query(q);
};

const getInventory = (productId, locationId = null) => {
  const prefix = `
  SELECT
  location_id,
  location_parent_id AS parent_id,
  location_path AS path,
  location_name AS name,
  product_id,
  quantity_in,
  quantity_out,
  quantity_total
  FROM product_location_inventory
  WHERE product_id = $1`;
  if (locationId === null) return getRootInventory(prefix, productId);
  return getRelatedInventory(prefix, productId, locationId);
};

const validateEntries = (entries, keyIn = 1, keyOut = 2) => (
  new Promise((resolve, reject) => {
    if (entries.length < 2) {
      reject(new Error('Invalid entries supplied!'));
      return;
    }
    const totalIn = entries.reduce((acm, val) => (acm + Number(val[keyIn])), 0);
    const totalOut = entries.reduce((acm, val) => (acm + Number(val[keyOut])), 0);
    if (totalIn !== totalOut) {
      reject(new Error('Invalid entries supplied!'));
      return;
    }
    resolve('Supplied entries are valid.');
  })
);

const getMovement = (client, productMovementId) => {
  const query = `SELECT
    product_movement_id AS id,
    quantity_in,
    quantity_out
    FROM product_location_movements
    WHERE product_movement_id = $1`;
  const q = {
    name: 'select-movement',
    text: query,
    values: [productMovementId],
  };
  return client.query(q);
};

const insertMovement = (client, productId) => {
  const query = `INSERT INTO product_movements
    (product_id)
    VALUES ($1)
    RETURNING
    product_movement_id AS id`;
  const q = {
    name: 'insert-movement',
    text: query,
    values: [productId],
  };
  return client.query(q);
};

const insertEntry = (client, id, path, qtyIn = 0, qtyOut = 0) => {
  const query = `INSERT INTO product_movement_entries
    (product_movement_id, location_path, quantity_in, quantity_out)
    VALUES ($1, $2, $3, $4)`;
  const q = {
    name: 'insert-entry',
    text: query,
    values: [id, path, qtyIn, qtyOut],
  };
  return client.query(q);
};

const insertEntries = (client, id, entries) => (
  Promise.all(entries.map((entry) => (insertEntry(client, id, ...entry))))
  );

const insertMovementEntries = (productId, entries) => (
  validateEntries(entries)
    .then(() => (
      db.connect().then((client) => (
        client.query('BEGIN')
          .then((begin) => (insertMovement(client, productId)))
          .then((movement) => {
            return insertEntries(client, movement.rows[0].id, entries)
              .then((response) => (getMovement(client, movement.rows[0].id)))
              .then((data) => (
                validateEntries(data.rows, 'quantity_in', 'quantity_out')
              ));
          })
          .then(() => (client.query('COMMIT')))
          .catch((error) => {
            client.query('ROLLBACK');
            throw error;
          })
          .finally((end) => (client.release()))
      ))
    ))
);

module.exports = {
  getInventory,
  insertMovementEntries,
 };
