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
    const productsIdInCart = req.session.productsInCart;
    res.render('productDetail', {
      product,
      products,
      productsIdInCart,
    });
  },
  edit: async (req, res) => {
    const product = await productServices.getProductRaw(req.params.id);
    const categories = await productServices.getProductsCategories();
    const { hardware, peripherals } =
      await productServices.getProductsSubTaxonomies();
    let errors = req.session.errors ? req.session.errors : '';
    res.render('editarProducto', {
      product,
      categories,
      errors,
      hardware,
      peripherals,
    });
    req.session.errors = '';
  },
  update: async (req, res) => {
    await productServices.updateProduct(req.params.id, req.body, req.file);
    res.redirect(`/products/${req.params.id}`);
  },
  delete: (req, res) => {
    productServices.deleteProduct(req.params.id);
    res.redirect('/');
  },
  search: async (req, res) => {
    const search = req.query.search;
    const products = await productServices.searchProduct(search);

    res.render('productos', { products, search });
  },
  addToCart: async (req, res) => {
    await productServices.addToCart(req);
    res.redirect('/products');
  },
  addAndGoToCart: async (req, res) => {
    await productServices.addToCart(req);
    res.redirect('/carrito');
  },
  removeFromCart: async (req, res) => {
    const productSaleId = req.params.id;
    await productServices.removeFromCart(productSaleId);
    res.redirect('/carrito');
  },
};
