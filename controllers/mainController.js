const mainServices = require('../services/mainServices');
const productServices = require('../services/productServices');

module.exports = {
  index: (req, res) => {
    const { artDestacadosProducts, offerProducts, hardware, peripherals } =
      productServices.getProductsByCategoryOrTaxonomy();
    res.render('index', {
      artDestacadosProducts,
      offerProducts,
      hardware,
      peripherals,
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

  storeUser: (req, res) => {
    mainServices.store(req);
    res.redirect('login');
  },
};
