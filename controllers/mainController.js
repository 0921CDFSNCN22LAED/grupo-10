const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

function saveProducts() {
  const texto = JSON.stringify(products);
  fs.writeFileSync(productsFilePath, texto, 'utf-8');
}

const addDiscountSymbol = (function () {
  products.forEach((prod) => {
    prod.discount = prod.discount ? prod.discount + '%' : '';
  });
})();

module.exports = {
  index: (req, res) => {
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
      return prod.taxonomy[0] == 'Periférico';
    });
    //   .slice(0, 3);
    res.render('index', {
      artDestacadosProducts: artDestacadosProducts,
      offerProducts: offerProducts,
      hardware,
      peripherals,
    });
  },

  detalleProducto: (req, res) => {
    const id = req.params.id;

    const product = products.find((prod) => {
      return prod.id == id;
    });
    res.render('productDetail', {
      product,
    });
  },

  carrito: (req, res) => {
    res.render('productCart');
  },

  carritoEntrega: (req, res) => {
    res.render('productCart2');
  },

  carritoPago: (req, res) => {
    res.render('productCart3');
  },

  carritoConfirmacion: (req, res) => {
    res.render('productCart4');
  },

  login: (req, res) => {
    res.render('login');
  },

  registro: (req, res) => {
    res.render('register');
  },
};
