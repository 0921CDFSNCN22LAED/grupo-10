const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');

module.exports = {
  getProducts: function () {
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    return products;
  },
  getProduct: function (id) {
    const products = this.getProducts();
    const product = products.find((prod) => {
      return prod.id == id;
    });
    return product;
  },
  getProductsCategories: function () {
    const categories = [
      { id: 'Oferta', name: 'En oferta' },
      { id: 'Art-Destacado', name: 'Destacado' },
    ];
    return categories;
  },
  saveProducts: function (products) {
    const texto = JSON.stringify(products, null, 2);
    fs.writeFileSync(productsFilePath, texto, 'utf-8');
  },
  storeProduct: function ({ body, file }) {
    const newProduct = {
      id: new Date().getTime(),
      ...body,
      taxonomy: [
        body.taxonomy,
        body.taxonomyHardware
          ? body.taxonomyHardware
          : body.taxonomyPeripherals,
      ],
      image: file && file.filename ? file.filename : 'defaultProduct.png',
    };
    let products = this.getProducts();
    products.push(newProduct);
    this.saveProducts(products);
  },
  updateProduct: function (id) {
    editProduct = {
      id: parseInt(id),
      ...req.body,
      image: product.image,
    };
    const products = this.getProducts();
    let product = this.getProduct(id);
    products = products.filter((product) => {
      return product.id != id;
    });
    products.push(editProduct);
    this.saveProducts(products);
  },
  deleteProduct: function (id) {
    ////CORREGIR Esto borra solo el primer producto, no el producto deseado- CORREGIDO
    const products = this.getProducts();
    let product = products.findIndex((prod) => {
      return prod.id == id;
    });
    products.splice(product, 1);
    this.saveProducts(products);
  },
};
