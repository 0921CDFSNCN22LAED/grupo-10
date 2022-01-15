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
  profile: (req, res) => {
    res.render('profile');
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
