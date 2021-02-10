const axios = require('axios');
const {
  BACKEND_ENDPOINT,
  PRODUCTS,
  LOCATIONS,
  MOVEMENTS,
} = require('../config');

const getProducts = (limit, offset, callback) => {
  const uri = `${BACKEND_ENDPOINT}${PRODUCTS}?limit=${limit}&offset=${offset}`;
  axios.get(uri)
    .then((response) => (callback(response.data.rows)))
    .catch((error) => (console.log('getProducts error:', error)));
};

const insertProduct = (name, description, callback) => {
  const uri = `${BACKEND_ENDPOINT}${PRODUCTS}`;
  axios.post(uri, { name, description })
    .then((response) => (callback(response.data.rows)))
    .catch((error) => (console.log('insertProduct error:', error)));
};

const updateProduct = (productId, name, description, callback) => {
  const uri = `${BACKEND_ENDPOINT}${PRODUCTS}/${productId}`;
  axios.post(uri, { name, description })
    .then((response) => (callback(response.data.rows)))
    .catch((error) => (console.log('updateProduct error:', error)));
};

const getLocations = (parentId, callback) => {
  let uri = `${BACKEND_ENDPOINT}${LOCATIONS}`;
  if (parentId !== null) uri = `${uri}?parentId=${parentId}`;
  axios.get(uri)
    .then((response) => (callback(response.data.rows)))
    .catch((error) => (console.log('getLocations error:', error)));
};

const insertLocation = (parentId, name, description, callback) => {
  const uri = `${BACKEND_ENDPOINT}${LOCATIONS}`;
  axios.post(uri, { parentId, name, description })
    .then((response) => (callback(response.data.rows)))
    .catch((error) => (console.log('insertLocation error:', error)));
};

const updateLocation = (locationId, name, description, callback) => {
  const uri = `${BACKEND_ENDPOINT}${LOCATIONS}/${locationId}`;
  axios.post(uri, { name, description })
    .then((response) => (callback(response.data.rows)))
    .catch((error) => (console.log('updateLocation error:', error)));
};

const getInventory = (productId, locationId, callback) => {
  const uri = `${BACKEND_ENDPOINT}${MOVEMENTS}/${productId}`;
  if (locationId !== null) uri = `${uri}/${locationId}`;
  axios.get(uri)
    .then((response) => (callback(response.data.rows)))
    .catch((error) => (console.log('getMovements error:', error)));
};

const insertMovementEntries = (productId, entries, callback) => {
  const uri = `${BACKEND_ENDPOINT}${MOVEMENTS}`;
  axios.post(uri, { productId, entries })
    .then((response) => (callback(response.data.rows)))
    .catch((error) => (console.log('insertMovementEntries error:', error)));
};

module.exports = {
  getProducts,
  insertProduct,
  updateProduct,
  getLocations,
  insertLocation,
  updateLocation,
  getInventory,
  insertMovementEntries,
};
