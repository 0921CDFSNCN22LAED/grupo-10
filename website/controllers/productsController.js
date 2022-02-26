const db = require('../database/models');
const productServices = require('../services/productServices');

module.exports = {
  create: async (req, res) => {
    const categories = await productServices.getProductsCategories();
    const { hardware, peripherals } =
      await productServices.getProductsSubTaxonomies();
    res.render('crearProducto', { categories, hardware, peripherals });
  },
  store: async (req, res) => {
    const createdProduct = await productServices.storeProduct(req);
    console.log(createdProduct);
    res.redirect('/products');
  },
  list: async (req, res) => {
    const products = await productServices.getProducts();
    res.render('productos', { products });
  },
  detail: async (req, res) => {
    const product = await productServices.getProduct(req.params.id);
    const randProducts = await productServices.getProductsRandom();
    const products = randProducts.slice(0, 6);
    res.render('productDetail', {
      product,
      products,
    });
  },
  edit: async (req, res) => {
    const product = await productServices.getProductRaw(req.params.id);
    const categories = await productServices.getProductsCategories();
    const { hardware, peripherals } =
      await productServices.getProductsSubTaxonomies();
    let errors = req.session.errors ? req.session.errors : '';
    console.log('product', product);
    res.render('editarProducto', {
      product,
      categories,
      errors,
      hardware,
      peripherals,
    });
    req.session.errors = '';
  },
  update: (req, res) => {
    productServices.updateProduct(req.params.id, req.body);
    res.redirect(`/products/${req.params.id}`);
  },
  delete: (req, res) => {
    productServices.deleteProduct(req.params.id);
    res.redirect('/');
  },
};
