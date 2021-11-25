const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController.js');

router.get('/', mainController.index);
router.get('/detalle-producto', mainController.detalleProducto);
router.get('/carrito', mainController.carrito);
router.get('/carrito/entrega', mainController.carritoEntrega);
router.get('/carrito/pago', mainController.carritoPago);
router.get('/carrito/confirmacion', mainController.carritoConfirmacion);
router.get('/login', mainController.login);
router.get('/registro', mainController.registro);

module.exports = router