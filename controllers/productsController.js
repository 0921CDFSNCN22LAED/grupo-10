const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

function saveProducts() {
	const texto = JSON.stringify(products);
	fs.writeFileSync(productsFilePath, texto, "utf-8");
}

module.exports = {
  create: (req, res) => {
    res.render("crearProducto");
  },

  store:(req, res) => {
    res.redirect();
  },
}
