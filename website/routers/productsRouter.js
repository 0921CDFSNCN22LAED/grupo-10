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
router.get('/search', productsController.search);

// Formulario de creación de productos
router.get('/create', productsController.create);
// Acción de creación
router.post(
  '/store',
  fileUpload.single('image'),
  productValidations,
  validations,
  productsController.store
);

// Detalle de un producto
router.get('/:id', productsController.detail);

// Formulario de edición de productos
router.get('/:id/edit', productsController.edit);
// Acción de edición
router.put(
  '/:id/edit',
  fileUpload.single('image'),
  productValidations,
  validations,
  productsController.update
);

// Acción de borrado
router.delete('/:id', productsController.delete);

module.exports = router;
