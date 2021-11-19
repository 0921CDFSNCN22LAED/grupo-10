module.exports = {
  index: (req, res) => {
    res.render("index");
  },

  detalleProducto: (req, res) => {
    res.render("productDetail");
  },

  carrito: (req, res) => {
    res.render("productCart");
  },

  login: (req, res) => {
    res.render("login");
  },

  registro: (req, res) => {
    res.render("register");
  },
}