const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

function saveProducts() {
  const texto = JSON.stringify(products, null, 2);
  fs.writeFileSync(productsFilePath, texto, 'utf-8');
}

module.exports = {
  create: (req, res) => {
    res.render('crearProducto');
  },

  store: (req, res) => {
    const newProduct = {
      id: new Date().getTime(),
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: req.body.image,
    };
    products.push(newProduct);
    saveProducts();
    res.redirect('/products');
  },

  list: (req, res) => {
    res.render('productos');
  },
  edit: (req, res) => {
    const id = req.params.id;
    const product = products.find((prod) => {
      return prod.id == id;
    });
    res.render('editarProducto', {
      product,
    });
  },

  update: (req, res) => {
    const id = req.params.id;
    let product = products.find((prod) => {
      return prod.id == id;
    });
    editProduct = {
      id: parseInt(id),
      ...req.body,
    };
    // delete edited product copy from JSON DB
    products = products.filter((product) => {
      return product.id != id;
    });
    // add edited product to JSON DB
    products.push(editProduct);
    // save JSON DB
    saveProducts();
    // res.redirect('/products/' + id);
    // temp redirect
    res.redirect('/');
  },
};
