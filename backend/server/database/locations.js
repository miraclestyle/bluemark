const db = require('./client');

const getRootLocations = (prefix) => {
  const sufix = `WHERE location_parent_id IS NULL
    ORDER BY location_path ASC`;
  const query = `${prefix} ${sufix}`;
  const q = {
    name: 'select-root-locations',
    text: query,
  };
  return db.query(q);
};

const getRelatedLocations = (prefix, parentId) => {
  const sufix = `WHERE location_id = $1 OR location_parent_id = $1
    ORDER BY location_path ASC`;
  const query = `${prefix} ${sufix}`;
  const q = {
    name: 'select-child-locations',
    text: query,
    values: [parentId],
  };
  return db.query(q);
};

const getLocations = (parentId = null) => {
  const prefix = `SELECT
    location_id AS id, location_parent_id AS parent_id,
    location_path AS path, location_name AS name,
    location_description AS description
    FROM locations`;
  if (parentId === null) return getRootLocations(prefix);
  return getRelatedLocations(prefix, parentId);
};

const insertLocation = (name, parentId, description) => {
  const query = `INSERT INTO locations
    (location_name, location_parent_id, location_description)
    VALUES ($1, $2, $3)
    RETURNING
    location_id AS id,
    location_parent_id AS parent_id,
    location_path AS path, location_name AS name,
    location_description AS description`;
  const q = {
    name: 'insert-location',
    text: query,
    values: [name, parentId, description],
  };
  return db.query(q);
};

const updateLocation = (id, name, description) => {
  const query = `UPDATE locations
    SET location_name = $2, location_description = $3
    WHERE location_id = $1
    RETURNING
    location_id AS id,
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
