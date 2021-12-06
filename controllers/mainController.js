const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productosDataBase.json');
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
		const offerProducts = products.filter((prod)=>{
			return prod.category == "Oferta";
		})
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

  create: (req, res) => {
    res.render("crearProducto");
  },

  store:(req, res) => {
    res.redirect()
  },

  edit:(req, res)=>{
    res.render()
  },

  update:(req, res)=>{
    res.render()
  }
}