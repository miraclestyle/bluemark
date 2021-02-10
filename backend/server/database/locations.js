const db = require('./client');

const getRootLocations = () => {
  const query = `SELECT location_id AS id, location_parent_id AS parent_id,
    location_path AS path, location_name AS name,
    location_description AS description
    FROM locations
    WHERE location_parent_id IS NULL`;
  const q = {
    name: 'select-root-locations',
    text: query,
  };
  return db.query(q);
};

const getChildLocations = (parent_id) => {
  const query = `SELECT location_id AS id, location_parent_id AS parent_id,
    location_path AS path, location_name AS name,
    location_description AS description
    FROM locations
    WHERE location_parent_id = $1`;
  const q = {
    name: 'select-child-locations',
    text: query,
    values: [parent_id],
  };
  return db.query(q);
};

const getLocations = (parent_id = null) => (
  parent_id === null ? getRootLocations() : getChildLocations(parent_id)
  );

const getLocation = (id) => {
  const query = `SELECT location_id AS id, location_parent_id AS parent_id,
    location_path AS path, location_name AS name,
    location_description AS description
    FROM locations WHERE location_id = $1`;
  const q = {
    name: 'select-location',
    text: query,
    values: [id],
  };
  return db.query(q);
};

const insertLocation = (name, parent_id, description) => {
  const query = `INSERT INTO locations
    (location_name, location_parent_id, location_description)
    VALUES ($1, $2, $3)
    RETURNING location_id AS id,
    location_parent_id AS parent_id,
    location_path AS path, location_name AS name,
    location_description AS description`;
  const q = {
    name: 'insert-location',
    text: query,
    values: [name, parent_id, description],
  };
  return db.query(q);
};

const updateLocation = (id, name, description) => {
  const query = `UPDATE locations SET location_name = $2, location_description = $3
    WHERE location_id = $1
    RETURNING location_id AS id,
    location_parent_id AS parent_id,
    location_path AS path, location_name AS name,
    location_description AS description`;
  const q = {
    name: 'update-location',
    text: query,
    values: [id, name, description],
  };
  return db.query(q);
};

module.exports = {
  getLocations,
  getLocation,
  insertLocation,
  updateLocation,
 };
