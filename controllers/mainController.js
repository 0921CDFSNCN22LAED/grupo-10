const db = require('../database/models');
const mainServices = require('../services/mainServices');
const productServices = require('../services/productServices');

module.exports = {
  index: async (req, res) => {
    const { artDestacadosProducts, offerProducts, hardware, peripherals } =
      await productServices.getProductsByCategoryOrTaxonomy();
    res.render('index', {
      artDestacadosProducts,
      offerProducts,
      hardware,
      peripherals,
    });
  },

  profile: async (req, res) => {
    const user = await mainServices.getUser(req.session.user.id)
    res.render('profile', {user});
  },

  update: async (req, res) => {
    const user = await mainServices.updateUser(req.body, req.session.user.id)
    console.log(user);
    res.redirect('/profile')
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
    const errors = req.session.loginErrors;
    req.session.loginErrors = '';
    res.render('login', { errors });
  },

  loginProcess: (req, res) => {
    if (mainServices.validateUser(req.body.email, req.body['contraseña'])) {
      req.session.log = true;
      const user = mainServices.getUserbyEmail(req.body.email);
      req.session.user = user;
      if (req.body.remember) {
        res.cookie('email', user.email);
      }
      const nextPage = req.session.nextPage ?? '/';
      return res.redirect(nextPage);
    } else {
      req.session.loginErrors = 'Las credenciales no son correctas';
      return res.redirect('login');
    }
  },

  registro: (req, res) => {
    res.render('register');
  },

  storeUser: (req, res) => {
    mainServices.store(req);
    res.redirect('login');
  },

  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie('email');
    res.redirect('login');
  },
};
