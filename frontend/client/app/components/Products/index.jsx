const React = require('react');
const api = require('../backendAdapter');
const ProductsList = require('./ProductsList.jsx');

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      updatedProduct: {id: null, name: '', description: ''},
    };
    this.newProduct = this.newProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.editProduct = this.editProduct.bind(this);
    this.updateProducts = this.updateProducts.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.saveProduct = this.saveProduct.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  newProduct() {
    this.setState((state) => {
      const products = state.products.slice();
      products.push({id: null, name: '', description: ''});
      return { products };
    });
  }

  updateProduct(product) {
    this.setState(() => ({ updatedProduct: { ...product } }));
  }

  editProduct(event) {
    const key = event.target.name;
    const value = event.target.value;
    this.setState((state) => {
      const product = { ...state.product };
      product[key] = value;
      return { updatedProduct: product };
    });
  }

  updateProducts(product_id, newProduct) {
    this.setState((state) => {
      const products = state.products.slice();
      const i = products.findIndex((product) => (product.id === product_id));
      products.splice(i, 1, newProduct);
      return { products, updatedProduct: {id: null, name: '', description: ''} };
    });
  }

  getProducts() {
    api.getProducts(1000, 0, (records) => {
      this.setState(() => ({ products: records }));
    });
  }

  saveProduct() {
    const { updatedProduct } = this.state;
    if (updatedProduct.id !== null) {
      api.updateProduct(
        updatedProduct.id,
        updatedProduct.name,
        updatedProduct.description,
        (records) => (this.updateProducts(updatedProduct.id, records[0]))
      );
    } else {
      api.insertProduct(
        updatedProduct.name,
        updatedProduct.description,
        (records) => (this.updateProducts(null, records[0]))
      );
    }
  }

  render() {
    const { products, updatedProduct } = this.state;
    const { newProduct, updateProduct, editProduct, saveProduct } = this;
    return (
      <div>
        <h3>Products</h3>
        <button onClick={newProduct}>Add New Product</button>
        <ProductsList
          products={products}
          updatedProduct={updatedProduct}
          updateProduct={updateProduct}
          editProduct={editProduct}
          saveProduct={saveProduct}
        />
      </div>
    );
  }
}

module.exports = Products;
