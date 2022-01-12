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
  loginProcess:(req, res) =>{
    
    if(mainServices.validateUser(req.body.email, req.body["contraseña"])){
      req.session.log = true
      return res.redirect('/')
    }else{
      return res.redirect('back')
    }
  },

  registro: (req, res) => {
    res.render('register');
  },

  storeUser: (req, res) => {
    mainServices.store(req);
    res.redirect('login');
  },
};
