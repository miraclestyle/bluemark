const db = require('./client');

const getProducts = (limit = 10, offset = 0) => {
  const query = `SELECT product_id AS id, product_name AS name,
    product_description AS description
    FROM products ORDER BY product_name LIMIT $1 OFFSET $2`;
  const q = {
    name: 'select-products',
    text: query,
    values: [limit, offset],
  };
  return db.query(q);
};

const getProduct = (id) => {
  const query = `SELECT product_id AS id, product_name AS name,
    product_description AS description
    FROM products WHERE product_id = $1`;
  const q = {
    name: 'select-product',
    text: query,
    values: [id],
  };
  return db.query(q);
};

const insertProduct = (name, description) => {
  const query = `INSERT INTO products (product_name, product_description)
    VALUES ($1, $2)
    RETURNING product_id AS id, product_name AS name,
    product_description AS description`;
  const q = {
    name: 'insert-product',
    text: query,
    values: [name, description],
  };
  return db.query(q);
};

const updateProduct = (id, name, description) => {
  const query = `UPDATE products SET product_name = $2, product_description = $3
    WHERE product_id = $1
    RETURNING product_id AS id, product_name AS name,
    product_description AS description`;
  const q = {
    name: 'update-product',
    text: query,
    values: [id, name, description],
  };
  return db.query(q);
};

module.exports = {
  getProducts,
  getProduct,
  insertProduct,
  updateProduct,
 };
