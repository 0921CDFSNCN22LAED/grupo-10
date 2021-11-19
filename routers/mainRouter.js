const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController.js');

router.get('/', mainController.index);
router.get('/detalle-producto', mainController.detalleProducto);
router.get('/carrito', mainController.carrito);
router.get('/login', mainController.login);
router.get('/registro', mainController.registro);

module.exports = router