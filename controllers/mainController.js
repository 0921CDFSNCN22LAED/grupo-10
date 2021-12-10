const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

function saveProducts() {
	const texto = JSON.stringify(products);
	fs.writeFileSync(productsFilePath, texto, "utf-8");
}

module.exports = {
  index: (req, res) => {
    const artDestacadosProducts = products.filter((prod)=>{
			return prod.category == "Art-destacado";
		})
    .slice(0, 3);
		const offerProducts = products.filter((prod)=>{
			return prod.category == "Oferta";
		})
    .slice(0, 3);
		res.render("index", {
			artDestacadosProducts: artDestacadosProducts,
			offerProducts: offerProducts
		})
  },

  detalleProducto: (req, res) => {
    res.render("productDetail");
  },

  carrito: (req, res) => {
    res.render("productCart");
  },

  carritoEntrega: (req, res) => {
    res.render("productCart2");
  },

  carritoPago: (req, res) => {
    res.render("productCart3");
  },

  carritoConfirmacion: (req, res) => {
    res.render("productCart4");
  },

  login: (req, res) => {
    res.render("login");
  },

  registro: (req, res) => {
    res.render("register");
  },

  edit:(req, res) => {
    const id = req.params.id;
    const product = products.find((prod) => {
      return prod.id == id;
    });
    res.render("editarProducto", {
      product,
    });
  },

  update:(req, res)=>{
    res.render()
  },
}
