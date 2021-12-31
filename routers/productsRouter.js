const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const productValidations = require('../middleware/productValidations');
const validations = require('../middleware/validation');

// viene de /products

// Listado de productos
router.get('/', productsController.list);
// Formulario de creación de productos
router.get('/create', productsController.create);
// Acción de creación
router.post('/', productsController.store);
// Detalle de un producto
router.get('/:id');
// Formulario de edición de productos
router.get('/:id/edit', productsController.edit);
// Acción de edición
router.put(
  '/:id/edit',
  productValidations,
  validations,
  productsController.update
);
// Acción de borrado
router.delete('/:id', productsController.delete);

module.exports = router;
