const express = require('express');
const router = express.Router();

const fileUpload = require('../middleware/multer');
const userValidations = require('../middleware/userValidations');
const validations = require('../middleware/validation');

const mainController = require('../controllers/mainController.js');

router.get('/', mainController.index);
router.get('/carrito', mainController.carrito);
router.get('/carrito/entrega', mainController.carritoEntrega);
router.get('/carrito/pago', mainController.carritoPago);
router.get('/carrito/confirmacion', mainController.carritoConfirmacion);
router.get('/login', mainController.login);
router.get('/registro', mainController.registro);
router.post(
  '/',
  fileUpload.single('perfilImage'),
  userValidations,
  validations,
  mainController.storeUser
);

module.exports = router;
