const axios = require('axios');
const {
  BACKEND_ENDPOINT,
  PRODUCTS,
  LOCATIONS,
  MOVEMENTS,
} = require('../../config');

const getProducts = (limit, offset, callback) => {
  const uri = `${BACKEND_ENDPOINT}${PRODUCTS}?limit=${limit}&offset=${offset}`;
  axios.get(uri)
    .then((response) => (callback(response.data.rows)))
    .catch((error) => (console.log('getProducts error:', error)));
};

const getProduct = (product_id, callback) => {
  const uri = `${BACKEND_ENDPOINT}${PRODUCTS}/${product_id}`;
  axios.get(uri)
    .then((response) => (callback(response.data.rows)))
    .catch((error) => (console.log('getProduct error:', error)));
};

const insertProduct = (name, description, callback) => {
  const uri = `${BACKEND_ENDPOINT}${PRODUCTS}`;
  axios.post(uri, { name, description })
    .then((response) => (callback(response.data.rows)))
    .catch((error) => (console.log('insertProduct error:', error)));
};

const updateProduct = (product_id, name, description, callback) => {
  const uri = `${BACKEND_ENDPOINT}${PRODUCTS}/${product_id}`;
  axios.post(uri, { name, description })
    .then((response) => (callback(response.data.rows)))
    .catch((error) => (console.log('updateProduct error:', error)));
};

const getLocations = (parent_id, callback) => {
  let uri = `${BACKEND_ENDPOINT}${LOCATIONS}`;
  if (parent_id !== null) uri = `${uri}?parent_id=${parent_id}`;
  axios.get(uri)
    .then((response) => (callback(response.data.rows)))
    .catch((error) => (console.log('getLocations error:', error)));
};

const getLocation = (location_id, callback) => {
  const uri = `${BACKEND_ENDPOINT}${LOCATIONS}/${location_id}`;
  axios.get(uri)
    .then((response) => (callback(response.data.rows)))
    .catch((error) => (console.log('getLocation error:', error)));
};

const insertLocation = (parent_id, name, description, callback) => {
  const uri = `${BACKEND_ENDPOINT}${LOCATIONS}`;
  axios.post(uri, { parent_id, name, description })
    .then((response) => (callback(response.data.rows)))
    .catch((error) => (console.log('insertLocation error:', error)));
};

const updateLocation = (location_id, name, description, callback) => {
  const uri = `${BACKEND_ENDPOINT}${LOCATIONS}/${location_id}`;
  axios.post(uri, { name, description })
    .then((response) => (callback(response.data.rows)))
    .catch((error) => (console.log('updateLocation error:', error)));
};

const getMovements = (product_id, location_path, callback) => {
  const uri = `${BACKEND_ENDPOINT}${MOVEMENTS}/${product_id}/${location_path}`;
  axios.get(uri)
    .then((response) => (callback(response.data.rows)))
    .catch((error) => (console.log('getMovements error:', error)));
};

const insertMovementEntries = (product_id, entries, callback) => {
  const uri = `${BACKEND_ENDPOINT}${MOVEMENTS}`;
  axios.post(uri, { product_id, entries })
    .then((response) => (callback(response.data.rows)))
    .catch((error) => (console.log('insertMovementEntries error:', error)));
};

module.exports = {
  getProducts,
  getProduct,
  insertProduct,
  updateProduct,
  getLocations,
  getLocation,
  insertLocation,
  updateLocation,
  getMovements,
  insertMovementEntries,
};
