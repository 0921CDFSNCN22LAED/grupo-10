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
    const user = await mainServices.getUser(req.session.user.id);
    res.render('profile', { user });
  },

  update: async (req, res) => {
    const user = await mainServices.updateUser(
      req.body,
      req.session.user.id,
      req.file
    );
    res.redirect('/perfil');
  },

  carrito: async (req, res) => {
    const cartRaw = await mainServices.getCartProducts(req);
    const cart = cartRaw.map((item) => {
      return {
        name: item.product.name,
        quantity: item.quantity,
        price: productServices.convertToPesos(item.historicPrice),
        discount: productServices.convertToPercentage(item.historicDiscount),
        subtotal: productServices.convertToPesos(
          ((item.historicPrice * (100 - item.historicDiscount)) / 100) *
            item.quantity
        ),
        productSaleId: item.id,
      };
    });
    const total = productServices.convertToPesos(
      cartRaw.reduce((acc, curr) => {
        return (
          acc +
          ((curr.historicPrice * (100 - curr.historicDiscount)) / 100) *
            curr.quantity
        );
      }, 0)
    );
    const userLog = req.session.user;
    req.session.nextPage = '/carrito';
    if (cart.length < 1) return res.redirect('/products');
    res.render('productCart', { cart, total, userLog });
  },

  carritoEntrega: (req, res) => {
    res.render('productCart2');
  },

  carritoPago: (req, res) => {
    res.render('productCart3');
  },

  carritoConfirmacion: async (req, res) => {
    const cartRaw = await mainServices.getCartProducts(req);
    const cart = cartRaw.map((item) => {
      return {
        name: item.product.name,
        quantity: item.quantity,
        price: productServices.convertToPesos(item.historicPrice),
        discount: productServices.convertToPercentage(item.historicDiscount),
        subtotal: productServices.convertToPesos(
          ((item.historicPrice * (100 - item.historicDiscount)) / 100) *
            item.quantity
        ),
        productSaleId: item.id,
      };
    });
    const total = productServices.convertToPesos(
      cartRaw.reduce((acc, curr) => {
        return (
          acc +
          ((curr.historicPrice * (100 - curr.historicDiscount)) / 100) *
            curr.quantity
        );
      }, 0)
    );
    if (cart.length < 1) return res.redirect('/products');
    res.render('productCart4', { cart, total });
  },

  login: (req, res) => {
    const errors = req.session.loginErrors;
    req.session.loginErrors = '';
    res.render('login', { errors });
  },

  loginProcess: async (req, res) => {
    if (await mainServices.validateUser(req.body.email, req.body['password'])) {
      req.session.log = true;
      const user = await mainServices.getUserByEmail(req.body.email);
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

  storeUser: async (req, res) => {
    const user = await mainServices.store(req);
    res.redirect('login');
  },

  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie('email');
    res.redirect('login');
  },
};
