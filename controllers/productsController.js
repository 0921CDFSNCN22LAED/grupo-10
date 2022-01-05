const productServices = require('../services/productServices');

module.exports = {
  create: (req, res) => {
    const categories = productServices.getProductsCategories();
    res.render('crearProducto', { categories });
  },
  store: (req, res) => {
    productServices.storeProduct(req);
    res.redirect('/products');
  },
  list: (req, res) => {
    res.render('productos');
  },
  edit: (req, res) => {
    const product = productServices.getProduct(req.params.id);
    const categories = productServices.getProductsCategories();
    let errors = req.session.errors ? req.session.errors : '';
    res.render('editarProducto', {
      product,
      categories,
      errors,
    });
    req.session.errors = '';
  },
  update: (req, res) => {
    productServices.updateProduct(req.params.id);
    // res.redirect('/products/' + id);
    // temp redirect
    res.redirect('/');
  },
  delete: (req, res) => {
    productServices.deleteProduct(req.params.id);
    res.redirect('/');
  },
};
