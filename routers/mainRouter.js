const express = require('express');
const router = express.Router();
const path = require('path');
const mainController = require('../controllers/mainController.js');
const multer = require('multer');
const userValidations = require('../middleware/userValidations');
const validations = require('../middleware/validation');

let multerDiskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/img'));
  },
  filename: (req, file, cb) => {
    let imageName = Date.now() + path.extname(file.originalname);
    cb(null, imageName);
  },
});

let fileUpload = multer({ storage: multerDiskStorage });

router.get('/', mainController.index);
router.get('/detalle-producto/:id', mainController.detalleProducto);
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
  mainController.user
);

module.exports = router;
