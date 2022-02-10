const express = require('express');
const router = express.Router();

const fileUpload = require('../middleware/multer');
const userValidations = require('../middleware/userValidations');
const validations = require('../middleware/validation');

const mainController = require('../controllers/mainController.js');
const unLogUserRedirect = require('../middleware/unLogUserRedirect');
const logUserRedirect = require('../middleware/logUserRedirect');

router.get('/', mainController.index);
router.get('/profile', unLogUserRedirect, mainController.profile);
router.put('/profile', fileUpload.none(), mainController.update)
router.get('/carrito', mainController.carrito);
router.get(
  '/carrito/entrega',
  unLogUserRedirect,
  mainController.carritoEntrega
);
router.get('/carrito/pago', unLogUserRedirect, mainController.carritoPago);
router.get(
  '/carrito/confirmacion',
  unLogUserRedirect,
  mainController.carritoConfirmacion
);
router.get('/login', logUserRedirect, mainController.login);
router.post('/login', mainController.loginProcess);
router.get('/registro', logUserRedirect, mainController.registro);
router.post(
  '/',
  fileUpload.single('profileImage'),
  userValidations,
  validations,
  mainController.storeUser
);
router.get('/logout', mainController.logout);

module.exports = router;
