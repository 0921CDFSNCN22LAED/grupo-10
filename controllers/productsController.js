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
      taxonomy: [
        req.body.taxonomy,
        req.body.taxonomyHardware
          ? req.body.taxonomyHardware
          : req.body.taxonomyPeripherals,
      ],
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
    const categories = [
      { id: 'Oferta', name: 'En oferta' },
      { id: 'Art-Destacado', name: 'Destacado' },
    ];
    const id = req.params.id;
    const product = products.find((prod) => {
      return prod.id == id;
    });
    errors = req.session.errors ? req.session.errors : '';
    console.log(errors);

    res.render('editarProducto', {
      product,
      categories,
      errors,
    });
    errors = '';
  },

  update: (req, res) => {
    const id = req.params.id;
    let product = products.find((prod) => {
      return prod.id == id;
    });
    editProduct = {
      id: parseInt(id),
      ...req.body,
      image: product.image,
    };
    console.log(req.body);
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
  delete: (req, res)=>{
    const id = req.params.id;
    let product = products.find((prod) => {
      return prod.id == id;
    });

    products.splice(product, 1);

    saveProducts();

    res.redirect('/');
  }
};
