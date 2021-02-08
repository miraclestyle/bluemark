const React = require('react');
const api = require('./backendAdapter');
const ProductsList = require('./ProductsList.jsx');

class Locations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      location: {id: null, parent_id: null, path: '', name: '', description: ''},
    };
    this.getProducts = this.getProducts.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.newProduct = this.newProduct.bind(this);
    this.editProduct = this.editProduct.bind(this);
    this.modifyProduct = this.modifyProduct.bind(this);
    this.updateProductsList = this.updateProductsList.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  newProduct() {
    this.setState((state) => {
      const products = state.products.slice();
      products.push({id: null, name: '', description: ''});
      console.log(products);
      return { products };
    });
  }

  modifyProduct(selectedProduct) {
    const newProduct = {
      id: selectedProduct.id,
      name: selectedProduct.name,
      description: selectedProduct.description,
    };
    this.setState(() => ({ product: newProduct }));
  }

  editProduct(event) {
    const key = event.target.name;
    const value = event.target.value;
    this.setState((state) => {
      const newProduct = {
        id: state.product.id,
        name: state.product.name,
        description: state.product.description,
      };
      newProduct[key] = value;
      return { product: newProduct };
    });
  }

  updateProductsList(product_id, newProduct) {
    this.setState((state) => {
      const products = state.products.slice();
      const i = products.findIndex((product) => (product.id === product_id));
      products.splice(i, 1, newProduct);
      return { products, product: {id: null, name: '', description: ''} };
    });
  }

  getProducts(limit = 1000, offset = 0) {
    api.getProducts(limit, offset, (records) => {
      this.setState(() => ({ products: records }));
    });
  }

  updateProduct() {
    const { product } = this.state;
    if (product.id !== null) {
      api.updateProduct(
        product.id,
        product.name,
        product.description,
        (records) => (this.updateProductsList(product.id, records[0]))
      );
    } else {
      api.insertProduct(
        product.name,
        product.description,
        (records) => (this.updateProductsList(null, records[0]))
      );
    }
  }

  getLocations(parent_id = null) {
    api.getLocations(parent_id);
  }

  getLocation(location_id) {
    api.getLocation(location_id);
  }

  insertLocation(parent_id, name, description) {
    api.insertLocation(parent_id, name, description);
  }

  updateLocation(location_id, name, description) {
    api.updateLocation(location_id, name, description);
  }

  getMovements(product_id, location_path) {
    api.getMovements(product_id, location_path);
  }

  insertMovementEntries(product_id, entries) {
    api.insertMovementEntries(product_id, entries);
  }

  render() {
    const { products, product } = this.state;
    const { newProduct, modifyProduct, editProduct, updateProduct } = this;
    return (
      <div>
        <ProductsList
          products={products}
          selectedProduct={product}
          newProduct={newProduct}
          modifyProduct={modifyProduct}
          editProduct={editProduct}
          updateProduct={updateProduct}
        />
      </div>
    );
  }
}

module.exports = Locations;
