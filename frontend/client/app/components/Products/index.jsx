const React = require('react');
const api = require('../../backendAdapter');
const SelectedProduct = require('./SelectedProduct.jsx');
const ProductsList = require('./ProductsList.jsx');
const Movements = require('../Movements/index.jsx');

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      selectedProduct: this.productTemplate(),
      updatedProduct: this.productTemplate(),
    };
    this.productTemplate = this.productTemplate.bind(this);
    this.newProduct = this.newProduct.bind(this);
    this.selectProduct = this.selectProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.editProduct = this.editProduct.bind(this);
    this.updateProducts = this.updateProducts.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.cancelProduct = this.cancelProduct.bind(this);
    this.saveProduct = this.saveProduct.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  productTemplate() {
    return {id: null, name: '', description: ''};
  }

  newProduct() {
    this.setState((state) => {
      return { products: [ ...state.products, this.productTemplate() ] };
    });
  }

  selectProduct(product) {
    this.setState({ selectedProduct: { ...product } });
  }

  updateProduct(product) {
    this.setState({ updatedProduct: { ...product } });
  }

  editProduct(event) {
    const key = event.target.name;
    const value = event.target.value;
    this.setState((state) => {
      const product = { ...state.updatedProduct };
      product[key] = value;
      return { updatedProduct: product };
    });
  }

  updateProducts(productId, newProduct) {
    this.setState((state) => {
      const products = [ ...state.products ];
      const i = products.findIndex((product) => (product.id === productId));
      products.splice(i, 1, newProduct);
      return { products, updatedProduct: this.productTemplate() };
    });
  }

  getProducts() {
    api.getProducts(1000, 0, (products) => (this.setState({ products })));
  }

  cancelProduct() {
    this.setState({ updatedProduct: this.productTemplate() });
  }

  saveProduct() {
    const { id, name, description } = this.state.updatedProduct;
    const callback = (records) => {
      if (id !== null) this.updateProducts(id, records[0]);
      else this.updateProducts(null, records[0]);
    };
    if (id !== null) {
      api.updateProduct(id, name, description, callback);
    } else {
      api.insertProduct(name, description, callback);
    }
  }

  render() {
    const { products, selectedProduct, updatedProduct } = this.state;
    const {
      newProduct,
      updateProduct,
      editProduct,
      saveProduct,
      cancelProduct,
      selectProduct,
     } = this;
     let addNewProduct = <button onClick={newProduct}>Add New Product</button>;
     let ui = <ProductsList
        products={products}
        updatedProduct={updatedProduct}
        selectProduct={selectProduct}
        updateProduct={updateProduct}
        editProduct={editProduct}
        cancelProduct={cancelProduct}
        saveProduct={saveProduct}
      />;
     if (selectedProduct.id !== null) {
       ui = <Movements product={selectedProduct} />;
       addNewProduct = null;
     }
    return (
      <div>
        <h3>Products</h3>
        <SelectedProduct product={selectedProduct} />
        {addNewProduct}
        {ui}
      </div>
    );
  }
}

module.exports = Products;
