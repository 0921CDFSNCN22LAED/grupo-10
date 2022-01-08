const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');

const convertToPesos = (number) => {
  return new Intl.NumberFormat('es-Ar', {
    style: 'currency',
    currency: 'ARS',
  })
    .format(number)
    .slice(0, -3);
};

module.exports = {
  getProducts: function () {
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    return products;
  },
  getProductsRandom: function (n) {
    const products = this.getProducts();
    products.sort(() => Math.random() - Math.random());
    return products;
  },
  getProduct: function (id) {
    const products = this.getProducts();
    const product = products.find((prod) => {
      return prod.id == id;
    });
    return product;
  },
  getProductRaw: function (id) {
    const products = this.getProducts();
    const product = products.find((prod) => {
      return prod.id == id;
    });
    const cleanRegEx = new RegExp(/[$\.%]/g);
    product.price = product.price
      ? Number(product.price.replace(cleanRegEx, ''))
      : '';
    product.discount = product.discount
      ? Number(product.discount.replace(cleanRegEx, ''))
      : '';
    console.log(`product`, product);
    return product;
  },
  getProductsCategories: function () {
    const categories = [
      { id: 'Oferta', name: 'En oferta' },
      { id: 'Art-Destacado', name: 'Destacado' },
    ];
    return categories;
  },
  getProductsByCategoryOrTaxonomy: function () {
    const products = this.getProducts();
    const artDestacadosProducts = products.filter((prod) => {
      return prod.category == 'Art-Destacado';
    });
    //   .slice(0, 3);
    const offerProducts = products.filter((prod) => {
      return prod.category == 'Oferta';
    });
    const hardware = products.filter((prod) => {
      return prod.taxonomy[0] == 'Hardware';
    });
    const peripherals = products.filter((prod) => {
      return prod.taxonomy[0] == 'Periféricos';
    });
    return { artDestacadosProducts, offerProducts, hardware, peripherals };
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
  updateProduct: function (id, body) {
    let product = this.getProduct(id);
    editProduct = {
      id: parseInt(id),
      ...body,
      taxonomy: [
        body.taxonomy,
        body.taxonomyHardware
          ? body.taxonomyHardware
          : body.taxonomyPeripherals,
      ],
      image: product.image,
    };
    editProduct.discount = editProduct.discount
      ? editProduct.discount + '%'
      : '';
    editProduct.price = editProduct.price
      ? convertToPesos(editProduct.price)
      : '';
    let products = this.getProducts();
    products = products.filter((product) => {
      return product.id != id;
    });
    products.push(editProduct);
    this.saveProducts(products);
  },
  deleteProduct: function (id) {
    const products = this.getProducts();
    let product = products.findIndex((prod) => {
      return prod.id == id;
    });
    products.splice(product, 1);
    this.saveProducts(products);
  },
};
