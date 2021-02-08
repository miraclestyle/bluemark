const React = require('react');
const api = require('../backendAdapter');
const ProductsList = require('./ProductsList.jsx');

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      product: {id: null, name: '', description: ''},
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

  updateProduct(selectedProduct) {
    this.setState(() => ({ product: { ...selectedProduct } }));
  }

  editProduct(event) {
    const key = event.target.name;
    const value = event.target.value;
    this.setState((state) => {
      const newProduct = { ...state.product };
      newProduct[key] = value;
      return { product: newProduct };
    });
  }

  updateProducts(product_id, newProduct) {
    this.setState((state) => {
      const products = state.products.slice();
      const i = products.findIndex((product) => (product.id === product_id));
      products.splice(i, 1, newProduct);
      return { products, product: {id: null, name: '', description: ''} };
    });
  }

  getProducts() {
    api.getProducts(1000, 0, (records) => {
      this.setState(() => ({ products: records }));
    });
  }

  saveProduct() {
    const { product } = this.state;
    if (product.id !== null) {
      api.updateProduct(
        product.id,
        product.name,
        product.description,
        (records) => (this.updateProducts(product.id, records[0]))
      );
    } else {
      api.insertProduct(
        product.name,
        product.description,
        (records) => (this.updateProducts(null, records[0]))
      );
    }
  }

  render() {
    const { products, product } = this.state;
    const { newProduct, updateProduct, editProduct, saveProduct } = this;
    return (
      <div>
        <h3>Products</h3>
        <button onClick={newProduct}>Add New Product</button>
        <ProductsList
          products={products}
          selected={product}
          updateProduct={updateProduct}
          editProduct={editProduct}
          saveProduct={saveProduct}
        />
      </div>
    );
  }
}

module.exports = Products;
