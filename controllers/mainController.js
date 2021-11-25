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
}