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
      selectedProduct: -1,
      updatedProduct: -1,
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
      const products = [ ...state.products, this.productTemplate() ];
      return { products, updatedProduct: products.length - 1 };
    });
  }

  selectProduct(index) {
    const { id } = this.state.products[index];
    if (id === null) this.setState({
      selectedProduct: -1,
      updatedProduct: -1,
    });
    else this.setState({ selectedProduct: index, updatedProduct: -1 });
  }

  updateProduct(index) {
    this.setState({ updatedProduct: index });
  }

  editProduct(key, value, index) {
    this.setState((state) => {
      const products = [ ...state.products ];
      const product = { ...products[index] };
      product[key] = value;
      products[index] = product;
      return { products, updatedProduct: index };
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

  cancelProduct(index) {
    this.setState((state) => {
      const { id } = state.products[index];
      if (id === null) {
        const products = [ ...state.products ];
        products.splice(index, 1);
        return { products, updatedProduct: -1 };
      } else {
        return { updatedProduct: -1 };
      }
    });
  }

  saveProduct(index) {
    const { id, name, description } = this.state.products[index];
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
    let selected = null;
    let addNewProduct = <button onClick={newProduct}>
      Add New Product
    </button>;
    let ui = <ProductsList
      products={products}
      updatedProduct={updatedProduct}
      selectedProduct={selectedProduct}
      selectProduct={selectProduct}
      updateProduct={updateProduct}
      editProduct={editProduct}
      cancelProduct={cancelProduct}
      saveProduct={saveProduct}
    />;
    if (selectedProduct > -1) {
      selected = <SelectedProduct product={products[selectedProduct]} />;
      ui = <Movements product={products[selectedProduct]} />;
      addNewProduct = null;
    }
    return (
      <div>
        <h3>Products</h3>
        {selected}
        {addNewProduct}
        {ui}
      </div>
    );
  }
}

module.exports = Products;
