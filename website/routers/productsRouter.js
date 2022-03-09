const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const fileUpload = require('../middleware/multer');
const productValidations = require('../middleware/productValidations');
const tester = require('../middleware/tester');
const validations = require('../middleware/validation');

// Viene de /products

// Listado de productos
router.get('/', productsController.list);

// Búsqueda
router.get('/buscar', productsController.search);

// Formulario de creación de productos
router.get('/crear', productsController.create);
// Acción de creación
router.post(
  '/store',
  fileUpload.single('image'),
  tester,
  productValidations,
  validations,
  productsController.store
);

// Agregar al carrito

router.post('/addToCart/:id', productsController.addToCart);
router.post('/addAndGoToCart/:id', productsController.addAndGoToCart);
router.delete('/removeFromCart/:id', productsController.removeFromCart);

// Detalle de un producto
router.get('/:id', productsController.detail);

// Formulario de edición de productos
router.get('/:id/editar', productsController.edit);
// Acción de edición
router.put(
  '/:id/editar',
  fileUpload.single('image'),
  productValidations,
  validations,
  productsController.update
);

// Acción de borrado
router.delete('/:id', productsController.delete);

module.exports = router;
