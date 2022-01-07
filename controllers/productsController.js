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
  detail: (req, res) => {
    const product = productServices.getProduct(req.params.id);
    res.render('productDetail', {
      product,
    });
  },
  edit: (req, res) => {
    const product = productServices.getProductRaw(req.params.id);
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
    console.log(`req.body`, req.body);
    productServices.updateProduct(req.params.id, req.body);
    // res.redirect('/products/' + id);
    // temp redirect
    res.redirect('/');
  },
  delete: (req, res) => {
    productServices.deleteProduct(req.params.id);
    res.redirect('/');
  },
};
